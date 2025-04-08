import { StyleSheet, Text, View } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        gap: 5,
    },
    location: {
        flexDirection: "row",
        alignItems: "flex-end"
    }
})
const HeaderHome = () => {
    return (
        <View style={styles.container}>
            <Text style={{ paddingLeft: 7 }}>Giao đến: </Text>
            <View style={styles.location}>
                <Entypo
                    name="location-pin"
                    size={24}
                    color={APP_COLOR.ORANGE}
                />
                <Text>Khu 918, Phúc Đồng, Long Biên, Hà Nội</Text>
            </View>
        </View>
    )
}

export default HeaderHome;