const { defineConfig } = require("cypress");
const {tasks} =  require("@icokie/cypress-webhooksite/lib/tasks");

module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  requestTimeout: 10000,
	retries: { runMode: 3, openMode: 2 },
	e2e: {
    // baseUrl: "",
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on('task', tasks)
    },
    testIsolation: true
	},
});
