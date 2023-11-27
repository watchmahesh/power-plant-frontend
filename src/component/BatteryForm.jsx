import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // Updated import
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BatteryForm = () => {
  const navigate = useNavigate(); // Updated usage
  const [batteries, setBatteries] = useState([
    { name: '', postcode: '', wattCapacity: '' }
  ]);

  const handleCreateBattery = async () => {
    const isValid = batteries.every(
      (battery) =>
        battery.name.trim() !== '' &&
        battery.postcode.trim() !== '' &&
        battery.wattCapacity.trim() !== ''
    );

    if (!isValid) {
      toast.error('Please fill in all fields for each battery.');
      return;
    }
    try {
      const response = await api.post('/batteries/add',
        { batteries }
      );

      console.log('Response:', response.data);

      if (response.data.status === 200) {
        setBatteries([{ name: '', postcode: '', wattCapacity: '' }]);

        navigate('/');
      } else if (response.data.status === 400) {
        console.log('Response:', response);
        const errorMessage = response.data.message.join('\n');
        toast.error(errorMessage);
      } else {
        toast.error('An error occurred. Please try again.');
      }
      setBatteries([{ name: '', postcode: '', wattCapacity: '' }]);
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);

      console.error('Error creating batteries:', error.message);
    }
  };

  const handleAddBattery = () => {
    setBatteries([...batteries, { name: '', postcode: '', wattCapacity: '' }]);
  };

  const handleBatteryChange = (index, field, value) => {
    const updatedBatteries = batteries.map((battery, i) =>
      i === index ? { ...battery, [field]: value } : battery
    );

    setBatteries(updatedBatteries);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ marginRight: '10px' }}>Create Batteries</h2>
        <Link to="/">
          <button> Battery List</button>
        </Link>
      </div>
      {batteries.map((battery, index) => (
        <div key={index}>
          <label>
            Name:
            <input
              type="text"
              value={battery.name}
              onChange={(e) =>
                handleBatteryChange(index, 'name', e.target.value)
              }
            />
          </label>
          <br />
          <label>
            Postcode:
            <input
              type="number"
              value={battery.postcode}
              onChange={(e) =>
                handleBatteryChange(index, 'postcode', e.target.value)
              }
            />
          </label>
          <br />
          <label>
            Watt Capacity:
            <input
              type="number"
              value={battery.wattCapacity}
              onChange={(e) =>
                handleBatteryChange(index, 'wattCapacity', e.target.value)
              }
            />
          </label>
          <br />
        </div>
      ))}
      <br></br>
      <button type="button" onClick={handleAddBattery}>
        Add more Battery
      </button> &nbsp;
      <button type="button" onClick={handleCreateBattery}>
        Save
      </button>
    </div>
  );
};

export default BatteryForm;
