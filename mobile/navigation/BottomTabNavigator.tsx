import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ProfilScreen from '../screens/ProfilScreen';

import { BottomTabParamList, ProfilParamList, SlidesView } from '../types';
import SlidesViewScreen from '../screens/SlidesViewScreen';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Profil"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: {backgroundColor: Colors[colorScheme].background} }}>
      <BottomTab.Screen
        name="Profil"
        component={ProfilNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Slides"
        component={SlidesViewNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-copy-outline" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/ <AntDesign name="switcher" size={24} color="black" />
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const ProfilStack = createStackNavigator<ProfilParamList>();

function ProfilNavigator() {
  return (
    <ProfilStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor:'#30475e', 
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
      }
    }} >
      <ProfilStack.Screen name="ProfilScreen" component={ProfilScreen} options={{ headerTitle: 'Mon profil'}} />
    </ProfilStack.Navigator>
  );
}

const SlidesViewStack = createStackNavigator<SlidesView>();

function SlidesViewNavigator() {
  return (
    <SlidesViewStack.Navigator>
      <SlidesViewStack.Screen
        name="SlidesViewScreen"
        component={SlidesViewScreen}
        options={{ 
          headerTitle: 'Slides', 
          headerStyle: {
            backgroundColor: '#30475e'
          },
          headerTitleStyle: {
            color: '#f05454',
          }
        }}
      />
    </SlidesViewStack.Navigator>
  );
}
