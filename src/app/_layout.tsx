import AppProvider from "context/app.context";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { ErrorBoundaryProps, Slot, Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Image, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLOR } from "@/utils/constant";

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#1a1a1a', justifyContent: 'center' }}>
            <View style={{ marginHorizontal: 20, gap: 20, alignItems: 'center' }}>
                <View style={{
                    backgroundColor: '#2c2c2c',
                    padding: 20,
                    borderRadius: 10,
                    alignItems: 'center',
                    gap: 15,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 5
                }}>
                    <MaterialIcons name="error" size={32} color="red" />
                    <Text style={{ color: 'red', fontSize: 22, fontWeight: 'bold' }}>
                        Something went wrong
                    </Text>
                    <Text style={{ color: '#ccc', textAlign: 'center' }}>{error.message}</Text>
                </View>
                <Button title="Try Again" onPress={retry} color="#ff4d4d" />
            </View>
        </SafeAreaView>

    );
}

const RootLayout = () => {
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        },
    };

    return (
        <GestureHandlerRootView>
            <RootSiblingParent>
                <AppProvider>
                    {/* <SafeAreaView style={{
                        flex: 1,
                    }}> */}
                    <ThemeProvider value={navTheme}>
                        <Stack
                            screenOptions={{
                                headerTintColor: APP_COLOR.ORANGE,
                                headerTitleStyle: {
                                    color: "black",
                                },
                            }}
                        >
                            <Stack.Screen
                                name="index"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/login"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/signup"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/verify"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/welcome"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/request.password"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/forgot.password"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/search"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/show.restaurant"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(auth)/popup.sale"
                                options={{
                                    headerShown: false,
                                    animation: "fade",
                                    presentation: "transparentModal",
                                }}
                            />

                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(user)/product/[id]"
                                options={{ headerShown: false }}
                            />

                            <Stack.Screen
                                name="(user)/product/create.model"
                                options={{
                                    headerShown: false,
                                    presentation: "transparentModal",
                                    animation: "fade"
                                }}
                            />

                            <Stack.Screen
                                name="(user)/product/update.modal"
                                options={{
                                    headerShown: false,
                                    presentation: "transparentModal",
                                    animation: "fade"
                                }}
                            />

                            <Stack.Screen
                                name="(user)/product/place.order"
                                options={{
                                    headerTitle: "Order Confirm",
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="(user)/product/cart.modal"
                                options={{
                                    headerShown: false,
                                    presentation: "transparentModal",
                                    animation: "fade"
                                }}
                            />

                            <Stack.Screen
                                name="(user)/account/info"
                                options={{
                                    headerTitle: "User Information",
                                    headerTitleAlign: "center",
                                }}
                            />

                            <Stack.Screen
                                name="(user)/account/password"
                                options={{
                                    headerTitle: "Password Change",
                                    headerTitleAlign: "center",
                                }}
                            />
                        </Stack>
                    </ThemeProvider>
                    {/* </SafeAreaView> */}
                </AppProvider>
            </RootSiblingParent>
        </GestureHandlerRootView>
    )
}

export default RootLayout;