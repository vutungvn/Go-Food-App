import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from 'expo-splash-screen';
import * as Network from 'expo-network';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
    const { setAppState } = useCurrentApp();
    const [state, setState] = useState<any>();

    useEffect(() => {
        async function prepare() {
            try {
                // const netStatus = { isConnected: false };
                const netStatus = await Network.getNetworkStateAsync();
                if (!netStatus.isConnected) {
                    setState(() => {
                        throw new Error('Không có kết nối mạng. Vui lòng kiểm tra lại.');
                    });
                }
                // Pre-load fonts, make any API calls you need to do here
                const res = await getAccountAPI();

                if (res.data) {
                    //success
                    setAppState({
                        user: res.data.user,
                    });
                    router.replace("/(auth)/welcome")
                } else {
                    //error
                    router.replace("/(auth)/welcome")
                }
            } catch (e) {
                setState(() => {
                    throw new Error('Không thể kết nối tới API Backend...')
                })
                // console.log("Không thể kết nối tới API Backend...")
                // console.warn(e);
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