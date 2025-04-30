import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getURLBaseBackend, placeOrderAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Toast from "react-native-root-toast";
import { router } from "expo-router";
import { PaystackProvider } from 'react-native-paystack-webview';

interface IOrderItem {
    image: string;
    title: string;
    option: string;
    price: number;
    quantity: number;
    description?: string;
}

const PlaceOrderPage = () => {
    const { restaurant, cart, setCart } = useCurrentApp();
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    useEffect(() => {
        if (cart && restaurant && restaurant._id) {
            const result = [];
            for (const [menuItemId, currentItems] of Object.entries(cart[restaurant._id].items)) {
                if (currentItems.extra) {
                    for (const [key, value] of Object.entries(currentItems.extra)) {
                        const option = currentItems.data.options?.find(
                            item => `${item.title}-${item.description}` === key
                        );
                        const addPrice = option?.additionalPrice ?? 0;
                        result.push({
                            image: currentItems.data.image,
                            title: currentItems.data.title,
                            option: key,
                            price: currentItems.data.basePrice + addPrice,
                            quantity: value,
                            description: currentItems.data.description
                        });
                    }
                } else {
                    result.push({
                        image: currentItems.data.image,
                        title: currentItems.data.title,
                        option: "",
                        price: currentItems.data.basePrice,
                        quantity: currentItems.quantity,
                        description: currentItems.data.description
                    });
                }
            }
            setOrderItems(result);
        }
    }, [restaurant]);

    const handlePlaceOrder = async () => {
        const data = {
            restaurant: restaurant?._id,
            totalPrice: cart?.[restaurant!._id].sum,
            totalQuantity: cart?.[restaurant!._id].quantity,
            detail: orderItems
        }

        const res = await placeOrderAPI(data);
        if (res.data) {
            //success
            Toast.show("Đặt hàng thành công", {
                duration: Toast.durations.LONG,
                backgroundColor: APP_COLOR.GREEN,
                opacity: 0.9,
                shadow: true,
                animation: true,
                hideOnPress: true,
                textStyle: { fontSize: 16 },
            });
            //clear cart
            if (restaurant) {
                delete cart[restaurant._id];
                setCart((prevCart: any) => ({ ...prevCart, ...cart }));
            }

            router.navigate("/");
        } else {
            //error
            const m = Array.isArray(res.message) ? res.message[0] : res.message;

            Toast.show(m, {
                duration: Toast.durations.LONG,
                backgroundColor: APP_COLOR.ORANGE,
                opacity: 0.9,
                shadow: true,
                animation: true,
                hideOnPress: true,
                textStyle: { fontSize: 16 },
            });
        }
    }

    return (
        <PaystackProvider publicKey="pk_test_5a4f3ea7d7d946aecb00de0d834a11284457d0ea">
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
                {/* Header */}
                <View style={{
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    padding: 10
                }}>
                    <HeaderHome />
                </View>

                {/* Restaurant name */}
                <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                    <Text style={{ fontWeight: "700", fontSize: 16 }}>{restaurant?.name}</Text>
                </View>
                {/* Content */}
                <View style={{ flex: 1 }}>
                    <ScrollView style={{ padding: 15 }}>
                        {orderItems.map((item, index) => (
                            <View key={index} style={{
                                flexDirection: "row",
                                backgroundColor: "#FAFAFA",
                                borderRadius: 8,
                                padding: 10,
                                marginBottom: 12,
                                shadowColor: "#000",
                                shadowOpacity: 0.05,
                                shadowOffset: { width: 0, height: 1 },
                                shadowRadius: 4,
                                elevation: 1,
                                alignItems: "center"
                            }}>
                                <Image
                                    source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item.image}` }}
                                    style={{ width: 60, height: 60, borderRadius: 6 }}
                                />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={{ fontWeight: "600", fontSize: 15 }}>{item.title}</Text>
                                    {item.description && (
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                gap: 5,
                                                marginVertical: 5,
                                            }}
                                        >
                                            <MaterialCommunityIcons
                                                name="file-document-edit-outline"
                                                size={22}
                                                color="black"
                                            />
                                            <Text style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                                                {item.description}
                                            </Text>
                                        </View>
                                    )}
                                    {item.option !== "" &&
                                        <Text style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{item.option}</Text>
                                    }
                                    <View style={{ marginTop: 6, flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text style={{ fontWeight: "600", fontSize: 13, color: APP_COLOR.ORANGE }}>
                                            {currencyFormatter(item.price)}
                                        </Text>
                                        <Text style={{ fontSize: 13 }}>Số lượng: {item.quantity}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {/* Footer - Tổng cộng + thanh toán */}
                    {orderItems.length > 0 && (
                        <View style={{
                            borderTopWidth: 1,
                            borderTopColor: "#eee",
                            backgroundColor: "#fff"
                        }}>
                            {/* Tổng cộng */}
                            <View style={{
                                paddingHorizontal: 15,
                                paddingTop: 15,
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <Text style={{ color: "#999", fontSize: 14 }}>
                                    Tổng cộng ({restaurant
                                        && cart?.[restaurant!._id]
                                        && cart?.[restaurant!._id].quantity} món)
                                </Text>
                                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                                    {currencyFormatter(restaurant
                                        && cart?.[restaurant!._id]
                                        && cart?.[restaurant!._id].sum)}
                                </Text>
                            </View>

                            {/* Thanh toán */}
                            <View style={{ padding: 15 }}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginBottom: 10
                                }}>
                                    <Pressable
                                        onPress={() => setSelectedPayment("pay stack")}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: selectedPayment === "pay stack" ? APP_COLOR.ORANGE : APP_COLOR.GREY,
                                            backgroundColor: selectedPayment === "pay stack" ? APP_COLOR.ORANGE : "#fff",
                                            flex: 1,
                                            paddingVertical: 10,
                                            borderRadius: 5,
                                            marginRight: 8
                                        }}>
                                        <Text style={{
                                            color: selectedPayment === "pay stack" ? "#fff" : APP_COLOR.GREY,
                                            textAlign: "center",
                                            fontWeight: "500"
                                        }}>Pay Stack</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setSelectedPayment("cash")}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: selectedPayment === "cash" ? APP_COLOR.ORANGE : APP_COLOR.GREY,
                                            backgroundColor: selectedPayment === "cash" ? APP_COLOR.ORANGE : "#fff",
                                            flex: 1,
                                            paddingVertical: 10,
                                            borderRadius: 5
                                        }}>
                                        <Text style={{
                                            color: selectedPayment === "cash" ? "#fff" : APP_COLOR.GREY,
                                            textAlign: "center",
                                            fontWeight: "500"
                                        }}>Tiền mặt</Text>
                                    </Pressable>
                                </View>

                                <Pressable
                                    onPress={handlePlaceOrder}
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.7 : 1,
                                        backgroundColor: APP_COLOR.ORANGE,
                                        paddingVertical: 12,
                                        borderRadius: 6
                                    })}
                                >
                                    <Text style={{
                                        color: "#fff",
                                        fontWeight: "600",
                                        fontSize: 15,
                                        textAlign: "center"
                                    }}>
                                        Place Order - {currencyFormatter(
                                            cart &&
                                            restaurant
                                            &&
                                            cart?.[restaurant!._id]
                                            && cart?.[restaurant!._id].sum)}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </PaystackProvider>

    );
};

export default PlaceOrderPage;
