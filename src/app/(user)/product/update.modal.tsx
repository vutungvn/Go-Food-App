import { router, useLocalSearchParams } from "expo-router";
import { Button, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_COLOR } from "@/utils/constant";
import { useCurrentApp } from "@/context/app.context";
import { useEffect, useState } from "react";
import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator } from "react-native";

interface IUpdatedItem {
    image: string;
    title: string;
    option: string;
    price: number;
    quantity: number
}
const UpdateModalPage = () => {
    const { restaurant, cart, setCart } = useCurrentApp();
    const { menuItemId } = useLocalSearchParams();
    const [loadingOption, setLoadingOption] = useState<string | null>(null);

    const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
    const [updatedItems, setUpdatedItems] = useState<IUpdatedItem[]>([]);

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
    }, [restaurant, menuItemId]);

    useEffect(() => {
        if (menuItem && restaurant) {
            const currentItems = cart[restaurant._id].items[menuItem._id];
            if (currentItems.extra) {
                const result = [];
                for (const [key, value] of Object.entries(currentItems.extra)) {
                    const option = menuItem.options?.find(
                        item => `${item.title}-${item.description}` === key
                    );

                    const addPrice = option?.additionalPrice ?? 0;

                    result.push({
                        image: menuItem.image,
                        title: menuItem.title,
                        option: key,
                        price: menuItem.basePrice + addPrice,
                        quantity: value
                    })
                }
                setUpdatedItems(result)
            }
        }
    }, [menuItem])

    const handlePressItem = (item: IUpdatedItem, action: "MINUS" | "PLUS") => {
        setLoadingOption(item.option);

        setTimeout(() => {
            let foundItem = updatedItems.find(x => x.option === item.option);
            const foundIndex = updatedItems.findIndex(x => x.option === item.option);
            let shouldCloseModal = false;

            if (foundItem) {
                const total = action === "MINUS" ? -1 : 1;
                foundItem.quantity = foundItem.quantity + total;

                if (foundItem.quantity === 0) {
                    const temp = updatedItems.filter(x => x.option !== item.option)
                    setUpdatedItems(temp);
                    if (temp.length === 0) shouldCloseModal = true;
                }
                else {
                    const temp = [...updatedItems];
                    temp[foundIndex] = foundItem
                    setUpdatedItems(temp)
                }

                //update cart
                updateCart(total, foundItem.option, foundItem.price);
                if (shouldCloseModal) router.back();

                setLoadingOption(null);
            }
        }, 1000);
    }

    const updateCart = (total: number, keyOption: string, price: number) => {
        if (restaurant?._id && menuItem) {
            const item = menuItem;

            //xử lý sản phẩm
            cart[restaurant._id].sum = cart[restaurant._id].sum + total * price;
            cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

            const currentQuantity = cart[restaurant._id].items[item._id].quantity + total;

            const i = cart[restaurant._id].items[item._id];
            let currentExtraQuantity = 0;
            if (i.extra && i.extra?.[keyOption] !== null)
                currentExtraQuantity = i.extra[keyOption] + total;

            cart[restaurant._id].items[item._id] = {
                data: menuItem,
                quantity: currentQuantity,
                extra: {
                    ...cart[restaurant._id].items[item._id].extra,
                    [keyOption]: currentExtraQuantity
                }
            };

            if (currentExtraQuantity <= 0) {
                delete cart[restaurant._id].items[item._id].extra?.[keyOption]
            }

            //chỉ xóa giỏ hàng khi số lượng sản phẩm options = 1
            if (currentQuantity <= 0 && updatedItems.length === 1) {
                delete cart[restaurant._id].items[item._id];
            }

            setCart((prevState: any) => ({ ...prevState, ...cart }));
        }
    }
    return (
        <Animated.View
            entering={FadeIn}
            style={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: '#00000040',
            }}
        >
            <Pressable
                onPress={() => router.back()}
                style={StyleSheet.absoluteFill}
            />

            <Animated.View
                entering={SlideInDown}
                style={{
                    height: '60%',
                    width: "100%",
                    backgroundColor: 'white',
                }}
            >

                <View style={{
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1,
                    flexDirection: "row", gap: 10,
                    padding: 10,
                    alignItems: "center"
                }}>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            textAlign: "center",
                            fontWeight: "600", fontSize: 16
                        }}>
                            Edit Quantity
                        </Text>
                    </View>
                    <AntDesign
                        onPress={() => router.back()}
                        name="close" size={24} color="grey"
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        router.back(); // đóng modal trước
                        setTimeout(() => {
                            router.push(`/product/create.model?menuItemId=${menuItemId}`);
                        }, 300); // đợi 300ms để đảm bảo modal đã đóng
                    }}
                >
                    <Ionicons name="add" size={20} color="#ff3d00" />
                    <Text style={styles.text}>Add New Item</Text>
                </TouchableOpacity>

                <ScrollView style={{
                    flex: 1,
                    borderBottomColor: "#eee",
                    borderBottomWidth: 1
                }}
                >
                    {updatedItems.map((item, index) => {
                        return (
                            <View key={index} style={{
                                backgroundColor: "white",
                                gap: 15, flexDirection: "row",
                                paddingHorizontal: 10,
                                paddingVertical: 15,
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1
                            }}>
                                <View>
                                    <Image
                                        style={{ height: 80, width: 80 }}
                                        source={{ uri: `${getURLBaseBackend()}/images/menu-item/${item?.image}` }} />
                                </View>
                                <View style={{ flex: 1, gap: 10 }}>
                                    <View><Text>{item?.title}</Text></View>
                                    <View><Text>{item?.option}</Text></View>
                                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <Text style={{ color: APP_COLOR.ORANGE }}>
                                            {currencyFormatter(item?.price)}
                                        </Text>
                                        <View
                                            style={{
                                                alignItems: "center",
                                                flexDirection: "row", gap: 3
                                            }}
                                        >
                                            {loadingOption === item.option ? (
                                                <ActivityIndicator size="small" color={APP_COLOR.ORANGE} />
                                            ) : (
                                                <>
                                                    <Pressable
                                                        style={({ pressed }) => ({
                                                            opacity: pressed === true ? 0.5 : 1,
                                                            alignSelf: "flex-start", //fit-content
                                                        })}
                                                        onPress={() => handlePressItem(item, "MINUS")}
                                                    >
                                                        <AntDesign name="minussquareo"
                                                            size={24} color={APP_COLOR.ORANGE}
                                                        />
                                                    </Pressable>
                                                    <Text style={{
                                                        minWidth: 25,
                                                        textAlign: "center"
                                                    }}>
                                                        {item.quantity}
                                                    </Text>

                                                    <Pressable
                                                        style={({ pressed }) => ({
                                                            opacity: pressed === true ? 0.5 : 1,
                                                            alignSelf: "flex-start", //fit-content
                                                        })}
                                                        onPress={() => handlePressItem(item, "PLUS")}
                                                    >
                                                        <AntDesign
                                                            name="plussquare"
                                                            size={24}
                                                            color={APP_COLOR.ORANGE}
                                                        />
                                                    </Pressable>
                                                </>
                                            )}
                                        </View>

                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </ScrollView>
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: APP_COLOR.ORANGE,
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 14,
        color: APP_COLOR.ORANGE,
    },
});

export default UpdateModalPage;