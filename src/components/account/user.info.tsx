import User from "@/app/(user)/user";
import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { Image, Platform, Text, View, StyleSheet } from "react-native";

const UserInfo = () => {
    const { appState } = useCurrentApp();

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/avatar`;

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.avatar}
                    source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
                />
                <Text style={styles.username}>{appState?.user.name}</Text>
            </View>

            <View style={styles.inputContainer}>
                <ShareInput
                    title="Full name"
                    value={appState?.user.name}
                />

                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={appState?.user.email}
                />

                <ShareInput
                    title="Phone Number"
                    value={appState?.user.phone}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 20,
        alignItems: "center",
    },
    profileContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: "#ddd",
    },
    username: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    inputContainer: {
        width: "100%",
        marginTop: 10,
        gap: 20
    },
});

export default UserInfo;
