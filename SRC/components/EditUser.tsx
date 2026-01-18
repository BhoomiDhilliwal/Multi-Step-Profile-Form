import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/UserSlice";
import Header from "../components/Header";
import ToastModal from "../components/Toast";

const EditUserScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { editUser } = route.params;
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const [formData, setFormData] = useState({ ...editUser });

  const handleUpdate = () => {
    const { name, email, age, city, state, country } = formData;

    if (!name || !email || !age || !city || !state || !country) {
      showToast("Please fill all fields", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    const ageNumber = Number(age);
    if (isNaN(ageNumber) || ageNumber <= 0 || ageNumber > 120) {
      showToast("Please enter a valid age (1 - 120)", "error");
      return;
    }

    setLoading(true);
    dispatch(updateUser({ ...formData, age: ageNumber }));

    showToast("User updated successfully", "success");

    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1500);
  };


  return (
    <>
      <Header title="Edit User" showBack />

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Edit User Details</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            value={formData.name}
            onChangeText={(t) => setFormData({ ...formData, name: t })}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={formData.email}
            onChangeText={(t) => setFormData({ ...formData, email: t })}
            style={styles.input}
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            value={formData.age}
            keyboardType="numeric"
            onChangeText={(t) => setFormData({ ...formData, age: t })}
            style={styles.input}
          />

          <Text style={styles.label}>City</Text>
          <TextInput
            value={formData.city}
            onChangeText={(t) => setFormData({ ...formData, city: t })}
            style={styles.input}
          />

          <Text style={styles.label}>State</Text>
          <TextInput
            value={formData.state}
            onChangeText={(t) => setFormData({ ...formData, state: t })}
            style={styles.input}
          />

          <Text style={styles.label}>Country</Text>
          <TextInput
            value={formData.country}
            onChangeText={(t) => setFormData({ ...formData, country: t })}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate} disabled={loading}>
          <Text style={styles.btnText}>
            {loading ? "Updating..." : "Update"}
          </Text>
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

export default EditUserScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  bottomButtonContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  updateBtn: {
    backgroundColor: '#144a6aff',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 