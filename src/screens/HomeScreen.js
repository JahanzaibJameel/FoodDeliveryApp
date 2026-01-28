import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { categories, restaurants } from '../constants/Data';
import Colors from '../constants/Colors';
import RestaurantCard from '../components/restaurant/RestaurantCard';

const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('1');

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item.id && styles.activeCategory,
      ]}
      onPress={() => setActiveCategory(item.id)}
    >
      <Icon
        name={item.icon}
        size={24}
        color={activeCategory === item.id ? Colors.white : Colors.gray}
      />
      <Text
        style={[
          styles.categoryText,
          activeCategory === item.id && styles.activeCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRestaurant = ({ item }) => (
    <RestaurantCard restaurant={item} navigation={navigation} />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.locationLabel}>Current Location</Text>
          <View style={styles.locationContainer}>
            <Icon name="location" size={20} color={Colors.primary} />
            <Text style={styles.locationText}>New York, USA</Text>
            <Icon name="chevron-down" size={20} color={Colors.gray} />
          </View>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Icon name="person-circle" size={35} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={Colors.gray} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food, restaurants..."
          placeholderTextColor={Colors.gray}
          onFocus={() => navigation.navigate('Search')}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Featured Restaurants */}
      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Restaurants</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={restaurants.filter((r) => r.featured)}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantsList}
        />
      </View>

      {/* All Restaurants */}
      <View style={styles.allRestaurantsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Restaurants</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.restaurantsGrid}
          showsVerticalScrollIndicator={false}
        />
      </View>
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
    paddingTop: 10,
    paddingBottom: 15,
  },
  locationLabel: {
    fontSize: 12,
    color: Colors.gray,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
    color: Colors.darkGray,
  },
  profileButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkGray,
  },
  categoriesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  categoriesList: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  activeCategory: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.gray,
  },
  activeCategoryText: {
    color: Colors.white,
    fontWeight: '600',
  },
  featuredSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  restaurantsList: {
    paddingHorizontal: 15,
  },
  allRestaurantsSection: {
    flex: 1,
  },
  restaurantsGrid: {
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
});

export default HomeScreen;