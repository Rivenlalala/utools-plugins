# uTools Plugins Collection

This repository contains a collection of uTools plugins. Each plugin is in its own folder with the folder name being the name of the plugin.

## What is uTools?

uTools is a productivity launcher application (similar to Alfred/Raycast on macOS) that supports plugins to extend its functionality.

## Official Documentation & Resources

- **Official Developer Docs**: [uTools Developer Documentation](https://u.tools/docs/developer/welcome.html)
- **Key Sections**: plugin.json Configuration, API Reference (utools, window, db, etc.)
- **Developer Tool**: You need the uTools Developer Tool (downloadable from the official site) to run, debug, and package your plugin locally.

## GitHub Resources & Examples

### Templates

- [QC2168/utools-plugin-template](https://github.com/QC2168/utools-plugin-template): A popular "out-of-the-box" template using Vite + Vue 3 + TypeScript
- [markthree/utools-plugin-starter](https://github.com/markthree/utools-plugin-starter): Another starter template

### Plugin Collections (for learning)

- [uxiew/utools-plugins](https://github.com/uxiew/utools-plugins): A collection of plugins for efficiency
- [mohuishou/utools](https://github.com/mohuishou/utools): Contains plugins like Chrome history search, VSCode history, etc.
- [fofolee/uTools-Manuals](https://github.com/fofolee/uTools-Manuals): A plugin providing offline manuals (Linux, PHP, Python, etc.)
- [rubickCenter/rubick](https://github.com/rubickCenter/rubick): An open-source alternative to uTools with similar plugin architecture

## How uTools Plugins Work

A uTools plugin consists of three main parts working together:

### 1. Configuration (plugin.json)

This is the manifest file that tells uTools how to load your plugin. It defines:
- Plugin's name, version, logo
- **Features**: Describes the functionality (e.g., "Translate", "JSON Editor")
- **Commands (cmds)**: The keywords, regex patterns, or window types that trigger the feature

### 2. Frontend (main entry point)

Usually an `index.html` file. This is a standard web page:
- You can use any framework (Vue, React, vanilla JS)
- It runs in an Electron BrowserWindow

### 3. Backend/Bridge (preload.js)

A special JavaScript file that runs with Node.js access:
- **Why it's needed**: The frontend (index.html) is sandboxed for security and cannot directly access files or system commands
- **How it works**: Define functions in preload.js (e.g., `readFile`, `runCommand`) and expose them to the frontend using `window.exports` or by attaching them to `window`

## Plugin File Structure

A minimal plugin needs these files:

```
my-plugin/
├── plugin.json    # Configuration
├── index.html     # UI Entry
├── preload.js     # Node.js Bridge (Optional but recommended)
└── logo.png       # Icon (44x44px recommended)
```

## plugin.json Example

```json
{
  "name": "my-plugin-id",
  "pluginName": "My First Plugin",
  "version": "1.0.0",
  "description": "A simple demo plugin",
  "main": "index.html",
  "preload": "preload.js",
  "logo": "logo.png",
  "features": [
    {
      "code": "hello",
      "explain": "Say Hello",
      "cmds": ["hello", "hi"]
    }
  ]
}
```

## Key API Methods (window.utools)

In your preload.js or index.html, you will use specific methods to interact with the uTools window:

### Lifecycle

- `utools.onPluginEnter(({ code, type, payload }) => { ... })`: Called when the user enters your plugin
- `utools.onPluginOut(() => { ... })`: Called when the user leaves

### Window Control

- `utools.setExpendHeight(height)`: Dynamically change the plugin window height
- `utools.hideMainWindow()`: Hide uTools (e.g., after performing an action)
- `utools.outPlugin()`: Exit the plugin completely

### Input Box

- `utools.setSubInput(callback, placeholder)`: Take over the main uTools search bar for your plugin's input

### Data Storage

- `utools.db.put()`, `utools.db.get()`: Use the built-in lightweight database to save user settings or data

## Development Workflow

1. Create your project folder with the files above
2. Open the "uTools Developer Tool"
3. Click "New Project" and select your plugin.json file
4. Run the plugin - when you type your command in the main uTools search bar, your plugin will appear
5. Debug using the developer console provided by the Developer Tool (it's just like Chrome DevTools)

## Plugins in This Repository

| Plugin | Description |
|--------|-------------|
| [time-weather](./time-weather/) | Display current time, date, and weather information |
