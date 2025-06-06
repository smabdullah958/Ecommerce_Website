import { BrowserRouter } from 'react-router'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from '/src/Router/ParentRouterFile'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
