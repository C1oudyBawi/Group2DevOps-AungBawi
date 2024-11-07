import express from "express";
import bodyParser from "body-parser";
import { MEMBERS_ROUTER } from "./routes/MemberRoutes.mjs";
import { GYM_PROGRAMS_ROUTER } from "./routes/GymProgramRoutes.mjs";
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
app.use(express.static("./public"));

const ROUTER = express.Router();

ROUTER.use("/members", MEMBERS_ROUTER);
ROUTER.use("/gym-programs", GYM_PROGRAMS_ROUTER);

app.get("/", (req, res) =>
{
    res.sendFile(`${__dirname}/public/${START_PAGE}`);
});

app.use("/api", ROUTER);

export let server = app.listen(PORT, function () {
    const { address, port } = server.address();
    const baseUrl = `http://${address == "::" ? "localhost" : address}:${port}`;
    console.log(`Demo project at: ${baseUrl}`);
});