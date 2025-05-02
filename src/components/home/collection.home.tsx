import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from "react-native"
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopRestaurant } from "@/utils/api";
import { router } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import ContentLoader, { Rect } from "react-content-loader/native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { height: sHeight, width: sWidth } = Dimensions.get('window');

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

    const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await getTopRestaurant(refAPI);

            if (res.data) {
                //success
                setRestaurants(res.data);
            } else {
                //error
            }
            setLoading(false)
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
            {loading === false ?
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{name}</Text>
                        <Pressable
                            onPress={() => router.navigate("/(auth)/show.restaurant")}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}
                        >
                            <Text style={styles.seeAll}>See All</Text>
                            <MaterialIcons
                                style={{ marginTop: 3 }}
                                name="navigate-next" size={20} color="grey"
                            />
                        </Pressable>
                    </View>
                    <Text style={styles.description}>{description}</Text>
                    <FlatList
                        data={restaurants}
                        horizontal
                        contentContainerStyle={{ paddingHorizontal: 5 }}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <Pressable
                                    onPress={() => router.navigate({
                                        pathname: "/product/[id]",
                                        params: { id: item._id }
                                    })}>
                                    <View style={styles.itemContainer}>
                                        <Image style={styles.itemImage}
                                            source={{ uri: `${baseImage}/${item.image}` }}
                                        />
                                        <View style={styles.itemContent}>
                                            <View style={{
                                                flexDirection: "row",
                                                gap: 5,
                                            }}>
                                                <Ionicons
                                                    name="shield-checkmark"
                                                    size={18}
                                                    color="orange"
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
                                </Pressable>
                            );
                        }}
                    />
                </View>
                :
                <ContentLoader
                    speed={2}
                    width={sWidth}
                    height={230}
                    // viewBox="0 0 700 150"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    style={{ width: '100%' }}
                >
                    <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
                    <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
                    <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
                </ContentLoader>

            }
        </>
    );
}

export default CollectionHome;
