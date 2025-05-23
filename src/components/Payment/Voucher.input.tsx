import React, { useState } from "react";
import { View, Text, Pressable, Modal, FlatList } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import Toast from "react-native-root-toast";

interface Voucher {
    code: string;
    label: string;
    discount: number;
    minPrice: number;
}

interface Props {
    totalAmount: number;
    selectedCode: string;
    onSelect: (code: string, discount: number) => void;
}

const mockVouchers: Voucher[] = [
    { code: "FOOD20", label: "Giảm 20K cho đơn từ 50K", discount: 20000, minPrice: 50000 },
    { code: "FREESHIP", label: "Freeship 15K cho đơn từ 40K", discount: 15000, minPrice: 40000 },
    { code: "HOT10", label: "Giảm 10K cho đơn từ 30K", discount: 10000, minPrice: 30000 },
];

const VoucherSelector: React.FC<Props> = ({ totalAmount, selectedCode, onSelect }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleChooseVoucher = (voucher: Voucher) => {
        if (!voucher.code) {
            // Bỏ chọn mã
            onSelect("", 0);
            setModalVisible(false);
            Toast.show("Đã bỏ mã giảm giá", {
                duration: Toast.durations.SHORT,
                backgroundColor: "#666",
            });
            return;
        }

        if (totalAmount < voucher.minPrice) {
            Toast.show(`Đơn hàng phải từ ${voucher.minPrice}đ để dùng mã này`, {
                duration: Toast.durations.SHORT,
                backgroundColor: APP_COLOR.ORANGE,
            });
            return;
        }

        onSelect(voucher.code, voucher.discount);
        setModalVisible(false);
        Toast.show(`Đã chọn mã ${voucher.code} (-${voucher.discount}đ)`, {
            duration: Toast.durations.SHORT,
            backgroundColor: APP_COLOR.GREEN,
        });
    };

    const openVoucherModal = () => {
        if (totalAmount < 30000) {
            Toast.show("Đơn hàng phải từ 30.000đ mới có thể áp dụng mã giảm giá", {
                duration: Toast.durations.SHORT,
                backgroundColor: APP_COLOR.ORANGE,
            });
            return;
        }
        setModalVisible(true);
    };

    return (
        <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "500", marginBottom: 6 }}>Mã giảm giá</Text>
            <Pressable
                onPress={openVoucherModal}
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 6,
                    padding: 10,
                    justifyContent: "center",
                }}
            >
                <Text style={{ color: selectedCode ? "#000" : "#999" }}>
                    {selectedCode ? `Đã chọn: ${selectedCode}` : "Chọn mã giảm giá"}
                </Text>
            </Pressable>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={{ flex: 1, backgroundColor: "#00000066", justifyContent: "flex-end" }}>
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 20,
                            maxHeight: "60%",
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
                            Danh sách mã giảm giá
                        </Text>
                        <FlatList
                            data={[{ code: "", label: "Không dùng mã giảm giá", discount: 0, minPrice: 0 }, ...mockVouchers]}
                            keyExtractor={(item) => item.code || "none"}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => handleChooseVoucher(item)}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: item.code === selectedCode ? APP_COLOR.ORANGE : "#ddd",
                                        borderRadius: 8,
                                        padding: 12,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={{ fontWeight: "600" }}>
                                        {item.code || "Không dùng mã"}
                                    </Text>
                                    {!!item.label && (
                                        <Text style={{ fontSize: 13, color: "#666", marginTop: 4 }}>
                                            {item.label}
                                        </Text>
                                    )}
                                </Pressable>
                            )}
                        />
                        <Pressable
                            onPress={() => setModalVisible(false)}
                            style={{
                                backgroundColor: APP_COLOR.ORANGE,
                                paddingVertical: 12,
                                borderRadius: 6,
                                marginTop: 10,
                            }}
                        >
                            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
                                Đóng
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VoucherSelector;
