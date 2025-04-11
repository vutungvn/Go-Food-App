import { Link, router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

const CreateModalPage = () => {
    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000040',
            }}
        >
            {/* Dismiss modal when pressing outside */}
            <Pressable
                onPress={() => router.back()}
                style={StyleSheet.absoluteFill}
            />

            <Animated.View
                entering={SlideInDown}
                style={{
                    width: '100%',
                    height: '80%',
                    backgroundColor: 'white',
                }}
            >
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Modal Screen</Text>
                <Link href="/">
                    <Text>← Go back</Text>
                </Link>
            </Animated.View>
        </Animated.View>

    )
}

export default CreateModalPage;