import app from "./app";
import helmet from "helmet";
import { env } from "./env";

app.use(helmet()); // security-related HTTP headers

app.disable("x-powered-by");

const server = app.listen(env.PORT, () =>
    console.log("Starting ExpressJS server on Port 3000")
);

export default server;
