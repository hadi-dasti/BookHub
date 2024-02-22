import http from "http";
import app from "./app";

import { connectDB } from './config/db.config';



const PORT = process.env.PORT;

// startServer();
async function BookHubServer():Promise<void> {
  try {
    await connectDB();


    // Create HTTP server
    const server = http.createServer(app);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
        console.log("An error occurred while starting the server:", err);
    }
};

void BookHubServer();