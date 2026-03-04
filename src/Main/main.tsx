import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '../Presentation/Styles/index.css'
import '../Infrastructure/i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
