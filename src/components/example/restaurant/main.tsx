import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, SectionList, ViewToken, ScrollView } from 'react-native';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, interpolate, Extrapolation, interpolateColor } from 'react-native-reanimated';
import Info from './info';
import demo from '@/assets/demo.jpg';
import { APP_COLOR } from '@/utils/constant';
import StickyHeader from './sticky.header';
import { useRef, useState } from 'react';
import { currencyFormatter, getURLBaseBackend, processDataRestaurantMenu } from '@/utils/api';
import AntDesign from '@expo/vector-icons/AntDesign';

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList);

const { height: sHeight, width: sWidth } = Dimensions.get('window');

const HEADER_HEIGHT = 120;
const IMAGE_HEIGHT = 220;
const INFO_HEIGHT = 250;
const SLIDE_MENU_HEIGHT = 50;

interface IProps {
    restaurant: IRestaurant | null;
}
const RMain = (props: IProps) => {

    const { restaurant } = props;
    const scrollY = useSharedValue(0);

    const sectionListRef = useRef<SectionList>(null);
    const flatListRef = useRef<FlatList>(null);
    const [activeMenuIndex, setActiveMenuIndex] = useState<number | string>(0);
    const blockUpdateRef = useRef<boolean>(false);

    // Scroll handler to update the scrollY value
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
        // console.log(scrollY.value)
    });


    // Fade-in effect for the restaurant header
    const animatedStickyHeaderStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 100],
            [0, 1],
            Extrapolation.CLAMP
        );
        const pointerEvents = opacity === 0 ? 'none' : 'auto';

        return {
            opacity,
            pointerEvents //on/off click input
        };
    });

    // Sticky positioning for the menu below the header
    const animatedMenuStyle = useAnimatedStyle(() => {
        const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;
        const translateY = interpolate(
            scrollY.value,
            [0, range], // Define scroll range
            [0, -range - 2], //2px menu border
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],
            position: 'absolute',
            top: IMAGE_HEIGHT + INFO_HEIGHT,
            zIndex: 2,
            width: '100%',
            backgroundColor: 'white',
        };
    });

    const animatedInfoStyle = useAnimatedStyle(() => {
        const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;

        const translateY = interpolate(
            scrollY.value,
            [0, range], // Define scroll range
            [0, -range],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],
            position: 'absolute',
            top: IMAGE_HEIGHT,
            zIndex: 1,
            width: '100%',
        };
    });

    const animatedHeartIconStyle = useAnimatedStyle(() => {
        const range = IMAGE_HEIGHT + INFO_HEIGHT - HEADER_HEIGHT;

        const translateY = interpolate(
            scrollY.value,
            [0, range], // Define scroll range
            [0, -range],
            Extrapolation.CLAMP
        );

        return {
            transform: [{ translateY }],

        };
    });

    // Animated styles for background
    const animatedBackgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(
                scrollY.value,
                [0, 100],
                ['rgba(0,0,0,0.3)', 'transparent'],
            ),
        };
    });

    // Animate arrow color
    const animatedArrowColorStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(
                scrollY.value,
                [0, 100],
                ['white', APP_COLOR.ORANGE], // Arrow color range
            ),
        };
    });

    const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
        if (viewableItems.length > 0 && !blockUpdateRef.current) {
            const visibleSectionIndex = viewableItems[0].section.index;
            setActiveMenuIndex(visibleSectionIndex)
            flatListRef.current?.scrollToIndex({ index: visibleSectionIndex, animated: true });
        }
    }).current;

    return (
        <View>
            <StickyHeader
                headerHeight={HEADER_HEIGHT}
                imageHeight={IMAGE_HEIGHT}
                animatedBackgroundStyle={animatedBackgroundStyle}
                animatedArrowColorStyle={animatedArrowColorStyle}
                animatedStickyHeaderStyle={animatedStickyHeaderStyle}
                animatedHeartIconStyle={animatedHeartIconStyle}
            />

            {/*  Image */}
            <View style={styles.header}>
                <Image
                    source={{ uri: `${getURLBaseBackend()}/images/restaurant/${restaurant?.image}` }}
                    style={styles.headerImage}
                />
            </View>

            {/* Info */}
            <Animated.View style={[animatedInfoStyle]}>
                <Info
                    infoHeight={INFO_HEIGHT}
                    restaurant={restaurant}
                />
            </Animated.View>

            {/* Sticky Menu */}
            <Animated.FlatList
                ref={flatListRef}
                horizontal
                data={processDataRestaurantMenu(restaurant)}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index}
                        onPress={() => {
                            blockUpdateRef.current = true;
                            setActiveMenuIndex(index)
                            sectionListRef.current?.scrollToLocation({
                                sectionIndex: item.index,
                                itemIndex: 0,
                                viewOffset: HEADER_HEIGHT + SLIDE_MENU_HEIGHT
                            })
                        }}
                    >
                        <View style={{
                            paddingHorizontal: 7,
                            height: SLIDE_MENU_HEIGHT,
                            justifyContent: "center",
                            borderBottomColor: item.index === activeMenuIndex ? APP_COLOR.ORANGE : APP_COLOR.GREY,
                            borderBottomWidth: 2
                        }}>
                            <Text style={{
                                color: item.index === activeMenuIndex ? APP_COLOR.ORANGE : "black",
                                marginHorizontal: 5,
                                fontWeight: "600",
                                textTransform: "uppercase"
                            }}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
                style={[animatedMenuStyle]}
            />

            {/* Scrollable Content */}
            <AnimatedSectionList
                ref={sectionListRef as any}
                style={{ zIndex: 1 }}
                onScroll={onScroll}
                stickySectionHeadersEnabled={false}
                contentContainerStyle={{
                    paddingTop: IMAGE_HEIGHT + INFO_HEIGHT + SLIDE_MENU_HEIGHT - 2,
                    paddingBottom: 30,
                }}
                sections={processDataRestaurantMenu(restaurant)}
                renderItem={({ item, index }: { item: any, index: any }) => {
                    const menuItem = item as IMenuItem;

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
                                    <AntDesign
                                        name="plussquare"
                                        size={30}
                                        color={APP_COLOR.ORANGE} />
                                </View>
                            </View>
                        </View>
                    )
                }}
                renderSectionHeader={({ section }: { section: any }) => (
                    <View style={{ backgroundColor: "white", paddingHorizontal: 10, paddingTop: 10 }}>
                        <Text style={{ textTransform: "uppercase", fontWeight: "600", color: "#333333" }}>{section.title}</Text>
                    </View>
                )}

                ItemSeparatorComponent={() => (<>
                    <View style={{ backgroundColor: "white", paddingHorizontal: 10 }}>
                        <View style={{ height: 1, backgroundColor: "#ccc", marginVertical: 5 }} />
                    </View>
                </>)}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 1,
                    waitForInteraction: true,
                }}
                onViewableItemsChanged={onViewableItemsChanged}
                onMomentumScrollEnd={() => (blockUpdateRef.current = false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    menuItem: {
        fontSize: 16,
        fontWeight: 'bold',
        color: APP_COLOR.ORANGE,
        marginHorizontal: 10,
    },
    header: {
        width: sWidth,
        height: IMAGE_HEIGHT,
        top: 0,
        left: 0,
        position: 'absolute',
        zIndex: 1
    },
    headerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default RMain;
