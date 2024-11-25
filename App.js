import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native'; // Pastikan Text diimport
import HomeScreen from './src/home/HomeScreen';
import SeasonsScreen from './src/seasons/SeasonsScreen';
import EventsScreen from './src/seasons/EventsScreen'; // Import EventsScreen
import RidersScreen from './src/riders/RidersScreen';
import TeamsScreen from './src/teams/TeamsScreen';
import ProfileScreen from './src/profile/ProfileScreen'; // Import ProfileScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function SeasonsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Seasons" 
        component={SeasonsScreen} 
        options={{ headerTitle: 'MotoGP Seasons' }}
      />
      <Stack.Screen 
        name="Events" 
        component={EventsScreen} 
        options={({ route }) => ({
          headerTitle: () => (
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Events in {route.params?.seasonYear || 'Unknown Season'}
            </Text>
          ),
        })} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Seasons') iconName = 'calendar';
            else if (route.name === 'Riders') iconName = 'person';
            else if (route.name === 'Teams') iconName = 'people';
            else if (route.name === 'Profile') iconName = 'person-circle'; // Icon untuk Profile
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#ff6347',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Seasons" 
          component={SeasonsStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen 
          name="Riders" 
          component={RidersScreen} 
          options={{ headerTitle: 'MotoGP Riders' }}
        />
        <Tab.Screen 
          name="Teams" 
          component={TeamsScreen} 
          options={{ headerTitle: 'MotoGP Teams' }}
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerTitle: 'My Profile' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
