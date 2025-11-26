/**
 * Preload script for Time & Weather plugin
 * This script runs with Node.js access and can bridge to the frontend
 */

// Expose functions to the renderer process
window.exports = {
  'time-weather': {
    mode: 'none',
    args: {
      enter: (action) => {
        // This is called when the plugin is entered
        // The main logic will be in index.html
      }
    }
  }
};
