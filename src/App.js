import BatteryForm from './component/BatteryForm';
import BatteryList from './component/BatteryList';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
      <div>
        <h1>Virtual Power Plant System</h1>

        <Routes>
        <Route path="/" element ={<BatteryList />} />
        <Route path="/create" element ={<BatteryForm />} />
        </Routes>
        <ToastContainer />


      </div>
  );
}

export default App;
