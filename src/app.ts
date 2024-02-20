import express from "express";
import type { Application } from "express";
import * as path from "path";

// setup Express middleware
const app: Application = express();

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

export default app;
