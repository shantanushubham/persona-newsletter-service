const sequelize = require("./sequelize"); // Import your Sequelize instance

async function initializeDatabase() {
  try {
    // Synchronize all defined models with the database
    await sequelize.sync({ force: false });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Error synchronizing database:", error);
    throw error;
  }
}

// Function to perform any other initialization tasks before starting the application
async function initialize() {
  try {
    // Call initializeDatabase to synchronize models with the database
    await initializeDatabase();

    // Perform any other initialization tasks here
    // For example, start your server or run other setup tasks
  } catch (error) {
    console.error("Initialization error:", error);
    // Handle initialization errors gracefully
    process.exit(1); // Exit the process with an error status code
  }
}

// Call initialize to start the application
initialize();
