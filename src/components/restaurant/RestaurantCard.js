// src/components/restaurant/RestaurantCard.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

const RestaurantCard = ({ restaurant, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Restaurant', { restaurant })}
    >
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.badge}>
        <Icon name="star" size={12} color={Colors.white} />
        <Text style={styles.ratingText}>{restaurant.rating}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {restaurant.name}
        </Text>
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Icon name="time" size={14} color={Colors.gray} />
            <Text style={styles.detailText}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="pricetag" size={14} color={Colors.gray} />
            <Text style={styles.detailText}>{restaurant.deliveryFee}</Text>
          </View>
        </View>
        <Text style={styles.category}>{restaurant.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 15,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  infoContainer: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default RestaurantCard;