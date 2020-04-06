import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Charts } from '../charts/Charts';
import { Dashboard } from '../dashboard/Dashboard';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Charts" component={Charts} />
    </Tab.Navigator>
  );
}
