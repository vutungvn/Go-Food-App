import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import BannerHome from "./banner.home";

const data1 = Array(20).fill(1);

const styles = StyleSheet.create({

})
const TopListHome = () => {
    return (
        <View >
            <BannerHome />
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
            >
                <FlatList
                    contentContainerStyle={{ alignSelf: 'flex-start' }}
                    numColumns={Math.ceil(data1.length / 2)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={data1}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ padding: 10, margin: 5, borderWidth: 1, borderColor: "#ccc", width: 50, height: 50, alignSelf: "flex-start" }}>
                                <Text>{index + 1}</Text>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default TopListHome;