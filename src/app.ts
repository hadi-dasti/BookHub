import express from "express";
import swaggerUi from "swagger-ui-express";
import mainBookHubRouter from './main.bookhub.routes';
import swaggerSpec from "./config/swaggerConfig";


const app = express();

// Parse JSON request bodies
app.use(express.json());


app.use("/api-docs/v1/book-hub", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/v1/book-hub", mainBookHubRouter);

export default app;
