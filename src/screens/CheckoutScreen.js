// src/screens/CheckoutScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContext';
import Colors from '../constants/Colors';

const CheckoutScreen = ({ navigation }) => {
  const { cart, total, clearCart } = useCart();
  const [address] = useState('123 Main St, New York, USA');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');

  const handlePlaceOrder = () => {
    Alert.alert(
      'Order Placed!',
      'Your order has been placed successfully. You will receive a confirmation email shortly.',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Home');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back" size={30} color={Colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Checkout</Text>
          <View style={styles.spacer} />
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Icon name="location" size={24} color={Colors.primary} />
              <Text style={styles.addressTitle}>Home</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressText}>{address}</Text>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {[
              { id: 'card', title: 'Credit/Debit Card', icon: 'card' },
              { id: 'paypal', title: 'PayPal', icon: 'logo-paypal' },
              { id: 'apple', title: 'Apple Pay', icon: 'logo-apple' },
              { id: 'cash', title: 'Cash on Delivery', icon: 'cash' },
            ].map((method) => (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  paymentMethod === method.id && styles.selectedPayment,
                ]}
                onPress={() => setPaymentMethod(method.id)}
              >
                <Icon
                  name={method.icon}
                  size={24}
                  color={paymentMethod === method.id ? Colors.white : Colors.gray}
                />
                <Text
                  style={[
                    styles.paymentText,
                    paymentMethod === method.id && styles.selectedPaymentText,
                  ]}
                >
                  {method.title}
                </Text>
                {paymentMethod === method.id && (
                  <Icon name="checkmark-circle" size={24} color={Colors.white} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor={Colors.gray}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            {cart.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Text style={styles.orderItemName}>
                  {item.quantity}x {item.name}
                </Text>
                <Text style={styles.orderItemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>
                ${(total + 2.99 + total * 0.08).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerLabel}>Total:</Text>
          <Text style={styles.footerPrice}>
            ${(total + 2.99 + total * 0.08).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Place Order</Text>
          <Icon name="arrow-forward" size={20} color={Colors.white} />
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 15,
  },
  addressCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    flex: 1,
    color: Colors.darkGray,
  },
  editButton: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  editButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  addressText: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 15,
    lineHeight: 20,
  },
  changeButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changeButtonText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  paymentMethods: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  selectedPayment: {
    backgroundColor: Colors.primary,
  },
  paymentText: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: Colors.gray,
  },
  selectedPaymentText: {
    color: Colors.white,
    fontWeight: '600',
  },
  promoContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
  },
  promoInput: {
    flex: 1,
    padding: 20,
    fontSize: 16,
    color: Colors.darkGray,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  orderItemName: {
    fontSize: 14,
    color: Colors.gray,
  },
  orderItemPrice: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  footerTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  footerLabel: {
    fontSize: 16,
    color: Colors.gray,
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  placeOrderButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
  },
  placeOrderText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  spacer: {
    width: 30,
  },
});

export default CheckoutScreen;