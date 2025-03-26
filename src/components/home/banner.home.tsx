import * as React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";

import bn1 from "@/assets/banner/bn1.jpg";
import bn2 from "@/assets/banner/bn2.jpg";
import bn3 from "@/assets/banner/bn3.jpg";
import bn4 from "@/assets/banner/bn4.jpg";
import bn5 from "@/assets/banner/bn5.jpg";
import bn6 from "@/assets/banner/bn6.jpg";
import bn7 from "@/assets/banner/bn7.jpg";
import bn8 from "@/assets/banner/bn8.jpg";
import bn9 from "@/assets/banner/bn9.jpg";
import bn10 from "@/assets/banner/bn10.jpg";

function BannerHome() {
    const ref = React.useRef<ICarouselInstance>(null);
    const progress = useSharedValue<number>(0);
    const width = Dimensions.get("window").width;
    const containerWidth = width * 0.97;

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };

    const sliders = [
        { id: 1, source: bn1 },
        { id: 2, source: bn2 },
        { id: 3, source: bn3 },
        { id: 4, source: bn4 },
        { id: 5, source: bn5 },
        { id: 6, source: bn6 },
        { id: 7, source: bn7 },
        { id: 8, source: bn8 },
        { id: 9, source: bn9 },
        { id: 10, source: bn10 },
    ]

    return (
        <View
            style={{
                width: containerWidth,
                alignSelf: "center",
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 15,
                padding: 5,
            }}
        >
            <Carousel
                ref={ref}
                width={containerWidth - 10}
                height={width / 4}
                data={sliders}
                onProgressChange={progress}
                autoPlay={true}
                autoPlayInterval={3000}
                loop={true}
                renderItem={({ item }) => (
                    <Image
                        style={{
                            width: "100%",
                            height: width / 3.7,
                            resizeMode: "cover",
                            borderRadius: 10,
                        }}
                        source={item.source}
                    />
                )}
            />

            <Pagination.Basic
                progress={progress}
                data={sliders}
                dotStyle={{
                    width: 5,
                    height: 5,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: 50,
                }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
            />
        </View>
    );
}

export default BannerHome;
