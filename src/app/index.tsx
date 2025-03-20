import { Link } from "expo-router";
import { Text, View } from "react-native"

const HomePage = () => {



    return (
        <View>
            <Text>Welcome to Homepage</Text>
            <Link href={"/product"}>Go to product</Link>
            <Link href={"/login"}>Go to login</Link>
        </View>
    )
}

export default HomePage;