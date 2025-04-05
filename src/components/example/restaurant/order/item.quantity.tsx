import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { Image, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface IProps {
    menuItem: IMenuItem
}
const ItemQuantity = (props: IProps) => {
    const { menuItem } = props;

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
                        <AntDesign
                            name='minussquareo'
                            size={30}
                            color={APP_COLOR.ORANGE}
                        />
                        <Text
                            style={{
                                minWidth: 25,
                                textAlign: "center"
                            }}
                        >
                            10
                        </Text>
                        <AntDesign
                            name="plussquare"
                            size={30}
                            color={APP_COLOR.ORANGE} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ItemQuantity;