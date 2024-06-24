import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator()


const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'TabHome':
              iconName = 'home';
              break;
            case 'TabPortfolio':
              iconName = 'briefcase';
              break;
            case 'TabSearch':
              iconName = 'search';
              break;
            case 'TabProfile':
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FA8A34',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="TabHome" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="TabPortfolio" component={PortfolioScreen} options={{ headerShown: false }} />
      <Tab.Screen name="TabSearch" component={SearchScreen} options={{ headerShown: false }} />
      <Tab.Screen name="TabProfile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default HomeTabs