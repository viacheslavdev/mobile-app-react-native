import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import SplashScreenComponent from '../screens/SplashScreen';
import AuthScreen from '@/screens/AuthScreen';
import RegisterScreen from '@/screens/SignUpScreen';
import LoginScreen from '@/screens/SignInScreen';
import PostScreen from '@/screens/PostScreen'
import HomeTabs from '@/navigation/HomeTabs'
import { RootStackParamList } from '../types/RootStackParamList'
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import PinEntryScreen from '@/screens/PinEntryScreen';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} independent={true}>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreenComponent}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
            <Stack.Screen name="PinEntry" component={PinEntryScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="PostScreen" component={PostScreen} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default Navigation;