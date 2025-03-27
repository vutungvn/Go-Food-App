import { useCurrentTheme } from "@/context/app.context";
import { Text, View } from "react-native"

const AccountPage = () => {
    const { theme } = useCurrentTheme();
    return (
        <View>
            <Text>account page, theme = {theme}</Text>
        </View>
    )
}

export default AccountPage;