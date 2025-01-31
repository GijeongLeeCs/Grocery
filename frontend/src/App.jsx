import { useState } from 'react'
import './App.css'; // Import the CSS file for styling
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {

  return (
    <div className="container">
      <div className="top-half">
        <h1>Grocery.com</h1>
        <p>This is the top half with a light green background.</p>
      </div>
      <div className="bottom-half">
        <p>This is the bottom half with a white background.</p>
      </div>
    </div>
  );
}

export default App
