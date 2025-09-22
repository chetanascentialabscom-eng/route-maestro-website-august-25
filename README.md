# RouteMaestro - AI-Powered B2B Travel SaaS Platform

A static website for RouteMaestro, an AI-powered travel platform designed to optimize itineraries, enhance client satisfaction, and boost conversions.

## 🚀 Quick Start

This is a static website project that can be served using multiple methods. Choose the one that works best for you.

## 📋 Prerequisites

- Node.js (for some serving methods)
- Firebase CLI (for Firebase hosting)
- Git (for version control)

## 🛠️ Installation & Setup

### Method 1: Firebase Hosting (Recommended)

#### Step 1: Install Firebase CLI
```bash
# Install Firebase CLI globally
npm install -g firebase-tools
```

#### Step 2: Login to Firebase
```bash
# Login to your Firebase account
firebase login
```

#### Step 3: Start Local Development Server
```bash
# Navigate to project root directory
cd routemaestro-project

# Serve the project locally
firebase serve
```

#### Step 4: Access the Website
- Open your browser and go to: `http://localhost:5000`
- The website will be served from the `public` folder

---

### Method 2: Using Node.js HTTP Server

#### Step 1: Install http-server (if not already installed)
```bash
# Install http-server globally
npm install -g http-server
```

#### Step 2: Navigate to Public Folder
```bash
# Go to the public directory
cd public
```

#### Step 3: Start the Server
```bash
# Start http-server on port 8000
http-server -p 8000
```

#### Step 4: Access the Website
- Open your browser and go to: `http://localhost:8000`

---

### Method 3: Using Python HTTP Server

#### Step 1: Navigate to Public Folder
```bash
# Go to the public directory
cd public
```

#### Step 2: Start Python Server
```bash
# For Python 3.x
python -m http.server 8000

# For Python 2.x (if you have it)
python -m SimpleHTTPServer 8000
```

#### Step 3: Access the Website
- Open your browser and go to: `http://localhost:8000`

---

### Method 4: Using npx (No Installation Required)

#### Step 1: Navigate to Project Root
```bash
# Go to project root directory
cd routemaestro-project
```

#### Step 2: Start Server with npx
```bash
# Serve the public folder using npx
npx http-server public -p 8000
```

#### Step 3: Access the Website
- Open your browser and go to: `http://localhost:8000`

---

### Method 5: VS Code Live Server Extension

#### Step 1: Install Live Server Extension
- Open VS Code
- Go to Extensions (Ctrl+Shift+X)
- Search for "Live Server" by Ritwick Dey
- Install the extension

#### Step 2: Open Project in VS Code
```bash
# Open project in VS Code
code .
```

#### Step 3: Start Live Server
- Right-click on `public/index.html`
- Select "Open with Live Server"
- Or use the "Go Live" button in the status bar

#### Step 4: Access the Website
- The browser will automatically open with the website
- Usually runs on: `http://127.0.0.1:5500`

---

## 🌐 Deployment

### Deploy to Firebase Hosting
```bash
# Build and deploy to Firebase
firebase deploy
```

### Deploy to Vercel
```bash
# If connected to Git, simply push to main branch
git add .
git commit -m "Deploy to Vercel"
git push origin main
```

## 📁 Project Structure

```
routemaestro-project/
├── public/                 # Static website files
│   ├── index.html         # Main homepage
│   ├── Home.html          # Home page
│   ├── Pricing.html       # Pricing page
│   ├── Privacy.html       # Privacy policy
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   ├── img/               # Images and assets
│   └── vendor/            # Third-party libraries
├── firebase.json          # Firebase hosting config
├── .firebaserc           # Firebase project config
└── README.md             # This file
```

## 🔧 Configuration Files

- **firebase.json**: Firebase hosting configuration with URL rewrites
- **.firebaserc**: Firebase project settings
- **public/vercel.json**: Vercel deployment configuration

## 📱 Features

- Responsive design for all devices
- AI-powered travel platform showcase
- Dynamic pricing tables
- Contact forms and demo scheduling
- SEO optimized with structured data
- Google Analytics integration

## 🚨 Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
# Try a different port
firebase serve --port 5001
# or
http-server -p 8001
```

### Firebase Login Issues
```bash
# Logout and login again
firebase logout
firebase login
```

### Permission Issues
```bash
# On Windows, run command prompt as Administrator
# On Mac/Linux, use sudo if needed
sudo npm install -g firebase-tools
```

## 📞 Support

For any issues or questions:
- Check the Firebase documentation: https://firebase.google.com/docs/hosting
- Verify all files are in the `public` folder
- Ensure your internet connection is stable for Firebase commands

## 🎯 Next Steps

1. Choose your preferred serving method
2. Start the development server
3. Open the website in your browser
4. Make changes to files in the `public` folder
5. Refresh the browser to see changes

---

**Happy Coding! 🚀**