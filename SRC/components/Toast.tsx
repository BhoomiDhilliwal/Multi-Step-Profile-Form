import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

const ToastModal = ({ visible, message, type = 'success', onClose }) => {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const getColor = () => {
    switch (type) {
      case 'success': return '#4CAF50';
      case 'error': return '#F44336';
      case 'warning': return '#FFC107';
      default: return '#333';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return 'checkcircleo';
      case 'error': return 'closecircleo';
      case 'warning': return 'exclamationcircleo';
      default: return '';
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.toastBox,
          { backgroundColor: getColor(), transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.toastText}>{message}</Text>
        
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 9999, 
    elevation: 9999,
  },
  toastBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    minWidth: '85%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  toastText: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginLeft: 4,
  },
});

export default ToastModal;
