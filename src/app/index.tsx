import { StyleSheet, Text, View } from "react-native";
import ShareButton from "../components/button/share.button";
import { APP_COLOR } from "../utils/constant";
import { green } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import AntDesign from '@expo/vector-icons/AntDesign';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "red",
        borderWidth: 5
    },
    welcomeText: {
        flex: 0.6,
        borderColor: "green",
        borderWidth: 5,
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: 20
    },
    welcomeBtn: {
        flex: 0.4,
        borderColor: "grey",
        borderWidth: 5
    },
    heading: {
        fontSize: 40,
        fontWeight: "600"
    },
    body: {
        fontSize: 30,
        color: APP_COLOR.ORANGE,
        marginVertical: 10
    },
    footer: {

    },
    btnContainer: {

    },
    btnContent: {
        backgroundColor: "green",
        padding: 20,
        borderRadius: 10,
        alignSelf: "flex-start"
    },
    btnText: {
        textTransform: "uppercase"
    }
})
const WelcomePage = () => {
    return (
        <View style={styles.container}>
            <View style={styles.welcomeText}>
                <Text style={styles.heading}>
                    Welcome to
                </Text>
                <Text style={styles.body}>
                    @Thanh Tùng - GoFood
                </Text>
                <Text style={styles.footer}>
                    Fast, fresh, and flavorful, delivered straight to your door!
                </Text>
            </View>
            <View style={styles.welcomeBtn}>
                <Text>
                    Sign in with
                </Text>
                <View>
                    <ShareButton
                        title="facebook"
                        onPress={() => { alert("me") }}
                        textStyle={{ textTransform: "uppercase" }}
                        pressStyle={{ alignSelf: "stretch" }}
                        btnStyle={{
                            justifyContent: "center",
                            borderRadius: 50
                        }}
                        icons={
                            <AntDesign
                                name="pluscircle"
                                size={30}
                                color="black"
                            />
                        }
                    />
                    {/* <View style={styles.btnContainer}>
                        <View style={styles.btnContent}>
                            <Text style={styles.btnText}>Facebook</Text>
                        </View>
                    </View> */}
                    <View><Text>Google</Text></View>
                </View>
                <View><Text>Start with your email</Text></View>
                <View><Text>Already have an account? Sign in</Text></View>
            </View>
        </View>
    )
}

export default WelcomePage;