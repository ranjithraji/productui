import React from 'react'
import './App.css';
import Product from './pages/Product';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Product />
      <ToastContainer />
    </div>
  );
}

export default App;
