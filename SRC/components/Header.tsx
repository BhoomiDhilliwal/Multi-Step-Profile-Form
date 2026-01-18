import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title = "Calendar", showBack = false }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#144a6aff', '#0a4f5aff', '#0A3A52']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <Path d="M15 18l-6-6 6-6" />
              </Svg>
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.boldText}>{title}</Text>
        <View style={{ width: 22 }} />
      </View>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 8,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 20,
    },
    boldText: {
        fontWeight: '400',
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Inter',
        textAlign: 'center'
    },
    bellIcon: {
        marginTop: 2,
    },
});

export default Header;
