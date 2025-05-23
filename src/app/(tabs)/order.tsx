import { currencyFormatter, getOrderHistoryAPI, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState, useCallback } from "react";
import { Image, Text, View, RefreshControl } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderPage = () => {
    const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchOrderHistory = async () => {
        const res = await getOrderHistoryAPI();
        if (res.data) setOrderHistory(res.data);
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchOrderHistory();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchOrderHistory();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                        paddingHorizontal: 16,
                        paddingVertical: 12,
                        backgroundColor: "#fff",
                    }}
                >
                    <Text style={{ color: APP_COLOR.ORANGE, fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
                        Order History
                    </Text>
                </View>

                <ScrollView
                    style={{ flex: 1, padding: 16 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {orderHistory.map((item, index) => (
                        <View
                            key={index}
                            style={{
                                backgroundColor: "#fff",
                                borderRadius: 12,
                                marginBottom: 16,
                                overflow: "hidden",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 2,
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{
                                        uri: `${getURLBaseBackend()}/images/restaurant/${item.restaurant?.image}`,
                                    }}
                                    style={{
                                        height: 100,
                                        width: 100,
                                        borderTopLeftRadius: 12,
                                        borderBottomLeftRadius: 12,
                                    }}
                                />
                                <View style={{ flex: 1, padding: 10, justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                                        {item.restaurant.name}
                                    </Text>
                                    <Text style={{ color: "#555" }}>{item.restaurant.address}</Text>
                                    <Text style={{ color: "#333" }}>
                                        {currencyFormatter(item.totalPrice)} ({item.totalQuantity} món)
                                    </Text>
                                    <Text style={{ color: APP_COLOR.ORANGE, fontWeight: "600" }}>
                                        Trạng thái: {item.status}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default OrderPage;
