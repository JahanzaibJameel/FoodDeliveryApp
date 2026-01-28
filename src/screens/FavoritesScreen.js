import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRestaurant } from '../context/RestaurantContext';
import Colors from '../constants/Colors';

const FavoritesScreen = ({ navigation }) => {
  const { favorites, restaurants, toggleFavorite } = useRestaurant();
  const [activeTab, setActiveTab] = useState('restaurants');

  const favoriteRestaurants = restaurants.filter(restaurant =>
    favorites.includes(restaurant.id)
  );

  const favoriteFoods = restaurants.flatMap(restaurant =>
    restaurant.menu.filter(item => item.popular)
  );

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={styles.restaurantCard}
      onPress={() => navigation.navigate('Restaurant', { restaurant: item })}
    >
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Icon name="heart" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.restaurantDetails}>
          <View style={styles.detailItem}>
            <Icon name="star" size={16} color={Colors.tertiary} />
            <Text style={styles.detailText}>{item.rating}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="time" size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{item.deliveryTime}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="pricetag" size={16} color={Colors.gray} />
            <Text style={styles.detailText}>{item.deliveryFee}</Text>
          </View>
        </View>
        <Text style={styles.restaurantCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => navigation.navigate('FoodDetail', { item })}
    >
      <Image source={{ uri: item.image }} style={styles.foodImage} />
      <View style={styles.foodInfo}>
        <Text style={styles.foodName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.foodDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={24} color={Colors.white} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} color={Colors.darkGray} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'restaurants' && styles.activeTab]}
          onPress={() => setActiveTab('restaurants')}
        >
          <Icon
            name="restaurant"
            size={20}
            color={activeTab === 'restaurants' ? Colors.white : Colors.gray}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'restaurants' && styles.activeTabText,
            ]}
          >
            Restaurants
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'foods' && styles.activeTab]}
          onPress={() => setActiveTab('foods')}
        >
          <Icon
            name="fast-food"
            size={20}
            color={activeTab === 'foods' ? Colors.white : Colors.gray}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'foods' && styles.activeTabText,
            ]}
          >
            Foods
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'restaurants' ? (
        favoriteRestaurants.length > 0 ? (
          <FlatList
            data={favoriteRestaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="heart-dislike" size={100} color={Colors.lightGray} />
            <Text style={styles.emptyTitle}>No Favorite Restaurants</Text>
            <Text style={styles.emptyText}>
              You haven't added any restaurants to favorites yet
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.exploreButtonText}>Explore Restaurants</Text>
            </TouchableOpacity>
          </View>
        )
      ) : favoriteFoods.length > 0 ? (
        <FlatList
          data={favoriteFoods}
          renderItem={renderFoodItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.foodGrid}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="fast-food-outline" size={100} color={Colors.lightGray} />
          <Text style={styles.emptyTitle}>No Favorite Foods</Text>
          <Text style={styles.emptyText}>
            You haven't added any foods to favorites yet
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.exploreButtonText}>Explore Foods</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  headerPlaceholder: {
    width: 30,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    padding: 15,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '600',
    marginLeft: 8,
  },
  activeTabText: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  restaurantCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  restaurantImage: {
    width: '100%',
    height: 150,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    flex: 1,
  },
  restaurantDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 5,
  },
  restaurantCategory: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  foodGrid: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  foodCard: {
    width: '48%',
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
  foodImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  foodInfo: {
    marginBottom: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  foodDescription: {
    fontSize: 12,
    color: Colors.gray,
    marginBottom: 10,
    lineHeight: 16,
  },
  foodPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addButton: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: Colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FavoritesScreen;