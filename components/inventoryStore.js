'use client';
import React, { useState } from 'react';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BuildIcon from '@mui/icons-material/Build';
import {updateInventory, getCashBalance, updateBalance} from '../pages/api/manageDB';

const StoreInventory = ({items, userId}) => {     //recieves an array of item objects, item structure found in /constants
  const [filter, setFilter] = useState('all');
  const [amount, setAmount] = useState({});

  const handleFilterChange = (event) => {setFilter(event.target.value);};

  const handleAmountChange = (id, value) => {
    if (value >= 0) {
      setAmount(prevAmount => ({...prevAmount,[id]: value}));
    } else {
      setAmount(prevAmount => ({...prevAmount,[id]: 0}));
    }
  };

  const filteredItems = filter === 'all' ? items : items.filter(item => item.type === filter);

  const iconType = (type) => {
    switch (type) {
      case 'ammo':
        return <DoorBackIcon style={{color:'gray'}}/>;
      case 'clothing':
        return <CheckroomIcon style={{color:'blue'}}/>;
      case 'food':
        return <RestaurantIcon style={{color:'red'}}/>;
      case 'utility':
        return <BuildIcon style={{color:'green'}}/>;
      default:
        return null;
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of items) {
      total += (amount[item.id] || 0) * item.cost;
    }
    return total;
  };

  const handleBuy = async () => {
    const price = calculateTotalPrice();
    const balance = await getCashBalance(userId);
    if (price < balance) {  //check if user has enough money
      updateBalance(userId, balance - price);

      for (const item of items) {
        if(amount[item.id]) { //check if an amount is set to skip unecessary func calls
        const newQuantity = item.quantity + (amount[item.id]);
        await updateInventory(userId, item.id, newQuantity);
        setAmount(prevAmount => ({...prevAmount,[item.id]: 0}));    //reset amount state
        }
      }
    } else {
      alert('Not enough money!'); 
    }
  }

  return (

      <div>
        <div style={{padding: '10px', display: 'flex', justifyContent: 'space-around'}}>
          <div style={{padding: '10px'}}>

            <label style={{marginRight: '10px'}} htmlFor="filter">Filter by type:  </label>
            
            <select id="filter" value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="ammo">Ammo</option>
              <option value="clothing">Clothing</option>
              <option value="food">Food</option>
              <option value="utility">Utility</option>
            </select>

          </div>

          <div style={{padding: '10px'}}>Total price: {calculateTotalPrice()}$</div>

          <button style={{padding: '10px', backgroundColor: '#a03939', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}}
          
          onClick={handleBuy}>Buy</button>

        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>

          {filteredItems.map(item => (      //map through the filtered items and display them
            <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
              <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0', marginBottom: '10px' }}>
                
                {iconType(item.type)}

              </div>

              <div>{item.name}</div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '5px' }}>  
                  <input
                    type="number"
                    value={amount[item.id]}

                    onChange={(e) => handleAmountChange(item.id, parseInt(e.target.value))}

                    style={{ width: '50px', textAlign: 'center' }}
                  />
              </div>

              <div>Price: {item.cost}$</div>

            </div>
          ))}
        </div>
      </div>
    );   
};

export default StoreInventory;
