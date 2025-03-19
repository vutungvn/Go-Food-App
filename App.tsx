import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "@expo/vector-icons/Ionicons";
import Home from './src/components/learn/home';
import HomeDetail from './src/components/learn/home.detail';
import Like from './src/app/like';
import LikeDetail from './src/app/like/like.detail';
import About from './src/components/learn/about';
import ChangePassword from './src/components/learn/change.password';

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  const TabApp = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home}
        />
        <Tab.Screen name="Like" component={Like}
        />
      </Tab.Navigator>
    )
  }

  const StackApp = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={TabApp}
          options={{ headerTitle: "Trang trủ", headerShown: false }}
        />
        <Stack.Screen
          name="HomeDetail"
          component={HomeDetail}
          options={({ route }: { route: any }) => ({
            headerTitle: `Xem chi tiết ${route?.params?.userId ?? ""}`
          })}
        />
        <Stack.Screen
          name="LikeDetail"
          component={LikeDetail}
        />
      </Stack.Navigator>
    )
  }
  return (
    <NavigationContainer>

      <Drawer.Navigator>
        <Drawer.Screen
          name="StackApp" component={StackApp}
        />
        <Drawer.Screen
          name="About" component={About}
        />
        <Drawer.Screen
          name="ChangePassword" component={ChangePassword}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

