import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import SlidesViewScreen from '../screens/SlidesViewScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, SlidesView } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ 
        activeTintColor: "#f05454",
        // activeBackgroundColor:"green",
        style:{
          backgroundColor: '#30475e'
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-home-outline" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      /> */}
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
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title',  headerStyle: {
          backgroundColor: '#30475e'
        },
        headerTitleStyle: {
          color: '#f05454',
        }
      }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title', headerStyle: {
          backgroundColor: '#30475e'
        },
        headerTitleStyle: {
          color: '#f05454',
        }
      }}
      />
    </TabTwoStack.Navigator>
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
