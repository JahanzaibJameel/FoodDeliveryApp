// src/constants/Colors.js
export default {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  tertiary: '#FFD166',
  background: '#F7F9FC',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#8A8F9E',
  lightGray: '#F5F5F5',
  darkGray: '#333333',
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FFC107',
};

// src/constants/Data.js
export const restaurants = [
  {
    id: '1',
    name: 'Burger Palace',
    rating: 4.5,
    deliveryTime: '20-30 min',
    deliveryFee: '$2.99',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add',
    category: 'Fast Food',
    distance: '1.2 mi',
    featured: true,
    menu: [
      {
        id: '101',
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, and special sauce',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        category: 'Burgers',
        popular: true,
      },
      {
        id: '102',
        name: 'Cheese Burger',
        description: 'Double beef with double cheese',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433c',
        category: 'Burgers',
        popular: true,
      },
    ],
  },
  // Add more restaurants...
];

export const categories = [
  { id: '1', name: 'Burger', icon: 'fast-food' },
  { id: '2', name: 'Pizza', icon: 'pizza' },
  { id: '3', name: 'Sushi', icon: 'fish' },
  { id: '4', name: 'Mexican', icon: 'restaurant' },
  { id: '5', name: 'Chinese', icon: 'bowl' },
  { id: '6', name: 'Italian', icon: 'wine' },
  { id: '7', name: 'Dessert', icon: 'ice-cream' },
  { id: '8', name: 'Healthy', icon: 'leaf' },
];