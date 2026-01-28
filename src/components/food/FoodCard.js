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

const FoodCard = ({ food, restaurant, navigation, style }) => {
  const { addToCart } = useCart();

  const handlePress = () => {
    navigation.navigate('FoodDetail', { item: food, restaurant });
  };

  const handleAddToCart = () => {
    addToCart(food);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <Image source={{ uri: food.image }} style={styles.image} />
      
      {food.popular && (
        <View style={styles.popularBadge}>
          <Icon name="flame" size={12} color={Colors.white} />
          <Text style={styles.popularText}>Popular</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {food.name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {food.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${food.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
          >
            <Icon name="add" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 120,
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.tertiary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
    marginLeft: 4,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: Colors.gray,
    lineHeight: 16,
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default FoodCard;