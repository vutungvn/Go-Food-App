import ShareButton from "@/components/button/share.button"
import SocialButton from "@/components/button/social.button"
import ShareInput from "@/components/input/share.input"
import { registerAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { SignUpSchema } from "@/utils/validate.schema"
import { Link, router } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
})

const SignUpPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignUp = async (email: string, password: string, name: string) => {
        try {
            setLoading(true);
            const res = await registerAPI(email, password, name);
            setLoading(false);
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
            <Formik
                validationSchema={SignUpSchema}
                initialValues={{ name: '', email: '', password: '' }}
                onSubmit={values => handleSignUp(values.email, values.password, values.name)}
            >
                {({ handleChange, handleBlur, handleSubmit, values,
                    errors, touched }) => (
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
                            title="Full name"
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            error={errors.name}
                            touched={touched.name}
                        />

                        <ShareInput
                            title="Email"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                        />

                        <ShareInput
                            title="Password"
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                        />

                        <View style={{ marginVertical: 10 }}></View>
                        <ShareButton
                            loading={loading}
                            title="Sign up"
                            onPress={handleSubmit as any}
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
                            <Link href={"/(auth)/login"}>
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

                        <SocialButton
                            title="Sign up with"
                        />
                    </View>
                )}
            </Formik>
        </SafeAreaView>

    )
}

export default SignUpPage;