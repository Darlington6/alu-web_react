import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  return (
    <div>
      <h1>Hello, Webpack!</h1>
      <p>Welcome to your React app configured with Webpack</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);