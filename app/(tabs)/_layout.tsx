import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'card' : 'card-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ball"
        options={{
          title: 'Ball',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'globe' : 'globe-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
