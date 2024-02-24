import http from "http";
import app from "./app";
import { connectDB } from "./config/db.config";

const PORT = process.env.PORT;

/**
 * Function to start the BookHub server
 */
async function startBookHubServer(): Promise<void> {
  try {
    // Connect to the database
    await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Start the server
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("An error occurred while starting the server:", err);
    process.exit(1);
  }
}

// Call the function to start the server
void startBookHubServer();
