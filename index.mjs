import express from "express";
import bodyParser from "body-parser";
import { MEMBERS_ROUTER } from "./utils/routes/MemberRoutes.mjs";
import { GYM_PROGRAMS_ROUTER } from "./utils/routes/GymProgramRoutes.mjs";
import { KILL_ROUTER } from "./utils/routes/KillRoutes.mjs";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from "cors";
import statusMonitor from 'express-status-monitor';
import client from 'prom-client';

export let app = express();

const PORT = process.env.PORT || 5050;
const START_PAGE = "index.html";

// Enable Prometheus default system metrics collection
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

// Create custom Prometheus metrics
const requestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests received',
    labelNames: ['method', 'route', 'status_code']
});

// Middleware to count requests
app.use((req, res, next) => {
    res.on('finish', () => { 
        requestCounter.inc({ method: req.method, route: req.path, status_code: res.statusCode });
    });
    next();
});

// Prometheus Metrics Route
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.send(await client.register.metrics());
});


const CORS_OPTIONS =
{
    origin: true,
    optionsSuccessStatus: 200
};

app.use(cors(CORS_OPTIONS));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// https://stackoverflow.com/questions/8817423/why-is-dirname-not-defined-in-node-repl
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, "/dist")));

const ROUTER = express.Router();

ROUTER.use("/members", MEMBERS_ROUTER);
ROUTER.use("/gym-programs", GYM_PROGRAMS_ROUTER);
// Used for killing the server
ROUTER.use("/kill", KILL_ROUTER);


app.get("/", (req, res) =>
{
    // https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
    res.sendFile(path.resolve(`${__dirname}/public/${START_PAGE}`));
});

app.use("/api", ROUTER);

app.use(statusMonitor());

// tart Server
export let server = app.listen(PORT, function () {
    const { address, port } = server.address();
    const baseUrl = `http://${address === "::" ? "localhost" : address}:${port}`;
    console.log(`Demo project at: ${baseUrl}`);
    console.log(`Prometheus metrics available at: ${baseUrl}/metrics`);
});