import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ReactComponents/App.jsx'; 
import './Styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);