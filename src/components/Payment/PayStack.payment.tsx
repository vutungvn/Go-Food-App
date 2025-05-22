import React, { forwardRef, useImperativeHandle } from "react";
import { View } from "react-native";
import { usePaystack } from "react-native-paystack-webview";
import Toast from "react-native-root-toast";
import { APP_COLOR } from "@/utils/constant";

interface IPayStackPaymentProps {
    onSuccessPayment: () => void;
    amount: number;
}

const PayStackPayment = forwardRef(({ onSuccessPayment, amount }: IPayStackPaymentProps, ref) => {
    const { popup } = usePaystack();

    useImperativeHandle(ref, () => ({
        paynow: () => {
            // Kiểm tra số tiền trước khi tạo giao dịch
            if (!amount || amount < 1) {
                console.warn("Paystack Error: Invalid amount. Must be at least 1 unit.");
                Toast.show("Số tiền thanh toán phải lớn hơn 1 đơn vị", {
                    duration: Toast.durations.SHORT,
                    backgroundColor: APP_COLOR.ORANGE,
                    opacity: 0.9,
                });
                return;
            }

            popup.newTransaction({
                email: "vanadangcap123@gmail.com", // Replace with actual user email
                amount: Math.floor(amount), // Paystack requires smallest unit (e.g., kobo)               
                reference: `TXN_${Date.now()}`,
                onSuccess: onSuccessPayment,
                onCancel: () => console.log("Payment cancelled"),
                onLoad: (err) => console.log("Paystack webview loading", err),
                onError: (err) => console.log("Paystack error", err),
            });
        },
    }));

    return <View />;
});

export default PayStackPayment;
