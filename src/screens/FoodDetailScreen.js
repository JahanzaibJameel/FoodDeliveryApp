import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Rating } from 'react-native-ratings';
import { useCart } from '../context/CartContext';
import Colors from '../constants/Colors';

const FoodDetailScreen = ({ route, navigation }) => {
  const { item, restaurant } = route.params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});

  const options = {
    size: ['Small', 'Medium', 'Large'],
    spice: ['Mild', 'Medium', 'Hot', 'Extra Hot'],
    extras: [
      { name: 'Extra Cheese', price: 1.5 },
      { name: 'Extra Sauce', price: 0.5 },
      { name: 'Bacon', price: 2.0 },
      { name: 'Avocado', price: 1.5 },
    ],
  };

  const handleAddToCart = () => {
    const itemWithOptions = {
      ...item,
      quantity,
      selectedOptions,
      restaurantName: restaurant.name,
      restaurantId: restaurant.id,
    };
    addToCart(itemWithOptions);
    navigation.goBack();
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${item.name} from ${restaurant.name} on FoodDelivery! ${item.description}`,
        url: 'https://fooddelivery.com',
        title: item.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerImageContainer}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevron-back" size={30} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Icon name="share-social" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="heart" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Food Info */}
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.foodName}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>

          <View style={styles.ratingContainer}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={20}
              readonly
              startingValue={4.5}
              tintColor={Colors.background}
            />
            <Text style={styles.ratingText}>4.5 (200+ ratings)</Text>
          </View>

          <Text style={styles.description}>{item.description}</Text>

          {/* Restaurant Info */}
          <TouchableOpacity
            style={styles.restaurantInfo}
            onPress={() => navigation.navigate('Restaurant', { restaurant })}
          >
            <View style={styles.restaurantLeft}>
              <Image
                source={{ uri: restaurant.image }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantCategory}>
                  {restaurant.category}
                </Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={24} color={Colors.gray} />
          </TouchableOpacity>

          {/* Size Options */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.optionsContainer}>
              {options.size.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.optionButton,
                    selectedOptions.size === size && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedOptions({ ...selectedOptions, size })
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.size === size && styles.selectedOptionText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Spice Level */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Spice Level</Text>
            <View style={styles.optionsContainer}>
              {options.spice.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.optionButton,
                    selectedOptions.spice === level && styles.selectedOption,
                  ]}
                  onPress={() =>
                    setSelectedOptions({ ...selectedOptions, spice: level })
                  }
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOptions.spice === level &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Extras */}
          <View style={styles.optionsSection}>
            <View style={styles.extrasHeader}>
              <Text style={styles.sectionTitle}>Extra Toppings</Text>
              <Text style={styles.extrasSubtitle}>Select up to 4 items</Text>
            </View>
            {options.extras.map((extra) => (
              <TouchableOpacity
                key={extra.name}
                style={styles.extraItem}
                onPress={() => {
                  const extras = selectedOptions.extras || [];
                  if (extras.includes(extra.name)) {
                    setSelectedOptions({
                      ...selectedOptions,
                      extras: extras.filter((name) => name !== extra.name),
                    });
                  } else {
                    setSelectedOptions({
                      ...selectedOptions,
                      extras: [...extras, extra.name],
                    });
                  }
                }}
              >
                <View style={styles.extraLeft}>
                  <View
                    style={[
                      styles.checkbox,
                      selectedOptions.extras?.includes(extra.name) &&
                        styles.checkboxChecked,
                    ]}
                  >
                    {selectedOptions.extras?.includes(extra.name) && (
                      <Icon name="checkmark" size={16} color={Colors.white} />
                    )}
                  </View>
                  <Text style={styles.extraName}>{extra.name}</Text>
                </View>
                <Text style={styles.extraPrice}>+${extra.price.toFixed(2)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Special Instructions */}
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>Special Instructions</Text>
            <View style={styles.instructionsContainer}>
              <Icon
                name="create-outline"
                size={20}
                color={Colors.gray}
                style={styles.instructionsIcon}
              />
              <Text style={styles.instructionsPlaceholder}>
                Any specific requests? (Optional)
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Icon name="remove" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Icon name="add" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Icon name="cart" size={24} color={Colors.white} style={styles.cartIcon} />
          <Text style={styles.addToCartText}>
            Add to Cart • ${(item.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 5,
  },
  headerActions: {
    position: 'absolute',
    top: 50,
    right: 20,
    flexDirection: 'row',
  },
  actionButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    padding: 8,
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.darkGray,
    flex: 1,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    lineHeight: 24,
    marginBottom: 25,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.lightGray,
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  restaurantLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  restaurantImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  restaurantCategory: {
    fontSize: 14,
    color: Colors.primary,
  },
  optionsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: Colors.white,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.gray,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: Colors.white,
    fontWeight: '600',
  },
  extrasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  extrasSubtitle: {
    fontSize: 12,
    color: Colors.gray,
  },
  extraItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  extraLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  extraName: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  extraPrice: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 15,
    padding: 15,
  },
  instructionsIcon: {
    marginRight: 10,
  },
  instructionsPlaceholder: {
    fontSize: 14,
    color: Colors.gray,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 25,
    padding: 5,
    marginRight: 15,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    color: Colors.darkGray,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    marginRight: 10,
  },
  addToCartText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FoodDetailScreen;