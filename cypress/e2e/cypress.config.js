const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");
require("dotenv").config(); // Load environment variables from .env file

module.exports = defineConfig({
  projectId: "pxwi7e", // Add the projectId here

  e2e: {
    // Enable experimental studio
    experimentalStudio: true,

    // Reporter configuration
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",    // Folder where reports are saved
      overwrite: false,                // Do not overwrite previous reports
      html: true,                      // Generate an HTML report
      json: true,                      // Generate a JSON report
      charts: true,                    // Include charts
      reportTitle: "Test Report",      // Title of the report
    },

    // Global timeout settings
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 30000,
    requestTimeout: 20000,
    responseTimeout: 20000,

    // Set environment variables
    env: {
      MAILOSAUR_API_KEY: process.env.CYPRESS_MAILOSAUR_API_KEY || 'TtHv6L3EeYQ3G0jhrnYiXZc5IUxFqDbe',
    },

    // Log the environment variable and add custom tasks
    setupNodeEvents(on, config) {
      console.log("MAILOSAUR_API_KEY:", process.env.CYPRESS_MAILOSAUR_API_KEY);
      console.log("Cypress Configuration:", config);

      // Add custom task for file downloading
      on("task", { downloadFile });
    },
  },
});
