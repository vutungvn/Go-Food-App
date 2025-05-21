import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { Dimensions, Pressable, StyleSheet, TextInput, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { useCurrentApp } from "@/context/app.context";
import { likeRestaurantAPI } from "@/utils/api";
import Toast from "react-native-root-toast";

const AnimatedMaterialIcons = Animated.createAnimatedComponent(MaterialIcons)
const { height: sHeight, width: sWidth } = Dimensions.get('window');

const styles = StyleSheet.create({

})
interface IProps {
    headerHeight: number;
    imageHeight: number;

    animatedBackgroundStyle: any;
    animatedArrowColorStyle: any;
    animatedStickyHeaderStyle: any;
    animatedHeartIconStyle: any;
}

const StickyHeader = (props: IProps) => {
    const insets = useSafeAreaInsets();
    const {
        headerHeight, imageHeight,
        animatedBackgroundStyle,
        animatedArrowColorStyle, animatedStickyHeaderStyle,
        animatedHeartIconStyle
    } = props;

    const [like, setLike] = useState<boolean>(false);
    const { restaurant, appState, setRestaurant } = useCurrentApp();

    useEffect(() => {
        if (restaurant) {
            setLike(restaurant.isLike);
        }
    }, [restaurant])

    const handleLikeRestaurant = async () => {
        //chỉ thực hiện khi user đã đăng nhập
        if (appState?.user._id && restaurant) {
            //lấy phủ định
            const quantity = like === true ? -1 : 1;
            const res = await likeRestaurantAPI(
                restaurant?._id, quantity
            )
            if (res.data) {
                //success 
                setLike(!like);

                // Cập nhật lại restaurant trong context
                setRestaurant({
                    ...restaurant,
                    isLike: !like,
                });
            } else {
                const m = Array.isArray(res.message)
                    ? res.message[0] : res.message;

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
    }

    // nút Back và like/dislike gộp vào component này, vì nó có zIndex cao nhất => có thể pressabled
    return (
        <>
            <View style={{
                zIndex: 11,
                paddingTop: insets.top + 10,
                paddingHorizontal: 10,
                flexDirection: "row",
                gap: 5,
                height: headerHeight,
                position: "absolute",
                width: sWidth,
            }}>
                <Pressable
                    style={({ pressed }) => ([{ opacity: pressed === true ? 0.5 : 1 }, { alignSelf: "flex-start" }])}
                    onPress={() => router.back()}>
                    <Animated.View
                        style={[animatedBackgroundStyle, {
                            height: 30,
                            width: 30,
                            borderRadius: 30 / 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }]}
                    >
                        <AnimatedMaterialIcons
                            name="arrow-back" size={24}
                            style={animatedArrowColorStyle}
                        />
                    </Animated.View>
                </Pressable>
                <Animated.View style={[{ flex: 1 }, animatedStickyHeaderStyle]}>
                    <TextInput
                        placeholder={"Tìm món ăn tại cửa hàng..."}
                        style={{
                            borderWidth: 1, borderColor: APP_COLOR.GREY, width: "100%",
                            borderRadius: 3,
                            paddingHorizontal: 10
                        }}
                    />
                </Animated.View>

            </View>
            {/* background */}
            <Animated.View style={[{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                height: headerHeight,
                backgroundColor: 'white',
            }, animatedStickyHeaderStyle]} />

            {/* like/dislike a restaurant */}
            <Animated.View style={[{
                position: 'absolute',
                top: imageHeight + 80,
                right: 10,
                zIndex: 9,
            }, animatedHeartIconStyle]}>
                {/* <MaterialIcons name="favorite" size={20} color="black" /> */}
                <MaterialIcons
                    onPress={handleLikeRestaurant}
                    name={like ? "favorite" : "favorite-outline"}
                    size={20}
                    color={like ? APP_COLOR.ORANGE : APP_COLOR.GREY}
                />
            </Animated.View>
        </>
    )
}

export default StickyHeader;
