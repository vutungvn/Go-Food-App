import { Pressable, Text, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";

interface IProps {
    restaurant: IRestaurant | null;
}

const StickyFooter = (props: IProps) => {
    const { cart, setCart } = useCurrentApp();
    const { restaurant } = props;

    const getSum = () => {
        if (restaurant && cart[restaurant._id]) {
            return cart[restaurant._id].sum;
        }
        return 0;
    }

    const getTotalQuantity = () => {
        if (restaurant && cart[restaurant._id]) {
            return cart[restaurant._id].quantity;
        }
        return 0;
    }

    return (
        <>
            {getSum() === 0 ? <></> :
                <View
                    style={{
                        width: "100%",
                        backgroundColor: "white",
                        zIndex: 11,
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        borderTopWidth: 1,
                        borderTopColor: APP_COLOR.GREY,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 30
                            }}
                        >
                            <View
                                style={{
                                    position: "absolute",
                                    left: 60,
                                    top: 5,
                                    width: 16,
                                    height: 16,
                                    borderRadius: 16 / 2,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: APP_COLOR.ORANGE
                                }}
                            >
                                <Text style={{
                                    color: "white",
                                    fontSize: 9
                                }}>
                                    {getTotalQuantity()}
                                </Text>
                            </View>
                            <Pressable onPress={() => alert("cart")}>
                                <FontAwesome5 name="shopping-basket"
                                    size={30} color={APP_COLOR.ORANGE}
                                />
                            </Pressable>
                        </View>
                        <View style={{ paddingRight: 10 }}>
                            <Text style={{
                                color: APP_COLOR.ORANGE,
                                fontSize: 18
                            }}>
                                {currencyFormatter(getSum())}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        paddingHorizontal: 30,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: APP_COLOR.ORANGE,
                    }}>
                        <Text
                            onPress={() => router.navigate("/product/order")}
                            style={{
                                color: "white"
                            }}
                        >Checkout</Text>
                    </View>
                </View>
            }
        </>
    )
}

export default StickyFooter;