import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    Pressable,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { getFavoriteRestaurantAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";

const FavoritePage = () => {
    const [favoriteRestaurants, setFavoriteRestaurants] = useState<IRestaurant[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        const res = await getFavoriteRestaurantAPI();
        if (res.data) {
            setFavoriteRestaurants(res.data);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchRestaurants();
        setRefreshing(false);
    };

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có dữ liệu.</Text>
        </View>
    );

    const renderItem = (item: IRestaurant, index: number) => (
        <View key={index} style={styles.cardContainer}>
            <Pressable
                onPress={() =>
                    router.navigate({
                        pathname: "/product/[id]",
                        params: { id: item._id },
                    })
                }
                style={styles.restaurantCard}
            >
                <Image
                    source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}
                    style={styles.restaurantImage}
                />

                <View style={styles.restaurantInfo}>
                    <Text style={styles.restaurantName}>{item.name}</Text>
                    <Text style={styles.restaurantDetail}>{item.phone}</Text>
                    <Text style={styles.restaurantDetail}>{item.address}</Text>
                </View>
            </Pressable>
            <View style={styles.separator} />
        </View>
    );

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
                {favoriteRestaurants.length > 0
                    ? favoriteRestaurants.map(renderItem)
                    : renderEmpty()}
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
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
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
        alignItems: "center",
        padding: 16,
        backgroundColor: "#fff",
    },
    restaurantImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 12,
    },
    restaurantInfo: {
        flex: 1,
    },
    restaurantName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    restaurantDetail: {
        fontSize: 14,
        color: "#666",
        marginBottom: 2,
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
