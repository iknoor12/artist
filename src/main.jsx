import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Import all styles
import './styles/globals.css'
import './styles/header.css'
import './styles/hero.css'
import './styles/slider.css'
import './styles/orbitContainer.css'
import './styles/artistInfoPanel.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
