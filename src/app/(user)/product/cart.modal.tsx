import { useCurrentApp } from "@/context/app.context";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import StickyFooter from "@/components/example/restaurant/order/sticky.footer";
import AddNoteModal from "@/app/product/addnote.modal";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CreateModalPage = () => {

    const { restaurant, cart, setCart } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();

    const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);

    const [quantity, setQuantity] = useState<number>(1);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const selectedOption = menuItem?.options?.[selectedIndex] ?? { additionalPrice: 0 };
    const basePrice = menuItem?.basePrice ?? 0;
    const totalPrice = (basePrice + selectedOption.additionalPrice) * quantity;

    const [currentItemKey, setCurrentItemKey] = useState<string | null>(null);
    const [note, setNote] = useState<string>("");
    const [noteModalVisible, setNoteModalVisible] = useState(false);

    const handleClearAll = () => {
        if (!restaurant || !cart[restaurant._id]) return;

        // Xóa toàn bộ sản phẩm trong giỏ hàng của nhà hàng hiện tại
        setCart((prev: any) => {
            const updatedCart = { ...prev };
            delete updatedCart[restaurant._id]; // Xóa giỏ hàng của nhà hàng hiện tại
            return updatedCart;
        });
        router.back(); // Quay lại trang trước
    };

    const handleAddNote = (itemKey: string) => {
        setCurrentItemKey(itemKey);
        if (restaurant) {
            setNote(cart[restaurant._id].items[itemKey]?.data.description || "");
        }

        setNoteModalVisible(true);
    }

    const handleSubmitNote = () => {
        if (!restaurant || !currentItemKey) return;

        // Cập nhật ghi chú cho sản phẩm
        setCart((prev: any) => {
            const updatedCart = { ...prev };
            updatedCart[restaurant._id].items[currentItemKey].data.description = note; // Cập nhật mô tả
            return updatedCart;
        });

        setNoteModalVisible(false); // Đóng popup
    };

    useEffect(() => {
        if (restaurant && menuItemId) {
            for (let i = 0; i < restaurant.menu.length; i++) {
                const menu = restaurant.menu[i];

                let check = false;
                for (let j = 0; j < menu.menuItem.length; j++) {
                    if (menu.menuItem[j]._id === menuItemId) {
                        check = true;
                        setMenuItem(menu.menuItem[j]);
                        break;
                    }
                }
                if (check) break;
            }
        }
    }, [restaurant, menuItemId])

    const handleCartItemChange = (itemId: string, action: "MINUS" | "PLUS") => {
        if (!restaurant || !cart[restaurant._id]) return;

        const restaurantCart = cart[restaurant._id];
        const item = restaurantCart.items[itemId];
        if (!item) return;

        let newQuantity = item.quantity + (action === "PLUS" ? 1 : -1);
        if (newQuantity <= 0) {
            delete restaurantCart.items[itemId];
        } else {
            item.quantity = newQuantity;

            // Cập nhật lại tổng số lượng & giá trị
            restaurantCart.items[itemId] = {
                ...item,
                quantity: newQuantity,
            };
        }

        restaurantCart.sum = 0;
        restaurantCart.quantity = 0;
        Object.values(restaurantCart.items).forEach((item) => {
            const base = item.data.basePrice;
            let totalExtra = 0;
            for (const key in item.extra) {
                const selectedOption = item.data.options.find(opt =>
                    `${opt.title}-${opt.description}` === key
                );
                if (selectedOption) {
                    totalExtra += item.extra[key] * selectedOption.additionalPrice;
                }
            }

            restaurantCart.sum += item.quantity * base + totalExtra;
            restaurantCart.quantity += item.quantity;
        });

        setCart((prev: any) => ({ ...prev, [restaurant._id]: restaurantCart }));
    };

    const confirmClearAll = () => {
        // Hiển thị popup xác nhận
        Alert.alert(
            "Delete All Items", // Tiêu đề của popup
            "Do you want to delete all items in the cart?", // Nội dung của popup
            [
                {
                    text: "Cancel", // Nút hủy
                    style: "cancel", // Kiểu nút hủy
                },
                {
                    text: "Delete All", // Nút xóa
                    onPress: handleClearAll, // Gọi hàm xóa khi nhấn "Delete All"
                },
            ],
            { cancelable: true } // Cho phép hủy popup khi nhấn ra ngoài
        );
    };

    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000040',
            }}
        >
            {/* Dismiss modal when pressing outside */}
            <Pressable
                onPress={() => router.back()}
                style={StyleSheet.absoluteFill}
            />

            <Animated.View
                entering={SlideInDown}
                style={{
                    width: '100%',
                    height: '80%',
                    backgroundColor: 'white',
                }}
            >
                <View
                    style={{
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                        flexDirection: "row",
                        gap: 10,
                        padding: 10,
                        alignItems: "center"
                    }}
                >
                    <Text
                        onPress={confirmClearAll}
                        style={{
                            color: APP_COLOR.ORANGE,
                            fontSize: 16,
                            fontWeight: "600"

                        }}>Clear All</Text>
                    <View style={{ flex: 1 }}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: '600',
                                fontSize: 16,
                            }}
                        >My Basket</Text>
                    </View>
                    <AntDesign
                        onPress={() => router.back()}
                        name="close" size={22} color="grey"
                    />
                </View>

                <ScrollView
                    style={{
                        flex: 1,
                        borderBottomColor: "#eee",
                        borderBottomWidth: 1,
                    }}
                    contentContainerStyle={{
                        paddingBottom: 80,
                    }}
                >
                    {restaurant && cart[restaurant._id] && Object.entries(cart[restaurant._id].items).map(([key, value]) => (
                        <View
                            key={key}
                            style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            {/* Hình ảnh sản phẩm */}
                            <Image
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 5, // Bo góc hình ảnh
                                }}
                                source={{ uri: `${getURLBaseBackend()}/images/menu-item/${value.data.image}` }}
                            />

                            {/* Thông tin sản phẩm và nút tăng/giảm số lượng */}
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <Text style={{ fontWeight: '600', fontSize: 16 }}>{value.data.title}</Text>
                                <TouchableOpacity
                                    onPress={() => handleAddNote(key)}
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
                                    <Text
                                        style={{ fontSize: 12, color: 'gray', marginVertical: 5 }}
                                    >
                                        {value.data.description || "Add note..."} {/* Mô tả sản phẩm */}
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ fontSize: 16, color: APP_COLOR.ORANGE, fontWeight: '400' }}>
                                        {currencyFormatter(value.data.basePrice)} {/* Giá sản phẩm */}
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Pressable
                                            style={({ pressed }) => ({
                                                opacity: pressed ? 0.5 : 1,
                                                alignSelf: "flex-start"
                                            })}
                                            onPress={() => handleCartItemChange(key, "MINUS")}
                                        >
                                            <AntDesign name="minussquareo"
                                                size={26} color={APP_COLOR.ORANGE}
                                            />
                                        </Pressable>
                                        <Text style={{ marginHorizontal: 10, fontSize: 16 }}>{value.quantity}</Text>
                                        <Pressable
                                            style={({ pressed }) => ({
                                                opacity: pressed ? 0.5 : 1,
                                                alignSelf: "flex-start"
                                            })}
                                            onPress={() => handleCartItemChange(key, "PLUS")}
                                        >
                                            <AntDesign
                                                name="plussquare"
                                                size={26}
                                                color={APP_COLOR.ORANGE}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                    <View style={{ padding: 10 }}>
                        <Text
                            style={{
                                color: "gray",
                                fontWeight: "500",
                                fontSize: 12,
                            }}>The prices include tax, but do not include shipping fee and other fees.</Text>
                    </View>
                </ScrollView>
                <StickyFooter
                    restaurant={restaurant}
                />
            </Animated.View>
            <AddNoteModal
                visible={noteModalVisible}
                note={note}
                onChangeNote={setNote}
                onClose={() => setNoteModalVisible(false)}
                onSubmit={handleSubmitNote}
            />
        </Animated.View>

    )
}

export default CreateModalPage;