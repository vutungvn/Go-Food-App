import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import ItemSingle from "./item.single";

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
            router.navigate({
                pathname: action === "PLUS" ?
                    "/product/create.model" :
                    "/product/update.modal",
                params: { menuItemId: menuItem._id }
            })
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
                setCart((prevState: any) => ({ ...prevState, ...cart })) //merge state
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
        <ItemSingle
            menuItem={menuItem}
            handlePressItem={handlePressItem}
            showMinus={showMinus}
            quantity={quantity}
        />
    )
}

export default ItemQuantity;