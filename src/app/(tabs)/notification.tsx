import { ScrollView, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const mockPromotions = [
    {
        id: 1,
        title: "[HN, HCMC, DN] Chào hè khao MÓN GIẢM 50%",
        content: "🎉 Khi nhập mã 55SIEUDEAL25\n🥤 Trà sữa Tiger Sugar, Mixue, Bobapop...\n📣 Deal cực nhiệt, đặt ngay cho kịp!",
        image: require("@/assets/notifications/promo1.jpg"), // Add your local assets or use remote URL
        time: "01/05/2025 13:30",
    },
    {
        id: 2,
        title: "[HCMC] Món ngon Sài Gòn GIẢM 50.000Đ",
        content: "👉 Khi nhập mã HOLIDAY20\n🍱 Cơm tấm, bún thịt nướng, gà rán...\n🙌 Ăn lễ cùng ShopeeFood nhé!",
        image: require("@/assets/notifications/promo2.jpg"),
        time: "01/05/2025 10:30",
    },
    {
        id: 3,
        title: "[HCMC, HN] Combo GIẢM 50%, lễ to deal giảm to!",
        content: "🥢 Combo bún trộn nem nướng\n🥪 Combo bánh mì pate, cà phê...\n🧡 Đặt bữa sáng lấy năng lượng vi vu!",
        image: require("@/assets/notifications/promo3.jpg"),
        time: "01/05/2025 08:00",
    },
    {
        id: 4,
        title: "[HCMC, HN] Lễ to, GIẢM KHÔNG GIỚI HẠN 🎉",
        content: "🎊 Giảm 23% không giới hạn\n🍗 Khi nhập mã 55HISPF23\n🍖 Vịt quay, thịt heo nướng BBQ,...\n🎺 Lễ giảm thả ga, đặt ngay nha!",
        image: require("@/assets/notifications/promo4.jpg"),
        time: "30/04/2025 16:55",
    },
    {
        id: 5,
        title: "[HCMC, HN] Lễ to, GIẢM KHÔNG GIỚI HẠN 🎉",
        content: "🎊 Giảm 23% không giới hạn\n🍗 Khi nhập mã 55HISPF23\n🍖 Vịt quay, thịt heo nướng BBQ,...\n🎺 Lễ giảm thả ga, đặt ngay nha!",
        image: require("@/assets/notifications/promo4.jpg"),
        time: "30/04/2025 16:55",
    },
    {
        id: 6,
        title: "[HCMC, HN] Lễ to, GIẢM KHÔNG GIỚI HẠN 🎉",
        content: "🎊 Giảm 23% không giới hạn\n🍗 Khi nhập mã 55HISPF23\n🍖 Vịt quay, thịt heo nướng BBQ,...\n🎺 Lễ giảm thả ga, đặt ngay nha!",
        image: require("@/assets/notifications/promo4.jpg"),
        time: "30/04/2025 16:55",
    },
    {
        id: 7,
        title: "[HCMC, HN] Lễ to, GIẢM KHÔNG GIỚI HẠN 🎉",
        content: "🎊 Giảm 23% không giới hạn\n🍗 Khi nhập mã 55HISPF23\n🍖 Vịt quay, thịt heo nướng BBQ,...\n🎺 Lễ giảm thả ga, đặt ngay nha!",
        image: require("@/assets/notifications/promo4.jpg"),
        time: "30/04/2025 16:55",
    },
];

const NotificationPage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Notification</Text>
                <Ionicons name="settings-outline" size={24} color="black" />
            </View>

            <View style={styles.section}>
                <Pressable style={styles.itemRow}>
                    <Ionicons name="megaphone-outline" size={20} color="#F26422" />
                    <Text style={styles.itemText}>News</Text>
                    <Text style={styles.emptyText}>No News yet</Text>
                </Pressable>
                <Pressable style={styles.itemRow}>
                    <Ionicons name="document-text-outline" size={20} color="#F26422" />
                    <Text style={styles.itemText}>Key Updates</Text>
                    <Text style={styles.emptyText}>No updates yet</Text>
                </Pressable>
            </View>

            <ScrollView style={styles.promotionsSection}>
                {mockPromotions.map(promo => (
                    <View key={promo.id} style={styles.promoCard}>
                        <View style={styles.row}>
                            <Image source={promo.image} style={styles.promoImage} />
                            <View style={styles.promoContent}>
                                <Text style={styles.promoTitle}>{promo.title}</Text>
                                <Text style={styles.promoText}>{promo.content}</Text>
                                <Text style={styles.timeText}>{promo.time}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        padding: 16,
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    section: {
        paddingHorizontal: 16,
        borderBottomWidth: 8,
        borderBottomColor: "#f2f2f2",
    },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 12,
    },
    itemText: {
        fontSize: 16,
        flex: 1,
    },
    emptyText: {
        color: "#999",
        fontSize: 14,
    },
    promotionsSection: {
        flex: 1,
    },
    promoCard: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    row: {
        flexDirection: "row",
        gap: 12,
    },
    promoImage: {
        width: 60,
        height: 60,
        resizeMode: "contain",
    },
    promoContent: {
        flex: 1,
    },
    promoTitle: {
        fontWeight: "600",
        fontSize: 15,
        marginBottom: 4,
    },
    promoText: {
        color: "#555",
        fontSize: 14,
        lineHeight: 18,
        marginBottom: 4,
    },
    timeText: {
        fontSize: 12,
        color: "#999",
    },
});
