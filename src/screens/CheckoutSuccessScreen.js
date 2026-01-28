import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../constants/Colors';

const CheckoutSuccessScreen = ({ navigation, route }) => {
  const { orderNumber = '#12345', estimatedTime = '30-40 min' } = route.params || {};
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.bezier(0.2, 0.8, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale }] }]}>
          <View style={styles.successIcon}>
            <Icon name="checkmark" size={80} color={Colors.white} />
          </View>
        </Animated.View>

        <Animated.View style={[styles.textContainer, { opacity, transform: [{ translateY }] }]}>
          <Text style={styles.title}>Order Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your order has been placed successfully
          </Text>

          <View style={styles.orderInfo}>
            <View style={styles.infoRow}>
              <Icon name="receipt-outline" size={20} color={Colors.gray} />
              <Text style={styles.infoLabel}>Order Number:</Text>
              <Text style={styles.infoValue}>{orderNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="time-outline" size={20} color={Colors.gray} />
              <Text style={styles.infoLabel}>Estimated Delivery:</Text>
              <Text style={styles.infoValue}>{estimatedTime}</Text>
            </View>
            <View style={styles.infoRow}>
              <Icon name="location-outline" size={20} color={Colors.gray} />
              <Text style={styles.infoLabel}>Delivery Address:</Text>
              <Text style={styles.infoValue}>123 Main St, New York</Text>
            </View>
          </View>
        </Animated.View>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b' }}
          style={styles.foodImage}
        />

        <View style={styles.actionsContainer}>
          <Text style={styles.trackingText}>
            You can track your order in the "My Orders" section
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.trackButton]}
              onPress={() => navigation.navigate('Orders')}
            >
              <Icon name="location" size={20} color={Colors.white} />
              <Text style={styles.trackButtonText}>Track Order</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.homeButton]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  iconContainer: {
    marginBottom: 30,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.success,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  orderInfo: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.gray,
    marginLeft: 10,
    marginRight: 5,
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '600',
  },
  foodImage: {
    width: '100%',
    height: 150,
    borderRadius: 20,
    marginBottom: 30,
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  trackingText: {
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    marginRight: 10,
  },
  trackButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: Colors.lightGray,
    marginLeft: 10,
  },
  homeButtonText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutSuccessScreen;