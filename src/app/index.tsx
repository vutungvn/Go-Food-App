import { Text, View } from "react-native"
import { Link } from 'expo-router';

const AppRoot = () => {
    return (
        <View>
            <Text> 1 Hello world with expo router thanhtung</Text>
            <Link href={"/hoidanit"}>Go to hoidanit</Link>
            <Link href={"/like"}>Go to like</Link>
        </View>
    )
}

export default AppRoot;