import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { loginAPI, registerAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { LoginSchema } from "@/utils/validate.schema"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
})

const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)

    const handleLogin = async () => {
        try {
            setLoading(true);
            const res = await loginAPI(email, password);
            setLoading(false);
            if (res.data) {
                router.replace("/(tabs)");
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

                if (res.statusCode === 400) {
                    router.replace({
                        pathname: "/(auth)/verify",
                        params: { email: email, isLogin: 1 }
                    })
                }
            }
        } catch (error) {
            console.log("Check: ", error);
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <View style={styles.container}>
                <View>
                    <Text style={{
                        fontSize: 36,
                        fontWeight: "600",
                        marginVertical: 30
                    }}>
                        Login
                    </Text>
                </View>

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

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: 20
                    }}>
                    <Text
                        style={{
                            color: APP_COLOR.ORANGE,
                        }}
                    >
                        Forgot password?
                    </Text>
                </View>

                <View style={{ marginVertical: 10 }}></View>

                <ShareButton
                    loading={loading}
                    title="Login"
                    onPress={handleLogin}
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
                        Don’t have an account?
                    </Text>
                    <Link href={"/(auth)/signup"}>
                        <Text
                            style={{
                                color: APP_COLOR.ORANGE,
                                textDecorationLine: "underline"
                            }}
                        >
                            Sign Up
                        </Text>
                    </Link>
                </View>

                <SocialButton
                    title="Sign in with"
                />
            </View> */}
            <Formik
                validationSchema={LoginSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={values => console.log("check values = ", values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={{ margin: 10 }}>
                        <Text>Email</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#ccc" }}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
                        <View style={{ marginVertical: 10 }}></View>
                        <Text>Password</Text>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#ccc" }}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
                        <View style={{ marginVertical: 10 }}></View>

                        <Button onPress={handleSubmit as any} title="Submit" />
                    </View>
                )}
            </Formik>

        </SafeAreaView>

    )
}

export default LoginPage;