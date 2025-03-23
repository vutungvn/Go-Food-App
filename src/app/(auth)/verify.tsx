import { APP_COLOR } from "@/utils/constant";
import { StyleSheet, Text, View } from "react-native";
import OTPTextView from 'react-native-otp-textinput';

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
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>
                Verification Code
            </Text>
            <Text style={styles.text}>
                Please type the verification code sent to vanadangcap123@gmail.com
            </Text>
            <View style={{ marginVertical: 20 }}>
                <OTPTextView
                    //   containerStyle={styles.textInputContainer}
                    //   textInputStyle={styles.roundedTextInput}
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
                <Text style={{ color: APP_COLOR.ORANGE, textDecorationLine: "underline" }}>Please resend</Text>
            </View>
        </View>
    )
}

export default VerifyPage;