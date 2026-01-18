import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import { store, persistor } from './SRC/redux/store';
import HomePage from './SRC/screens/HomePage';
import CreateUserScreen from './SRC/components/CreateUsers';
import AddressScreen from './SRC/components/AddressScreen';
import SummaryScreen from './SRC/components/SummaryScreen';
import { PersistGate } from "redux-persist/integration/react";
import EditUserScreen from './SRC/components/EditUser';
import LinearGradient from 'react-native-linear-gradient';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
         <LinearGradient
        colors={['#144a6aff', '#0a4f5aff', '#0A3A52']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        
      >
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      </LinearGradient>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="HomePage"
                component={HomePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateUser"
                component={CreateUserScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddressScreen"
                component={AddressScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SummaryScreen"
                component={SummaryScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditUser"
                component={EditUserScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}


export default App;
