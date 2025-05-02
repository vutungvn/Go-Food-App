import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
    {
        key: 1,
        name: "Top Quán Rating 5* Tuần Này",
        description: "Gợi ý quán được tín đồ ẩm thực đánh giá 5*",
        refAPI: "top-rating"
    },
    {
        key: 2,
        name: "Bữa Trưa Ngon Rẻ, Món Gì Cũng Có",
        description: "Cơm, Bún, Phở, Gà Rán, Pizza,.. giảm đến 40.000Đ. Ghẹo lựa ngay!",
        refAPI: "top-freeship"
    },
    {
        key: 3,
        name: "Quán Mới Lên Sàn, Giảm 50.000Đ",
        description: "Quán ngon mới mở, toàn món hot...lại giảm đậm sâu 50.000Đ nữa đó",
        refAPI: "newcomer"
    },
    {
        key: 4,
        name: "Chợ Cuối Tuần Giảm Đến 75.000Đ",
        description: "Nhập mã MARTWEEKEND75K giảm 75.000Đ",
        refAPI: "top-freeship"
    },
]

const HomeTag = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);


    useEffect(() => {
        if (!mounted) return;
        setTimeout(() => {
            router.push("/(auth)/popup.sale")
        }, 1000)
    }, [mounted])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomFlatList
                data={data}
                style={styles.list}
                renderItem={({ item }) => (
                    <CollectionHome
                        name={item.name}
                        description={item.description}
                        refAPI={item.refAPI}
                    />)}
                HeaderComponent={<HeaderHome />}
                StickyElementComponent={<SearchHome />}
                TopListElementComponent={<TopListHome />}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        flex: 1,
        justifyContent: "center",
        overflow: "hidden",
    },
    header: {
        borderColor: "red",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    item: {
        borderColor: "green",
        borderWidth: 1,
        height: 250,
        marginBottom: 10,
        width: "100%"
    },
    list: {
        overflow: "hidden"
    },
    sticky: {
        backgroundColor: "#2555FF50",
        borderColor: "blue",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
});

export default HomeTag;