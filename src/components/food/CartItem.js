import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';
import Colors from '../../constants/Colors';

const CartItem = ({ item, showRestaurant = true }) => {
  const { addToCart, removeFromCart } = useCart();

  const handleIncrease = () => {
    addToCart(item);
  };

  const handleDecrease = () => {
    removeFromCart(item.id);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        {showRestaurant && item.restaurantName && (
          <Text style={styles.restaurant} numberOfLines={1}>
            {item.restaurantName}
          </Text>
        )}
        
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        
        {item.selectedOptions && (
          <View style={styles.optionsContainer}>
            {Object.entries(item.selectedOptions).map(([key, value]) => (
              <View key={key} style={styles.option}>
                <Text style={styles.optionKey}>{key}: </Text>
                <Text style={styles.optionValue}>{value}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleDecrease}
        >
          <Icon name="remove" size={20} color={Colors.white} />
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={handleIncrease}
        >
          <Icon name="add" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  restaurant: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  optionsContainer: {
    marginTop: 5,
  },
  option: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  optionKey: {
    fontSize: 12,
    color: Colors.gray,
  },
  optionValue: {
    fontSize: 12,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 20,
    padding: 5,
    alignSelf: 'center',
  },
  quantityButton: {
    backgroundColor: Colors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: Colors.darkGray,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default CartItem;