import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../shared/styles/index.css'
import AdminApp from './AdminApp.jsx'

console.log("Admin Portal Script Loading...");

window.addEventListener('error', (event) => {
    console.error("GLOBAL ERROR DETECTED:", event.error);
    document.body.innerHTML = `<div style="padding: 20px; color: red; font-family: sans-serif;">
        <h1>Critical Render Error</h1>
        <pre>${event.error?.stack || event.message}</pre>
    </div>`;
});

console.log("Admin Portal Mounting...");
createRoot(document.getElementById('admin-root')).render(
    <StrictMode>
        <AdminApp />
    </StrictMode>,
)
