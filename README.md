# Meditation Timer Web App

A simple, beautiful meditation timer that tracks your mindfulness sessions. Built with vanilla JavaScript and styled with Tailwind CSS.

## Features

- ⏱️ Start/Stop timer functionality
- 💾 **Persistent session tracking** - Your meditation history is saved in the browser
- 📊 **Total meditation time** - See your cumulative meditation time
- 📈 **Session count** - Track how many sessions you've completed
- 📝 **Recent sessions history** - View your last 5 meditation sessions
- 🎨 Beautiful, modern UI with gradient design
- 📱 Fully responsive design
- ⏸️ Handles tab switching (pauses when tab is hidden)
- 🚀 Fast and lightweight - no framework dependencies

## How to Use

1. Visit the web app
2. Click "Start" to begin your meditation session
3. The timer will track your session in HH:MM:SS format
4. Click "Stop" when you finish meditating
5. Your session is automatically saved (minimum 5 seconds)
6. View your total meditation time and recent sessions
7. Close the browser and come back - your data persists!

## Data Persistence

The app uses browser localStorage to save your meditation data:
- Total accumulated meditation time
- Number of sessions completed
- History of recent sessions with timestamps
- Data persists even after closing the browser
- Data is stored locally on your device (not sent to any server)

## Local Development

To run this locally, simply open `index.html` in your web browser. No build process or dependencies required!

## Deployment to Vercel

### Method 1: Using Vercel CLI (if you have Node.js installed)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Run in the project directory:
   ```bash
   vercel
   ```

3. Follow the prompts to deploy

### Method 2: Using Vercel Dashboard (No Node.js required)

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your Git repository or drag and drop the project folder
4. Vercel will automatically detect the static site and deploy it
5. You'll get a URL like `https://your-project.vercel.app`

### Method 3: Quick Deploy with Git

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Click "Deploy"

## Project Structure

```
meditation-app/
├── index.html      # Main HTML file with session tracking UI
├── script.js       # Timer logic + localStorage functionality
├── vercel.json     # Vercel configuration
└── README.md       # This file
```

## Customization

- Change colors: Edit the Tailwind classes in `index.html`
- Modify timer logic: Edit `script.js`
- Add features: Consider adding:
  - Sound notifications
  - Export session data
  - Meditation goals
  - Different meditation types
  - Dark mode

## Privacy

All data is stored locally in your browser using localStorage. No data is sent to any external servers. Your meditation history remains private on your device.

## License

MIT - Feel free to use this for your personal meditation practice! 