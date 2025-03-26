import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from "react-native-safe-area-context";


const RootLayout = () => {
    const navTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'transparent',
        },
    };
    return (
        <RootSiblingParent>
            <SafeAreaView style={{
                flex: 1,
            }}>
                <ThemeProvider value={navTheme}>
                    <Stack
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#f4511e',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: 'bold',
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
                            name="(tabs)"
                            options={{ headerShown: false }}
                        />

                        <Stack.Screen
                            name="product/index"
                            options={{ headerTitle: "Sản phẩm" }}
                        />
                    </Stack>
                </ThemeProvider>
            </SafeAreaView>
        </RootSiblingParent>
    )
}

export default RootLayout;