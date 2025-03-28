import { Tabs } from "expo-router";
import { APP_COLOR } from "@/utils/constant";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const TabLayout = () => {

    const getIcons = (routeName: string, focused: boolean, size: number) => {
        if (routeName === "index") {
            return (
                <MaterialCommunityIcons
                    name="silverware-fork-knife"
                    size={size}
                    color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />
            )
        }

        if (routeName === "order") {
            return (
                <MaterialIcons
                    name="list-alt"
                    size={size}
                    color={focused ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />
            )
        }

        if (routeName === "favorite") {
            return (focused ?
                <AntDesign
                    name="heart"
                    size={size}
                    color={APP_COLOR.ORANGE}
                />
                :
                <AntDesign
                    name="hearto"
                    size={size}
                    color={APP_COLOR.GREY}
                />)
        }

        if (routeName === "notification") {
            return (focused ?
                <Ionicons
                    name="notifications"
                    size={size}
                    color={APP_COLOR.ORANGE}
                />
                :
                <Ionicons
                    name="notifications-outline"
                    size={size}
                    color={APP_COLOR.GREY}
                />)
        }

        if (routeName === "account") {
            return (focused ?
                <MaterialCommunityIcons
                    name="account"
                    size={size}
                    color={APP_COLOR.ORANGE}
                />
                :
                <MaterialCommunityIcons
                    name="account-outline"
                    size={size}
                    color={APP_COLOR.GREY}
                />)
        }

        return (<></>)
    }

    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return getIcons(route.name, focused, size);
                },
                headerShown: false,
                tabBarActiveTintColor: APP_COLOR.ORANGE,
            })}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                }}
            />

            <Tabs.Screen
                name="order"
                options={{
                    title: 'My Orders',
                }}
            />

            <Tabs.Screen
                name="favorite"
                options={{
                    title: 'Likes',
                }}
            />

            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Notifications',
                }}
            />

            <Tabs.Screen
                name="account"
                options={{
                    title: 'Me',
                }}
            />
        </Tabs>
    )
}

export default TabLayout;