// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import "./i18n"; // <-- import before rendering app

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary Caught Error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ color: 'red' }}>Something went wrong!</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Click for error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log('🚀 main.jsx: Starting React app initialization...');

try {
  const rootElement = document.getElementById('root');
  console.log('🔍 main.jsx: Root element found:', rootElement);

  if (!rootElement) {
    throw new Error('Root element not found in DOM');
  }

  console.log('⚛️ main.jsx: Creating React root...');
  const root = ReactDOM.createRoot(rootElement);

  console.log('🎨 main.jsx: Rendering app...');
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );

  console.log('✅ main.jsx: React app rendered successfully!');
} catch (error) {
  console.error('❌ main.jsx: Fatal error during initialization:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: red;">Fatal Error</h1>
      <p>Failed to initialize React app</p>
      <pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${error.message}\n${error.stack}</pre>
    </div>
  `;
}
