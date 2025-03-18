import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const Stack = createNativeStackNavigator();

  function HomeScreen(props: any) {
    const navigation = props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate("hoidanit")}
            title='Go to Detail' />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate("hoidanit",
              { userId: 1, name: "Eric" }
            )}
            title='Go user id = 1' />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Button
            onPress={() => navigation.navigate("hoidanit",
              { userId: 2, name: "Thanh Tung" }
            )}
            title='Go user id = 2' />
        </View>
      </View>
    );
  }

  function DetailsScreen(props: any) {
    const route: any = useRoute();
    const navigation: any = useNavigation();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>user id = {route?.params?.userId}</Text>
        <Button
          onPress={() => navigation.goBack()}
          title='Go to Home' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="hoidanit" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

