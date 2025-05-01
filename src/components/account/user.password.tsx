import React, { useRef } from "react";
import ShareInput from "@/components/input/share.input";
import { updateUserPasswordAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserPasswordSchema } from "@/utils/validate.schema";
import { Formik, FormikProps } from "formik";
import { Platform, Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, Pressable } from "react-native";
import Toast from "react-native-root-toast";

const UserPassword = () => {
    const formikRef = useRef<FormikProps<any>>(null);

    const handleUpdatePassword = async (currentPassword: string, newPassword: string) => {
        const res = await updateUserPasswordAPI(currentPassword, newPassword);
        if (res.data) {
            Toast.show("Cập nhật mật khẩu thành công!", {
                duration: Toast.durations.LONG,
                backgroundColor: APP_COLOR.GREEN,
                opacity: 0.9,
                shadow: true,
                animation: true,
                hideOnPress: true,
                textStyle: { fontSize: 16 },
            });

            formikRef.current?.resetForm(); // Reset the form after successful submission
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
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Formik
                        innerRef={formikRef}
                        validationSchema={UpdateUserPasswordSchema}
                        enableReinitialize // Allow Formik to reinitialize when initialValues change
                        initialValues={
                            {
                                currentPassword: "",
                                newPassword: "",
                                confirmNewPassword: "",
                            }
                        }
                        onSubmit={(values) =>
                            handleUpdatePassword(values?.currentPassword ?? "", values.newPassword ?? "")
                        }
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            touched,
                            isValid,
                            dirty,
                        }) => (
                            <View style={{ marginTop: 20, gap: 20, width: "100%" }}>
                                <ShareInput
                                    title="Current Password"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('currentPassword')}
                                    onBlur={handleBlur('currentPassword')}
                                    value={values.currentPassword}
                                    error={errors.currentPassword}
                                    touched={touched.currentPassword}
                                />

                                <ShareInput
                                    title="New Password"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    error={errors.newPassword}
                                    touched={touched.newPassword}
                                />

                                <ShareInput
                                    title="Confirm New Password"
                                    secureTextEntry={true}
                                    onChangeText={handleChange('confirmNewPassword')}
                                    onBlur={handleBlur('confirmNewPassword')}
                                    value={values.confirmNewPassword}
                                    error={errors.confirmNewPassword}
                                    touched={touched.confirmNewPassword}
                                />

                                <Pressable
                                    disabled={!(isValid && dirty)}
                                    onPress={handleSubmit as any}
                                    style={({ pressed }) => ({
                                        opacity: pressed === true ? 0.5 : 1,
                                        backgroundColor:
                                            isValid && dirty
                                                ? APP_COLOR.ORANGE
                                                : APP_COLOR.GREY,
                                        padding: 10,
                                        marginTop: 10,
                                        borderRadius: 3,
                                    })}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: isValid && dirty ? "white" : "grey",
                                        }}
                                    >
                                        Save changes
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
        gap: 20,
    },
});

export default UserPassword;