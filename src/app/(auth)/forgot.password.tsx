import ShareButton from "@/components/button/share.button"
import ShareInput from "@/components/input/share.input"
import { forgotPasswordAPI, loginAPI, requestPasswordAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { ForgotPasswordSchema } from "@/utils/validate.schema"
import { router, useLocalSearchParams } from "expo-router"
import { Formik } from "formik"
import { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import Toast from "react-native-root-toast"
import { SafeAreaView } from "react-native-safe-area-context"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        gap: 10
    },
})

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { email } = useLocalSearchParams();

    const handleForgotPassword = async (code: string, password: string) => {
        try {
            setLoading(true)
            const res = await forgotPasswordAPI(code, email as string, password);
            setLoading(false)
            if (res.data) {
                Toast.show("Thay đổi mật khẩu thành công.", {
                    duration: Toast.durations.LONG,
                    backgroundColor: APP_COLOR.GREEN,
                    opacity: 0.9,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                    textStyle: { fontSize: 16 },
                });
                router.replace("/(auth)/login");
            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

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
            console.log(">>> check error: ", error)
        }
    }

    const handleResendCode = async () => {
        //call api
        const res = await requestPasswordAPI(email as string);
        const m = res.data ? "Gửi lại mã thành công" : res.message;
        Toast.show(m as string, {
            duration: Toast.durations.LONG,
            backgroundColor: APP_COLOR.GREEN,
            opacity: 0.9,
            shadow: true,
            animation: true,
            hideOnPress: true,
            textStyle: { fontSize: 16 },
        });
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Formik
                validationSchema={ForgotPasswordSchema}
                initialValues={{
                    code: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={values => handleForgotPassword(values.code, values.password)}
            >
                {({ handleChange, handleBlur, handleSubmit, values,
                    errors, touched }) => (
                    <View style={styles.container}>
                        <View>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 600,
                                marginVertical: 30
                            }}>Change Password</Text>
                        </View>

                        <ShareInput
                            title="Authentication Code"
                            onChangeText={handleChange('code')}
                            onBlur={handleBlur('code')}
                            value={values.code}
                            error={errors.code}
                            touched={touched.code}
                        />

                        <ShareInput
                            title="New Password"
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            error={errors.password}
                            touched={touched.password}
                        />

                        <ShareInput
                            title="New Password Confirmation"
                            secureTextEntry={true}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                        />

                        <View style={{ marginVertical: 10 }}>

                        </View>
                        <ShareButton
                            loading={loading}
                            title="Reset Password"
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

                        <View
                            style={{ flexDirection: "row", marginVertical: 10, gap: 10, justifyContent: "center" }}
                        >
                            <Text>I don’t recevie a code!</Text>
                            <Text
                                onPress={handleResendCode}
                                style={{ color: APP_COLOR.ORANGE, textDecorationLine: "underline" }}
                            >Please resend
                            </Text>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default ForgotPasswordPage;