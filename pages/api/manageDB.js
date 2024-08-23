import { ref, update, get } from 'firebase/database';
import { db} from '../../firebaseConfig';

export const updateInventory = async (userId, itemId, newQuantity) => {
  const itemRef = ref(db, 'users/'+ userId + '/inventory/' +itemId);
  const pair = {quantity: newQuantity};
  try {
    await update(itemRef, pair);
    console.log('Database updated successfully');
  } catch (error) {
    console.error('Failed to update database', error);
  }
};

export const getHealth = async (userId) => { 
  const healthRef = ref(db, 'users/'+ userId + '/health');
  try {
    const snapshot = await get(healthRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Failed to get health', error);
  }
}

export const updateHealth = async (userId, newHealth) => {
  const healthRef = ref(db, 'users/'+ userId);
  const pair = {health: newHealth};
  try {
    await update(healthRef, pair);
    console.log('Health updated successfully');
  } catch (error) {
    console.error('Failed to update health', error);
  }
};

export const decreaseHealth = async (userId, decreaseAmount) => {
  const healthRef = ref(db, 'users/'+ userId + '/health');
  try {
    const snapshot = await get(healthRef);
    if (snapshot.exists()) {
      const currentHealth = snapshot.val();
      const newHealth = currentHealth - decreaseAmount;
      await update(healthRef, newHealth);
      console.log('Health updated successfully');
    } else {
      console.log('No existing health found');
    }
  }
  catch (error) {
    console.error('Failed to update health', error);
  }
};

export const updateBalance = async (userId, newBalance) => {
  const cashRef = ref(db, 'users/'+ userId);
  const pair = {cashBalance: newBalance};
  try {
    await update(cashRef, pair);
    console.log('Cash updated successfully');
  } catch (error) {
    console.error('Failed to update cash', error);
  }
};

export const getCashBalance = async (userId) => {
  const cashRef = ref(db, 'users/'+ userId + '/cashBalance');
  try {
    const snapshot = await get(cashRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log('No data available');
    }
  } catch (error) {
    console.error('Failed to get cash balance', error);
  }
};

