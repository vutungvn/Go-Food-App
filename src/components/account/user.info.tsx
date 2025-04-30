import React, { useEffect, useState } from "react";
import ShareInput from "@/components/input/share.input";
import { useCurrentApp } from "@/context/app.context";
import { updateUserAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { UpdateUserSchema } from "@/utils/validate.schema";
import { Formik } from "formik";
import { Image, Platform, Text, View, StyleSheet, KeyboardAvoidingView, ScrollView, Pressable } from "react-native";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserInfo = () => {
    const { appState, setAppState } = useCurrentApp();
    const [initialValues, setInitialValues] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/avatar`;

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
                    setInitialValues({
                        name: parsedUser.name || "",
                        email: parsedUser.email || "",
                        phone: parsedUser.phone || "",
                    });
                }
            } catch (error) {
                console.error("Failed to load user data:", error);
            }
        };

        loadUserData();
    }, []);

    const handleUpdateUser = async (name: string, phone: string) => {
        if (appState?.user._id) {
            try {
                const res = await updateUserAPI(appState?.user._id, name, phone);
                if (res.data) {
                    const updatedUser = {
                        ...appState.user,
                        name: name,
                        phone: phone,
                    };

                    // Save updated user to AsyncStorage
                    await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

                    // Update context state
                    setAppState((prevState: typeof appState) => ({
                        ...prevState,
                        user: updatedUser,
                    }));

                    // Update Formik initial values
                    setInitialValues({
                        name: updatedUser.name,
                        email: updatedUser.email,
                        phone: updatedUser.phone,
                    });

                    Toast.show("Cập nhật thông tin user thành công!", {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.GREEN,
                        opacity: 1,
                    });
                } else {
                    const errorMessage = Array.isArray(res.message)
                        ? res.message[0]
                        : res.message;

                    Toast.show(errorMessage, {
                        duration: Toast.durations.LONG,
                        textColor: "white",
                        backgroundColor: APP_COLOR.ORANGE,
                        opacity: 1,
                    });
                }
            } catch (error) {
                console.error("Failed to update user:", error);
                Toast.show("Đã xảy ra lỗi khi cập nhật thông tin!", {
                    duration: Toast.durations.LONG,
                    textColor: "white",
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 1,
                });
            }
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: `${baseImage}/${appState?.user.avatar}` }}
                        />
                        <Text style={styles.username}>{appState?.user.name}</Text>
                    </View>

                    <Formik
                        validationSchema={UpdateUserSchema}
                        enableReinitialize // Allow Formik to reinitialize when initialValues change
                        initialValues={initialValues}
                        onSubmit={(values) =>
                            handleUpdateUser(values?.name ?? "", values?.phone ?? "")
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
                                    title="Họ tên"
                                    onChangeText={handleChange("name")}
                                    onBlur={handleBlur("name")}
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                />

                                <ShareInput
                                    editable={false}
                                    title="Email"
                                    keyboardType="email-address"
                                    value={values.email}
                                />

                                <ShareInput
                                    title="Số điện thoại"
                                    onChangeText={handleChange("phone")}
                                    onBlur={handleBlur("phone")}
                                    value={values.phone}
                                    error={errors.phone}
                                    touched={touched.phone}
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

export default UserInfo;