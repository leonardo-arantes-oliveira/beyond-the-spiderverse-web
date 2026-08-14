import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ViewportProvider } from './context/ViewportProvider'

//import Playground from './Playground.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ViewportProvider>
      <App />
    </ViewportProvider>
  </React.StrictMode>
)

