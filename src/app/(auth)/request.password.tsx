import ShareButton from "@/components/button/share.button"
import ShareInput from "@/components/input/share.input"
import { requestPasswordAPI } from "@/utils/api"
import { APP_COLOR } from "@/utils/constant"
import { RequestPasswordSchema } from "@/utils/validate.schema"
import { router } from "expo-router"
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

const RequestPasswordPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleRequestPassword = async (email: string) => {
        try {
            setLoading(true);
            const res = await requestPasswordAPI(email);
            setLoading(false);
            if (res.data) {
                router.replace({
                    pathname: "/(auth)/forgot.password",
                    params: { email }
                });
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Formik
                validationSchema={RequestPasswordSchema}
                initialValues={{ email: '' }}
                onSubmit={values => handleRequestPassword(values.email)}
            >
                {({ handleChange, handleBlur, handleSubmit, values,
                    errors, touched }) => (
                    <View style={styles.container}>
                        <View>
                            <Text style={{
                                fontSize: 25,
                                fontWeight: 600,
                                marginTop: 30,
                            }}>Forgot Password</Text>
                        </View>
                        <Text style={{ color: "grey" }}>
                            Please fill in your login account email to make a password change request.
                        </Text>

                        <ShareInput
                            title="Email"
                            keyboardType="email-address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                        />


                        <View style={{ marginVertical: 10 }}>

                        </View>
                        <ShareButton
                            loading={loading}
                            title="Confirm"
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

                    </View>
                )}
            </Formik>
        </SafeAreaView>
    )
}

export default RequestPasswordPage;