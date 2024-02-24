import express from "express";
import swaggerUi from "swagger-ui-express";
import mainBookHubRouter from './main.bookhub.routes';
import swaggerSpec from "./config/swaggerConfig";


const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve Swagger UI documentation
app.use("/api-docs/v1/book-hub", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount the main BookHub router
app.use("/v1/book-hub", mainBookHubRouter);

export default app;
