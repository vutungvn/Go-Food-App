import { StyleSheet, Text, View } from "react-native";

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
        color: "orange",
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
                    <View style={styles.btnContainer}>
                        <View style={styles.btnContent}>
                            <Text style={styles.btnText}>Facebook</Text>
                        </View>
                    </View>
                    <View><Text>Google</Text></View>
                </View>
                <View><Text>Start with your email</Text></View>
                <View><Text>Already have an account? Sign in</Text></View>
            </View>
        </View>
    )
}

export default WelcomePage;