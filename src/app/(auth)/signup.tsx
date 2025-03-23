import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { registerAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { Link, router } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
})

const SignUpPage = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignUp = async () => {
        try {
            const res = await registerAPI(email, password, name);
            if (res.data) {
                router.replace({
                    pathname: "/(auth)/verify",
                    params: { email: email }
                })
            } else {
                const m = Array.isArray(res.message) ? res.message[0] : res.message;

                Toast.show(m, {
                    duration: Toast.durations.LONG,
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 0.9,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    textStyle: { fontSize: 16 },
                });
            }
        } catch (error) {
            console.log("Check: ", error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 36,
                        fontWeight: "600",
                        marginVertical: 30
                    }}>
                        Sign Up
                    </Text>
                </View>

                <ShareInput
                    title="Fullname"
                    value={name}
                    setValue={setName}
                />

                <ShareInput
                    title="Email"
                    keyboardType="email-address"
                    value={email}
                    setValue={setEmail}
                />

                <ShareInput
                    title="Password"
                    secureTextEntry={true}
                    value={password}
                    setValue={setPassword}
                />

                <View style={{ marginVertical: 10 }}></View>
                <ShareButton
                    title="Sign up"
                    onPress={handleSignUp}
                    textStyle={{
                        textTransform: "uppercase",
                        color: "#fff",
                        paddingVertical: 5
                    }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.ORANGE,
                    }}
                    pressStyle={{ alignSelf: "stretch" }}
                />

                <View style={{
                    marginVertical: 20,
                    flexDirection: "row",
                    gap: 10,
                    justifyContent: "center"
                }}>
                    <Text
                        style={{
                            color: "black"
                        }}
                    >
                        Already have an account?
                    </Text>
                    <Link href={"/(auth)/signup"}>
                        <Text
                            style={{
                                color: APP_COLOR.ORANGE,
                                textDecorationLine: "underline"
                            }}
                        >
                            Login
                        </Text>
                    </Link>
                </View>

                <SocialButton />
            </View>
        </SafeAreaView>

    )
}

export default SignUpPage;