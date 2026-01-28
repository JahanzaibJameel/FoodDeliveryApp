import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../../context/CartContext';
import Colors from '../../constants/Colors';

const Header = ({
  title,
  leftIcon,
  leftOnPress,
  rightIcon,
  rightOnPress,
  showCart = false,
  navigation,
}) => {
  const { getCartCount } = useCart();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {leftIcon ? (
          <TouchableOpacity onPress={leftOnPress} style={styles.iconButton}>
            <Icon name={leftIcon} size={24} color={Colors.darkGray} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}

        <Text style={styles.title}>{title}</Text>

        {showCart ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartButton}
          >
            <Icon name="cart" size={24} color={Colors.primary} />
            {getCartCount() > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{getCartCount()}</Text>
              </View>
            )}
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity onPress={rightOnPress} style={styles.iconButton}>
            <Icon name={rightIcon} size={24} color={Colors.darkGray} />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  iconButton: {
    padding: 8,
  },
  iconPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    textAlign: 'center',
  },
  cartButton: {
    padding: 8,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Header;