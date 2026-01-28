import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { restaurants } from '../constants/Data';
import Colors from '../constants/Colors';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    'Burger',
    'Pizza',
    'Sushi',
    'Chinese',
    'Pasta',
  ]);
  const [popularCategories] = useState([
    { name: 'Burger', icon: 'fast-food', count: 15 },
    { name: 'Pizza', icon: 'pizza', count: 12 },
    { name: 'Sushi', icon: 'fish', count: 8 },
    { name: 'Mexican', icon: 'restaurant', count: 10 },
    { name: 'Chinese', icon: 'bowl', count: 7 },
    { name: 'Italian', icon: 'wine', count: 9 },
  ]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.menu.some((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    // Extract menu items that match
    const menuItems = [];
    restaurants.forEach((restaurant) => {
      restaurant.menu.forEach((item) => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          menuItems.push({ ...item, restaurant: restaurant.name });
        }
      });
    });

    setSearchResults([...filtered, ...menuItems.slice(0, 5)]);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== '' && !recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const renderSearchResult = ({ item }) => {
    if (item.restaurant) {
      // Menu item
      return (
        <TouchableOpacity
          style={styles.menuItemResult}
          onPress={() => navigation.navigate('FoodDetail', { item })}
        >
          <Image source={{ uri: item.image }} style={styles.menuItemImage} />
          <View style={styles.menuItemInfo}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemRestaurant}>{item.restaurant}</Text>
            <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      // Restaurant
      return (
        <TouchableOpacity
          style={styles.restaurantResult}
          onPress={() => navigation.navigate('Restaurant', { restaurant: item })}
        >
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName}>{item.name}</Text>
            <View style={styles.restaurantDetails}>
              <View style={styles.detailItem}>
                <Icon name="star" size={14} color={Colors.tertiary} />
                <Text style={styles.detailText}>{item.rating}</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="time" size={14} color={Colors.gray} />
                <Text style={styles.detailText}>{item.deliveryTime}</Text>
              </View>
              <View style={styles.detailItem}>
                <Icon name="pricetag" size={14} color={Colors.gray} />
                <Text style={styles.detailText}>{item.deliveryFee}</Text>
              </View>
            </View>
            <Text style={styles.restaurantCategory}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={30} color={Colors.darkGray} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color={Colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food, restaurants..."
            placeholderTextColor={Colors.gray}
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Icon name="close-circle" size={20} color={Colors.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchQuery.length === 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Recent Searches */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            <View style={styles.tagsContainer}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.tag}
                  onPress={() => handleSearch(search)}
                >
                  <Icon name="time-outline" size={16} color={Colors.gray} />
                  <Text style={styles.tagText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setRecentSearches([])}
            >
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {/* Popular Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Categories</Text>
            <View style={styles.categoriesGrid}>
              {popularCategories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.categoryCard}
                  onPress={() => handleSearch(category.name)}
                >
                  <View style={styles.categoryIconContainer}>
                    <Icon name={category.icon} size={30} color={Colors.primary} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>{category.count} places</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Popular Dishes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Popular Dishes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {restaurants[0].menu.slice(0, 4).map((dish, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dishCard}
                  onPress={() => navigation.navigate('FoodDetail', { item: dish })}
                >
                  <Image source={{ uri: dish.image }} style={styles.dishImage} />
                  <View style={styles.dishInfo}>
                    <Text style={styles.dishName}>{dish.name}</Text>
                    <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.resultsList}
          ListEmptyComponent={
            <View style={styles.noResults}>
              <Icon name="search-outline" size={80} color={Colors.lightGray} />
              <Text style={styles.noResultsTitle}>No Results Found</Text>
              <Text style={styles.noResultsText}>
                We couldn't find any restaurants or dishes matching "{searchQuery}"
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  backButton: {
    marginRight: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.darkGray,
    marginLeft: 10,
    marginRight: 10,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tagText: {
    fontSize: 14,
    color: Colors.darkGray,
    marginLeft: 5,
  },
  clearButton: {
    alignSelf: 'flex-start',
  },
  clearButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 5,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: Colors.gray,
  },
  dishCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginRight: 15,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dishImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  dishInfo: {
    padding: 15,
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  dishPrice: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  resultsList: {
    padding: 20,
  },
  restaurantResult: {
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
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  restaurantDetails: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  detailText: {
    fontSize: 12,
    color: Colors.gray,
    marginLeft: 3,
  },
  restaurantCategory: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  menuItemResult: {
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
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  menuItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  menuItemRestaurant: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 5,
  },
  menuItemPrice: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  noResults: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginTop: 20,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SearchScreen;