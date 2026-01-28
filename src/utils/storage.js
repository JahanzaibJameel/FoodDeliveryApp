import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  USER: 'user',
  TOKEN: 'token',
  THEME: 'theme',
  CART: 'cart',
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recent_searches',
  ADDRESSES: 'addresses',
  PAYMENT_METHODS: 'payment_methods',
};

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log('Error saving to storage:', error);
    return false;
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('Error reading from storage:', error);
    return null;
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.log('Error removing from storage:', error);
    return false;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.log('Error clearing storage:', error);
    return false;
  }
};

export const multiGet = async (keys) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values.reduce((acc, [key, value]) => {
      acc[key] = value ? JSON.parse(value) : null;
      return acc;
    }, {});
  } catch (error) {
    console.log('Error multi-get from storage:', error);
    return {};
  }
};

export const multiSet = async (pairs) => {
  try {
    const stringifiedPairs = pairs.map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(stringifiedPairs);
    return true;
  } catch (error) {
    console.log('Error multi-set to storage:', error);
    return false;
  }
};