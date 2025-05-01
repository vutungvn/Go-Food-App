import { useCurrentApp } from "@/context/app.context";
import { getURLBaseBackend } from "@/utils/api";
import { router } from "expo-router";
import { Alert, Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { APP_COLOR } from "@/utils/constant";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react";

const AccountPage = () => {

    const { appState, setAppState } = useCurrentApp();
    const baseImage = `${getURLBaseBackend()}/images/avatar`;
    const insets = useSafeAreaInsets();

    const style = StyleSheet.create({
        information: {
            paddingTop: insets.top,
            paddingHorizontal: 20,
            paddingBottom: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            backgroundColor: APP_COLOR.ORANGE,
        },
        list_item: {
            paddingVertical: 20,
            paddingHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
        },
        list_item_information: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        text: {
            fontSize: 16,
            fontWeight: "400",
            color: "#505050"
        }
    })

    const handleLogout = () => {
        Alert.alert('Log Out', 'Are you sure you want to log out the user?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Confirm',
                onPress: async () => {
                    await AsyncStorage.removeItem("access_token");
                    router.replace("/(auth)/welcome");
                }
            },
        ]);
    }

    // Load user data from AsyncStorage on component mount
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    const parsedUser = JSON.parse(storedUser);
                    setAppState((prevState: typeof appState) => ({
                        ...prevState,
                        user: parsedUser,
                    }));
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
            }
        };

        loadUserData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Pressable
                onPress={() => router.navigate("/(user)/account/info")}
            >
                <View style={style.information}>
                    <Image
                        style={{ width: 60, height: 60 }}
                        source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
                    />
                    <View>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "400" }}>{appState?.user.name}</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable
                onPress={() => router.navigate("/(user)/account/info")}
                style={style.list_item}>
                <View style={style.list_item_information}>
                    <Feather name="user-check" size={20} color="green" />
                    <Text style={style.text}>Update Information</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable
                onPress={() => router.navigate("/(user)/account/password")}
                style={style.list_item}
            >
                <View style={style.list_item_information}>
                    <MaterialIcons name="password" size={20} color="green" />
                    <Text style={style.text}>Change Password</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={style.list_item}>
                <View style={style.list_item_information}>
                    <FontAwesome name="language" size={24} color="grey" />
                    <Text style={style.text}>Language</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={style.list_item}>
                <View style={style.list_item_information}>
                    <MaterialCommunityIcons name="food-fork-drink" size={24} color={APP_COLOR.ORANGE} />
                    <Text style={style.text}>About GoFood</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <View style={{ backgroundColor: "#e9e9e9", height: 10 }}></View>

            <Pressable style={style.list_item}>
                <View style={style.list_item_information}>
                    <Ionicons name="location-outline" size={24} color="green" />
                    <Text style={style.text}>Address</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={style.list_item}>
                <View style={style.list_item_information}>
                    <FontAwesome5 name="user-plus" size={20} color={APP_COLOR.ORANGE} />
                    <Text style={style.text}>Invite Friends</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <Pressable style={style.list_item}>
                <View style={style.list_item_information}>
                    <Feather name="help-circle" size={24} color="green" />
                    <Text style={style.text}>Help Centre</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <View style={{ backgroundColor: "#e9e9e9", height: 10 }}></View>

            <Pressable style={style.list_item}>
                <View style={style.list_item_information}>
                    <MaterialIcons name="payment" size={24} color="indigo" />
                    <Text style={style.text}>Payment</Text>
                </View>
                <MaterialIcons name="navigate-next" size={24} color="grey" />
            </Pressable>

            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    gap: 3,
                    paddingBottom: insets.bottom + 30,
                }}
            >
                <Pressable
                    onPress={handleLogout}
                    style={({ pressed }) => ({
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: APP_COLOR.ORANGE,
                        padding: 10,
                        borderRadius: 3,
                        paddingHorizontal: 10,
                        marginHorizontal: 10,
                        alignItems: "center",
                    })}
                >
                    <Text
                        style={{
                            color: "white",
                            fontSize: 18,
                            fontWeight: "500",
                        }}
                    >Log Out</Text>
                </Pressable>
                <Text style={{ textAlign: "center", color: "gray", marginTop: 5, fontWeight: "500" }}>Version 7.40.0</Text>
                <Text style={{ textAlign: "center", color: "gray", fontWeight: "500" }}>Foody Corporation (@Thanh Tùng)</Text>
            </View>
        </View>
    )
};

export default AccountPage;
