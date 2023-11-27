import React, { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BatteryList = () => {
  const [minPostcode, setMinPostcode] = useState('');
  const [maxPostcode, setMaxPostcode] = useState('');

  const { data: response, isLoading, refetch } = useQuery(
    ['batteriesList', minPostcode, maxPostcode],
    async () => {
      try {
        const response = await api.get('/batteries/list', {
          params: { minPostcode, maxPostcode },
        });
        return response.data;
      } catch (error) {
        toast.error(error);

      }
    },
    {
      // Disable automatic refetching on focus
      refetchOnWindowFocus: false,
    }
  );

  const handleFilter = () => {
    // Convert input values to numbers
    const min = parseInt(minPostcode, 10);
    const max = parseInt(maxPostcode, 10);

    // Check if parsing is successful and max is greater than or equal to min
    if (!isNaN(min) && !isNaN(max) && max >= min) {
      refetch();
    } else {
      toast.error('Invalid postcode range.');

    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { batteries, statistics } = response.data;

  return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ marginRight: '10px' }}>Battery List</h2>
          <Link to="/create">
            <button>Create Battery</button>
          </Link>
        </div>


      <div>
        <label>
          Min Postcode:
          <input
            type="text"
            value={minPostcode}
            onChange={(e) => setMinPostcode(e.target.value)}
          />
        </label>
        <label>
          Max Postcode:
          <input
            type="text"
            value={maxPostcode}
            onChange={(e) => setMaxPostcode(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleFilter}>
          Filter
        </button>
      </div>

      <ul>
        {batteries.map((battery) => (
          <li key={battery._id}>
            <strong>Name:</strong> {battery.name},{' '}
            <strong>Postcode:</strong> {battery.postcode},{' '}
            <strong>Watt Capacity:</strong> {battery.wattCapacity}
          </li>
        ))}
      </ul>
      <div>
        <strong>Total Watt Capacity:</strong> {statistics.totalWattCapacity}
      </div>
      <div>
        <strong>Average Watt Capacity:</strong> {statistics.averageWattCapacity}
      </div>
    </div>
  );
};

export default BatteryList;
