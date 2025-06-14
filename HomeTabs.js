import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CalculatorScreen from './CalculatorScreen';
import TrendingScreen from './TrendingScreen';
import HistoryScreen from './HistoryScreen';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#fff',
      }}
    >
      <Tab.Screen
        name="Calculadora"
        component={CalculatorScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calculator" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Em Alta"
        component={TrendingScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="fire" size={20} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
