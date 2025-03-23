import LoadingOverlay from "@/components/loading/overlay";
import { resendCodeAPI, verifyCodeAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import OTPTextView from 'react-native-otp-textinput';
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    heading: {
        fontSize: 36,
        fontWeight: "600",
        marginVertical: 20
    },
    text: {
        fontSize: 14,
        fontWeight: "400",
        marginVertical: 10,
        color: "#9796A1",
    }
})
const VerifyPage = () => {
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const otpRef = useRef<OTPTextView>(null);
    const [code, setCode] = useState<string>("");

    const { email } = useLocalSearchParams();

    const verifyCode = async () => {
        //call api
        Keyboard.dismiss();
        setIsSubmit(true);
        const res = await verifyCodeAPI(email as string, code);
        setIsSubmit(false);
        if (res.data) {
            //success     
            // clear input
            otpRef?.current?.clear();
            Toast.show("Xác minh tài khoản thành công", {
                duration: Toast.durations.LONG,
                backgroundColor: APP_COLOR.GREEN,
                opacity: 0.9,
                shadow: true,
                animation: true,
                hideOnPress: true,
                textStyle: { fontSize: 16 },
            });
            router.replace("/(auth)/login")
        } else {
            // error
            Toast.show(res.message as string, {
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

    useEffect(() => {
        if (code && code.length === 6) {
            verifyCode()
        }
    }, [code])

    const handleResendCode = async () => {
        otpRef?.current?.clear();
        //call api
        const res = await resendCodeAPI(email as string);
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
        <>
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Verification Code
                </Text>
                <Text style={styles.text}>
                    Please type the verification code sent to your gmail
                </Text>
                <View style={{ marginVertical: 20 }}>
                    <OTPTextView
                        ref={otpRef}
                        handleTextChange={setCode}
                        autoFocus
                        inputCount={6}
                        inputCellLength={1}
                        tintColor={APP_COLOR.ORANGE}
                        textInputStyle={{
                            borderWidth: 1,
                            borderColor: APP_COLOR.GREY,
                            borderBottomWidth: 1,
                            borderRadius: 5,
                            // @ts-ignore:next-line
                            color: APP_COLOR.ORANGE
                        }}
                    />
                </View>

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
            {isSubmit && <LoadingOverlay />}
        </>
    )
}

export default VerifyPage;