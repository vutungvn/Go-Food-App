import {
    getFavoriteRestaurantAPI,
    getURLBaseBackend,
} from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritePage = () => {
    const [favoriteRestaurant, setFavoriteRestaurant] = useState<IRestaurant[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    const fetchRestaurants = async () => {
        const res = await getFavoriteRestaurantAPI();
        if (res.data) setFavoriteRestaurant(res.data);
    };
    useEffect(() => {
        fetchRestaurants();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchRestaurants();
        setRefreshing(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Liked Restaurants</Text>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {favoriteRestaurant.length > 0 ? (
                    favoriteRestaurant.map((item, index) => (
                        <View key={index} style={styles.cardContainer}>
                            <View style={styles.restaurantCard}>
                                <Image
                                    source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}
                                    style={styles.restaurantImage}
                                />
                                <Pressable
                                    onPress={() =>
                                        router.navigate({
                                            pathname: "/product/[id]",
                                            params: { id: item._id },
                                        })
                                    }
                                    style={styles.restaurantInfo}
                                >
                                    <Text style={styles.restaurantName}>{item.name}</Text>
                                    <Text style={styles.restaurantDetail}>{item.phone}</Text>
                                    <Text style={styles.restaurantDetail}>{item.address}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.separator} />
                        </View>
                    ))
                ) : (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Không có dữ liệu.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerContainer: {
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        paddingHorizontal: 16,
        paddingBottom: 10,
        paddingTop: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "600",
        color: APP_COLOR.ORANGE,
        textAlign: "center",
    },
    scrollView: {
        paddingBottom: 20,
    },
    cardContainer: {
        backgroundColor: "#fff",
    },
    restaurantCard: {
        flexDirection: "row",
        padding: 16,
        gap: 12,
        alignItems: "center",
    },
    restaurantImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    restaurantInfo: {
        flex: 1,
        gap: 6,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    restaurantDetail: {
        fontSize: 14,
        color: "#666",
    },
    separator: {
        height: 10,
        backgroundColor: "#f0f0f0",
    },
    emptyContainer: {
        padding: 20,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#888",
    },
});

export default FavoritePage;
