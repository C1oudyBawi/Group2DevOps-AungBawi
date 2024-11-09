import express from "express";
import bodyParser from "body-parser";
import { MEMBERS_ROUTER } from "./utils/routes/MemberRoutes.mjs";
import { GYM_PROGRAMS_ROUTER } from "./utils/routes/GymProgramRoutes.mjs";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cors from "cors";

export let app = express();

const PORT = process.env.PORT || 5050;
const START_PAGE = "index.html";

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

app.get("/", (req, res) =>
{
    // https://stackoverflow.com/questions/14594121/express-res-sendfile-throwing-forbidden-error
    res.sendFile(path.resolve(`${__dirname}/public/${START_PAGE}`));
});

app.use("/api", ROUTER);

export let server = app.listen(PORT, function () {
    const { address, port } = server.address();
    const baseUrl = `http://${address === "::" ? "localhost" : address}:${port}`;
    console.log(`Demo project at: ${baseUrl}`);
});