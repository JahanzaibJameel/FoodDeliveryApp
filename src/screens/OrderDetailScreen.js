import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../constants/Colors';

const OrderDetailScreen = ({ navigation, route }) => {
  const { order } = route.params || {
    id: '1',
    restaurant: 'Burger Palace',
    items: [
      { id: '101', name: 'Classic Burger', quantity: 2, price: 8.99 },
      { id: '102', name: 'Fries', quantity: 1, price: 3.99 },
      { id: '103', name: 'Coke', quantity: 1, price: 2.99 },
    ],
    total: 24.97,
    status: 'on_the_way',
    date: '2024-01-15 14:30',
    deliveryAddress: '123 Main St, New York, NY 10001',
    deliveryPerson: {
      name: 'John Smith',
      phone: '+1 (555) 123-4567',
      rating: 4.8,
    },
    estimatedDelivery: '14:45 - 15:00',
    orderNumber: '#12345',
  };

  const [currentStep] = useState(2); // 0: Ordered, 1: Preparing, 2: On the way, 3: Delivered

  const steps = [
    { id: 0, title: 'Ordered', time: '14:30' },
    { id: 1, title: 'Preparing', time: '14:35' },
    { id: 2, title: 'On the way', time: '14:45' },
    { id: 3, title: 'Delivered', time: 'Estimated 15:00' },
  ];

  const getStatusColor = (stepId) => {
    if (stepId < currentStep) return Colors.success;
    if (stepId === currentStep) return Colors.primary;
    return Colors.lightGray;
  };

  const handleCancelOrder = () => {
    Alert.alert(
      'Cancel Order',
      'Are you sure you want to cancel this order?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Order Cancelled', 'Your order has been cancelled successfully');
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleContactDriver = () => {
    Alert.alert(
      'Contact Driver',
      `Call ${order.deliveryPerson.phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Calling...') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="chevron-back" size={30} color={Colors.darkGray} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Order Status Timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.timeline}>
            {steps.map((step, index) => (
              <View key={step.id} style={styles.timelineStep}>
                <View style={styles.stepContainer}>
                  <View
                    style={[
                      styles.stepCircle,
                      { backgroundColor: getStatusColor(step.id) },
                    ]}
                  >
                    {step.id < currentStep ? (
                      <Icon name="checkmark" size={16} color={Colors.white} />
                    ) : (
                      <Text style={styles.stepNumber}>{step.id + 1}</Text>
                    )}
                  </View>
                  {index < steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        {
                          backgroundColor:
                            step.id < currentStep ? Colors.success : Colors.lightGray,
                        },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.stepInfo}>
                  <Text style={styles.stepTitle}>{step.title}</Text>
                  <Text style={styles.stepTime}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Delivery Person */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Person</Text>
          <View style={styles.deliveryPersonCard}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
              style={styles.driverImage}
            />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>{order.deliveryPerson.name}</Text>
              <View style={styles.driverDetails}>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color={Colors.tertiary} />
                  <Text style={styles.ratingText}>{order.deliveryPerson.rating}</Text>
                </View>
                <Text style={styles.driverPhone}>{order.deliveryPerson.phone}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleContactDriver}
            >
              <Icon name="call-outline" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.orderItemsCard}>
            {order.items.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <View style={styles.itemLeft}>
                  <Text style={styles.itemQuantity}>{item.quantity}x</Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
                <Text style={styles.itemPrice}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>${order.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Icon name="location-outline" size={24} color={Colors.primary} />
              <View style={styles.addressInfo}>
                <Text style={styles.addressTitle}>Home</Text>
                <Text style={styles.addressText}>{order.deliveryAddress}</Text>
              </View>
            </View>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 40.7128,
                longitude: -74.0060,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{ latitude: 40.7128, longitude: -74.0060 }}
                title="Delivery Address"
              />
            </MapView>
          </View>
        </View>

        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order Number</Text>
              <Text style={styles.infoValue}>{order.orderNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Order Date</Text>
              <Text style={styles.infoValue}>{order.date}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment Method</Text>
              <Text style={styles.infoValue}>Credit Card **** 1234</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>{order.estimatedDelivery}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {currentStep < 3 && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={handleCancelOrder}
          >
            <Text style={styles.cancelButtonText}>Cancel Order</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.helpButton}
            onPress={() => navigation.navigate('Help')}
          >
            <Icon name="help-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.helpButtonText}>Need Help?</Text>
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
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.darkGray,
  },
  shareButton: {
    padding: 5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 15,
  },
  timelineSection: {
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  timeline: {
    marginTop: 10,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  stepContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepLine: {
    width: 2,
    height: 40,
    marginTop: 5,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  stepTime: {
    fontSize: 14,
    color: Colors.gray,
  },
  deliveryPersonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  driverImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  driverDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.darkGray,
    marginLeft: 5,
  },
  driverPhone: {
    fontSize: 14,
    color: Colors.gray,
  },
  contactButton: {
    backgroundColor: Colors.lightGray,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderItemsCard: {
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
    alignItems: 'center',
    marginBottom: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemQuantity: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: 10,
    minWidth: 25,
  },
  itemName: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  itemPrice: {
    fontSize: 16,
    color: Colors.darkGray,
    fontWeight: '600',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
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
    marginBottom: 15,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 15,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginBottom: 5,
  },
  addressText: {
    fontSize: 14,
    color: Colors.gray,
    lineHeight: 20,
  },
  map: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.gray,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingVertical: 15,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
  helpButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 15,
    borderRadius: 15,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default OrderDetailScreen;