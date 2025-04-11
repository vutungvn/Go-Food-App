import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Image, Pressable, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

interface IProps {
    menuItem: IMenuItem;
    restaurant: IRestaurant | null;
    isModel: boolean;
}
const ItemQuantity = (props: IProps) => {
    const { menuItem, restaurant, isModel } = props;
    const { cart, setCart } = useCurrentApp();

    const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
        if (item.options.length && isModel === false) {
            router.navigate("/product/create.model")
        } else {
            if (restaurant?._id) {
                const total = action === "MINUS" ? -1 : 1;

                if (!cart[restaurant?._id]) {
                    //chưa đã tồn tại giỏ hàng => khởi tạo giỏ hàng
                    cart[restaurant._id] = {
                        sum: 0,
                        quantity: 0,
                        items: {}
                    }
                }

                //Xử lý sản phẩm
                cart[restaurant._id].sum = cart[restaurant._id].sum + total * item.basePrice;
                cart[restaurant._id].quantity = cart[restaurant._id].quantity + total;

                //Check sản phẩm đã từng thêm vào chưa
                if (!cart[restaurant._id].items[item._id]) {
                    cart[restaurant._id].items[item._id] = {
                        data: menuItem,
                        quantity: 0
                    };
                }

                const currentQuantity = cart[restaurant._id].items[item._id].quantity + total;
                cart[restaurant._id].items[item._id] = {
                    data: menuItem,
                    quantity: currentQuantity
                };

                if (currentQuantity <= 0) {
                    delete cart[restaurant._id].items[item._id];
                }
                setCart((prevState: any) => ({ ...prevState, cart })) //merge state
            }
        }
    }

    let showMinus = false;
    let quantity = 0;
    if (restaurant?._id) {
        const store = cart[restaurant?._id!];
        if (store?.items && store?.items[menuItem?._id]) {
            showMinus = true;
            quantity = store?.items[menuItem?._id].quantity;
        }
    }

    return (
        <View style={{
            backgroundColor: "white",
            gap: 10, flexDirection: "row", padding: 10
        }}>
            <View>
                <Image
                    style={{ height: 100, width: 100 }}
                    source={{ uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}` }} />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
                <View><Text style={{ fontSize: 18, color: "#333333" }}>{menuItem.title}</Text></View>
                <View><Text style={{ color: "#777777" }}>{menuItem.description}</Text></View>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text style={{ color: APP_COLOR.ORANGE, fontSize: 18 }}>
                        {currencyFormatter(menuItem.basePrice)}
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 3,
                            alignItems: "center"
                        }}
                    >
                        {showMinus &&
                            <>
                                <Pressable
                                    style={({ pressed }) => ({
                                        opacity: pressed ? 0.5 : 1,
                                        alignSelf: "flex-start"
                                    })}
                                    onPress={() => handlePressItem(menuItem, "MINUS")}
                                >
                                    <AntDesign
                                        name='minussquareo'
                                        size={30}
                                        color={APP_COLOR.ORANGE}
                                    />
                                </Pressable>
                                <Text
                                    style={{
                                        minWidth: 25,
                                        textAlign: "center"
                                    }}
                                >
                                    {quantity}
                                </Text>
                            </>
                        }
                        <Pressable
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                                alignSelf: "flex-start"
                            })}
                            onPress={() => handlePressItem(menuItem, "PLUS")}
                        >
                            <AntDesign
                                name="plussquare"
                                size={30}
                                color={APP_COLOR.ORANGE}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemQuantity;