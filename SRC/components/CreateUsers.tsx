import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Header from './Header';
import ToastModal from './Toast';
import { useNavigation } from '@react-navigation/native';
const CreateUserScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });

  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'error',
  });

  const showToast = (message, type = 'error') => {
    setToast({ visible: true, message, type });
  };
const handleNext = () => {
  const { name, email, age } = formData;

  if (!name || !email || !age) {
    showToast('Please fill all required fields', 'error');
    return;
  }

  // ✅ Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast('Please enter a valid email address', 'error');
    return;
  }

  if (!/^\d{1,2}$/.test(age)) {
    showToast('Age must be a 1 or 2 digit number', 'error');
    return;
  }

  navigation.navigate('AddressScreen', { formData });
};


  return (
    <>
      <Header title="Create User" showBack/>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Basic Info</Text>

          <Text style={styles.label}>
            Name <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) =>
              setFormData({ ...formData, name: text })
            }
            style={styles.input}
          />

          <Text style={styles.label}>
            Email <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) =>
              setFormData({ ...formData, email: text })
            }
            style={styles.input}
          />

          <Text style={styles.label}>
            Age <Text style={{ color: 'red' }}>*</Text>
          </Text>
          <TextInput
            placeholder="Age"
            value={formData.age}
            onChangeText={(text) =>
              setFormData({ ...formData, age: text })
            }
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity
          style={styles.createUserButton}
          onPress={handleNext}
        >
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

export default CreateUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9e9e9ff',
    padding: 12,

    marginBottom: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },

  bottomButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: '#fff',
  },
  createUserButton: {
    backgroundColor: '#144a6aff',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
