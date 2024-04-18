import app from "./app";
import helmet from "helmet";

app.use(helmet()); // security-related HTTP headers

app.disable("x-powered-by");

const server = app.listen(3000, () =>
    console.log("Starting ExpressJS server on Port 3000")
);

export default server;
