import { router } from "expo-router";
import { useEffect } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
    const { setAppState } = useCurrentApp();

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                const res = await getAccountAPI();

                if (res.data) {
                    //success
                    setAppState({
                        user: res.data.user,
                    });
                    router.replace("/(tabs)")
                } else {
                    //error
                    router.replace("/(auth)/welcome")
                }
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                await SplashScreen.hideAsync();
            }
        }

        prepare();
    }, []);

    return (
        <>

        </>
    )
}

export default RootPage;