# Time & Weather Plugin

A simple uTools plugin that displays current time, date, and weather information.

## Features

- **Live Clock**: Shows current time with seconds, updating in real-time
- **Date Display**: Shows full date with day of the week
- **Weather Information**: Displays current weather including:
  - Temperature (Celsius)
  - Weather description
  - Feels like temperature
  - Humidity
  - Wind speed and direction
  - UV Index

## Trigger Commands

You can activate this plugin by typing any of these keywords in uTools:
- `time`
- `weather`
- `now`
- `date`
- `tw`

## Weather Data Source

Weather data is fetched from [wttr.in](https://wttr.in), a free weather service that doesn't require an API key. Location is auto-detected based on your IP address.

## Installation

1. Open uTools Developer Tool
2. Click "New Project"
3. Select the `plugin.json` file from this folder
4. The plugin will be loaded and available for use

## Files

- `plugin.json` - Plugin configuration
- `index.html` - Main UI
- `preload.js` - Node.js bridge for weather API calls
- `logo.png` - Plugin icon (44x44 PNG)
- `README.md` - This file

## Development

To modify this plugin:

1. Edit the files as needed
2. The uTools Developer Tool will hot-reload changes
3. Use the DevTools console for debugging (right-click > Inspect)
