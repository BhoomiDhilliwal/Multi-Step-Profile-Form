import React, {useState} from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/UserSlice';
import Header from './Header';
import ToastModal from './Toast';
import { useNavigation } from '@react-navigation/native';

const SummaryScreen = ({ route }) => {
  const dispatch = useDispatch();
  const { formData } = route.params;
const [toast, setToast] = useState({
  visible: false,
  message: '',
  type: 'success',
});
const navigation = useNavigation();

const showToast = (message, type = 'success') => {
  setToast({ visible: true, message, type });
};

const handleSubmit = () => {
  dispatch(
    addUser({
      id: Date.now(),
      ...formData,
    })
  );

  showToast('User created successfully', 'success');

  setTimeout(() => {
    navigation.navigate('HomePage');
  }, 800);
};


  return (
    <>
      <Header title="Summary" showBack />

      <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Summary</Text>
          {Object.entries(formData).map(([key, value]) => (
            <Text key={key} style={{ marginBottom: 6 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{key}:</Text> {value}
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity style={styles.createUserButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
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

export default SummaryScreen;

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
    bottomButtonContainer: {    
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
    },  
    createUserButton: {    
        backgroundColor: '#144a6aff',
        padding: 12,
        alignItems: 'center',
        borderRadius: 5,
    },  
    buttonText: {    
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
     cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});