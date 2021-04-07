import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LoginComponent from '../screens/LoginComponent';
import { BottomTabParamList, WikiParamList, ProfilParamList, SlidesView, LoginParamList, CalendarParamList } from '../types';
import WikiList from "../screens/WikiList";
import WikiDetail from "../screens/WikiDetail";
import ProfilScreen from '../screens/ProfilScreen';
import SlidesViewScreen from '../screens/SlidesViewScreen';
import CalendarScreen from '../screens/CalendarScreen';



const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home-outline" color={color} />,
        }}
      />
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
      <BottomTab.Screen
        name="Wiki"
        component={WikiNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-copy-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Calendrier"
        component={CalendarNavigator}
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
const LoginStack = createStackNavigator<LoginParamList>();

function LoginNavigator() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginComponent"
        component={LoginComponent}
        options={{ headerTitle: 'Connexion' }}
      />
    </LoginStack.Navigator>
  );
}

const ProfilStack = createStackNavigator<ProfilParamList>();

function ProfilNavigator() {
  return (
    <ProfilStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#30475e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
      }
    }} >
      <ProfilStack.Screen name="ProfilScreen" component={ProfilScreen} options={{ headerTitle: 'Mon profil' }} />
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

const WikiStack = createStackNavigator<WikiParamList>();

function WikiNavigator() {
  return (
    <WikiStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#30475e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textTransform: 'capitalize',
      }
    }} >
      <WikiStack.Screen name="Wiki" component={WikiList} options={{ headerTitle: 'Mon Wiki' }} />
      <WikiStack.Screen name="Detail" component={WikiDetail} options={{ headerTitle: 'Detail' }} />
    </WikiStack.Navigator>
  )
}

const CalendarStack = createStackNavigator<CalendarParamList>();

function CalendarNavigator() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{
          headerTitle: 'Calendrier',
          headerStyle: {
            backgroundColor: '#30475e'
          },
          headerTitleStyle: {
            color: '#f05454',
          }
        }}
      />
    </CalendarStack.Navigator>
  );
}
