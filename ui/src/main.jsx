// # TO RUN APP

// # NODE.js
// https://nodejs.org/en/download

// npm run dev
// npm run build

// go to root project folder
// npm create vite@latest ui -- --template react
// cd ui
// npm install

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
