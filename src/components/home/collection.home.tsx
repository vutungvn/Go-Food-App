import { FlatList, Image, Platform, StyleSheet, Text, View } from "react-native"
import demo from "@/assets/demo.jpg"
import { APP_COLOR } from "@/utils/constant";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import { getTopRestaurant } from "@/utils/api";

interface IProps {
    name: string;
    description: string;
    refAPI: string;
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: "#fff"
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    title: {
        color: APP_COLOR.ORANGE,
        fontWeight: "700",
        fontSize: 18,
    },
    seeAll: {
        color: "#5a5a5a",
        fontSize: 14,
    },
    description: {
        color: "#5a5a5a",
        fontSize: 14,
        marginBottom: 10,
    },
    sale: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: APP_COLOR.ORANGE,
        borderRadius: 6,
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: "flex-start",
    },
    saleText: {
        color: APP_COLOR.ORANGE,
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
    },
    itemContainer: {
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        overflow: "hidden",
        marginRight: 10,
        width: 140,
    },
    itemImage: {
        width: "100%",
        height: 130,
    },
    itemContent: {
        padding: 10,
        alignItems: "flex-start",
    },
    itemName: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
        maxWidth: 130,
    },
});

const CollectionHome = (props: IProps) => {
    const { name, description, refAPI } = props;
    const data = [
        { key: 1, image: demo, name: 'Cửa hàng 1' },
        { key: 2, image: demo, name: 'Cửa hàng 2' },
        { key: 3, image: demo, name: 'Cửa hàng 3' },
        { key: 4, image: demo, name: 'Cửa hàng 4' },
        { key: 5, image: demo, name: 'Cửa hàng 5' },
    ];
    const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await getTopRestaurant(refAPI);

            if (res.data) {
                //success
                setRestaurants(res.data);
            } else {
                //error
            }
        }
        fetchData()
    }, [refAPI]);

    const backend = Platform.OS === "android"
        ? process.env.EXPO_PUBLIC_ANDROID_API_URL
        : process.env.EXPO_PUBLIC_IOS_API_URL;

    const baseImage = `${backend}/images/restaurant`;

    return (
        <>
            <View style={{ backgroundColor: "#e9e9e9", height: 10 }}></View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.seeAll}>See All &gt;</Text>
                </View>
                <Text style={styles.description}>{description}</Text>
                <FlatList
                    data={restaurants}
                    horizontal
                    contentContainerStyle={{ paddingHorizontal: 5 }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.itemContainer}>
                                <Image style={styles.itemImage}
                                    source={{ uri: `${baseImage}/${item.image}` }}
                                />
                                <View style={styles.itemContent}>
                                    <View style={{
                                        flexDirection: "row",
                                        gap: 5,
                                    }}>
                                        <AntDesign
                                            name="checkcircle"
                                            size={18}
                                            color={APP_COLOR.ORANGE}
                                        />
                                        <Text
                                            numberOfLines={1}
                                            ellipsizeMode='tail'
                                            style={styles.itemName}>{item.name}</Text>
                                    </View>
                                    <View style={styles.sale}>
                                        <Text style={styles.saleText}>Flash Sale</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </>
    );
}

export default CollectionHome;
