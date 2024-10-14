// Import the Client and Databases classes from the Appwrite library
import { Client, Databases } from "appwrite";

// Create a new instance of the Client class
export const client = new Client()
  // Set the endpoint URL for the Appwrite API
  .setEndpoint("https://cloud.appwrite.io/v1")
  // Set the project ID for the Appwrite project
  .setProject("66f30e3a00190df59e00");

// Create a new instance of the Databases class, passing the client instance as an argument
export const database = new Databases(client);