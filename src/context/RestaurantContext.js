import React, { createContext, useState, useContext } from 'react';
import { restaurants } from '../constants/Data';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [allRestaurants] = useState(restaurants);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const toggleFavorite = (restaurantId) => {
    setFavorites((prev) => {
      if (prev.includes(restaurantId)) {
        return prev.filter((id) => id !== restaurantId);
      } else {
        return [...prev, restaurantId];
      }
    });
  };

  const getFilteredRestaurants = () => {
    let filtered = [...allRestaurants];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (restaurant) => restaurant.category === selectedCategory
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'deliveryTime':
        filtered.sort((a, b) => {
          const timeA = parseInt(a.deliveryTime, 10);
          const timeB = parseInt(b.deliveryTime, 10);
          return timeA - timeB;
        });
        break;
      case 'deliveryFee':
        filtered.sort((a, b) => {
          const feeA = parseFloat(a.deliveryFee.replace('$', ''));
          const feeB = parseFloat(b.deliveryFee.replace('$', ''));
          return feeA - feeB;
        });
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const searchRestaurants = (query) => {
    return allRestaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(query.toLowerCase()) ||
        restaurant.menu.some((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
    );
  };

  const getRestaurantById = (id) => {
    return allRestaurants.find((restaurant) => restaurant.id === id);
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants: allRestaurants,
        favorites,
        selectedCategory,
        sortBy,
        toggleFavorite,
        setSelectedCategory,
        setSortBy,
        getFilteredRestaurants,
        searchRestaurants,
        getRestaurantById,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);