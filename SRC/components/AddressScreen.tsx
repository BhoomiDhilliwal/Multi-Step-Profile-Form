import React from "react";
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Header from './Header';
import ToastModal from './Toast';

const AddressScreen = ({ route, navigation }) => {
  const [formData, setFormData] = useState(route.params.formData);
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error',
  });

  const showToast = (message, type = 'error') => {
    setToast({ visible: true, message, type });
  };

  const handleNext = () => {
    const { city, state, country } = formData;

    if (!city || !state || !country) {
      showToast('Please fill address details', 'error');

      return;
    }

    navigation.navigate('SummaryScreen', { formData });
  };

  return (
    <>
      <Header title="Address Info" showBack />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Address Info</Text>
          <View>
            <Text style={styles.label}>City <Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
              placeholder="City"
              value={formData.city}
              onChangeText={(text) =>
                setFormData({ ...formData, city: text })
              }
              style={styles.input}
            />

          </View>
          <Text style={styles.label}>State <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            placeholder="State"
            value={formData.state}
            onChangeText={(text) =>
              setFormData({ ...formData, state: text })
            }
            style={styles.input}
          />
          <Text style={styles.label}>Country <Text style={{ color: 'red' }}>*</Text></Text>
          <TextInput
            placeholder="Country"
            value={formData.country}
            onChangeText={(text) =>
              setFormData({ ...formData, country: text })
            }
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.createUserButton} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <ToastModal
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, visible: false })}
      />

    </>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  bottomButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  createUserButton: {
    backgroundColor: '#144a6aff',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});