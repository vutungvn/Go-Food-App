import { Image, StyleSheet, View } from "react-native";
import TextBetweenLine from "./text.between.line";
import ShareButton from "./share.button";
import fbLogo from '@/assets/auth/facebook.png';
import ggLogo from '@/assets/auth/google.png';

const styles = StyleSheet.create({
    welcomeBtn: {
        flex: 1,
        gap: 30
    }
})

const SocialButton = () => {
    return (
        <View style={styles.welcomeBtn}>
            <TextBetweenLine title="Sign in with" />
            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 30
            }}>
                <ShareButton
                    title="facebook"
                    onPress={() => { alert("me") }}
                    textStyle={{ textTransform: "uppercase" }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        backgroundColor: "#fff"
                    }}
                    icons={
                        <Image source={fbLogo} />
                    }
                />

                <ShareButton
                    title="google"
                    onPress={() => { alert("me") }}
                    textStyle={{ textTransform: "uppercase" }}
                    btnStyle={{
                        justifyContent: "center",
                        borderRadius: 30,
                        paddingHorizontal: 20,
                        backgroundColor: "#fff"
                    }}
                    icons={
                        <Image source={ggLogo} />
                    }
                />
            </View>
        </View>
    )
}

export default SocialButton;