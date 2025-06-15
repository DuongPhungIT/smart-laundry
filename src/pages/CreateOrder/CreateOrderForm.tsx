import React, { useEffect, useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import "styled-components/macro";
import { Button, Input } from "@components";
import { useForm, Controller } from "react-hook-form";
import { getPhoneNumber, getUserInfo } from "zmp-sdk/apis";

type Quantities = Record<string, number>;

type FormData = {
    quantities: Quantities;
};

type ProductOption = {
    label: string;
    value: string;
    id: number;
};

type SelectedProduct = {
    product: string;
    id: number | null;
    quantity: number;
};

type Order = {
    fullName: string;
    phoneNumber: string;
    products: SelectedProduct[];
};

const BANH_BAO_OPTIONS: ProductOption[] = [
    { label: "Bánh bao thịt", value: "banh-bao-thit", id: 1 },
    { label: "Bánh bao chay", value: "banh-bao-chay", id: 2 },
    { label: "Bánh bao nhân trứng", value: "banh-bao-nhan-trung", id: 3 },
    { label: "Bánh bao xá xíu", value: "banh-bao-xa-xiu", id: 4 },
    { label: "Bánh bao kim sa", value: "banh-bao-kim-sa", id: 5 },
];

const CreateOrderForm: React.FC = () => {
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [infoOrder, setInfoOrder] = useState<Order | null>(null);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userInfomation, setUserInfomation] = useState<any>();

    const { control, handleSubmit, reset, watch } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            quantities: BANH_BAO_OPTIONS.reduce<Quantities>((acc, cur) => {
                acc[cur.value] = 0;
                return acc;
            }, {}),
        },
    });

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const resp = await getPhoneNumber({});
                console.log("response", resp);
                // Kiểm tra nếu response hợp lệ và có trường number
                if (resp && resp.number) {
                    setPhoneNumber(resp.number);
                    // Do something with the phone number if needed
                    console.log("Phone Number:", resp.number, resp);
                }
            } catch (error) {
                console.error("Error fetching phone number:", error);
            }
        };
        fetchPhoneNumber();
        const fetchUserInfo = async () => {
            try {
                const user = await getUserInfo({ avatarType: "normal" });
                const { userInfo } = user;
                setUserInfomation(userInfo);
                console.log("User Info:", userInfo);
                console.log("User ===:", user);
                // Do something with the user info if needed
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        fetchUserInfo();
    }, []);

    const quantities = watch("quantities");

    const isSubmitDisabled = !Object.values(quantities || {}).some(q => q > 0);

    const onSubmit = (data: FormData) => {
        const selectedProducts: SelectedProduct[] = Object.entries(
            data.quantities || {},
        )
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, quantity]) => quantity > 0)
            .map(([key, quantity]) => {
                const product = BANH_BAO_OPTIONS.find(
                    item => item.value === key,
                );
                return {
                    product: product?.label || key,
                    id: product?.id || null,
                    quantity,
                };
            });

        const order: Order = {
            fullName: userInfomation?.name || userInfomation?.id || "Không có tên",
            phoneNumber: phoneNumber || "Không có số điện thoại",
            products: selectedProducts,
        };

        setInfoOrder(order);

        setCreatingOrder(true);
        setTimeout(() => {
            setCreatingOrder(false);
            reset();
        }, 1000);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ backgroundColor: "#f5f5f5", margin: 20, borderRadius: 8 }}
        >
            <Box p={4} tw="bg-white">
                <Box>
                    <Text style={{ fontWeight: 500 }}>
                        Họ và tên: {userInfomation?.name || userInfomation?.id || "Không có tên"} 
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        Số điện thoại: {phoneNumber || "Không có số điện thoại"}
                    </Text>
                </Box>

                <Box mt={4}>
                    <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                        Sản phẩm Thọ Phát
                    </Text>
                    <div
                        style={{
                            backgroundColor: "#f9f9f9",
                            padding: "10px",
                            borderRadius: "8px",
                        }}
                    >
                        {BANH_BAO_OPTIONS.map((item, index) => (
                            <Box key={item.value} mt={2}>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        width: "100%",
                                    }}
                                >
                                    <Text style={{ minWidth: 120 }}>
                                        {item.label}
                                    </Text>
                                    <Controller
                                        name={`quantities.${item.value}`}
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                type="number"
                                                min={0}
                                                value={field.value}
                                                onChange={e =>
                                                    field.onChange(
                                                        Math.max(
                                                            0,
                                                            Number(
                                                                e.target.value,
                                                            ),
                                                        ),
                                                    )
                                                }
                                                placeholder="0"
                                                style={{ width: 120 }}
                                            />
                                        )}
                                    />
                                </div>
                                {BANH_BAO_OPTIONS.length - 1 !== index && (
                                    <div
                                        style={{
                                            borderBottom: "1px solid #cecece",
                                            width: "100%",
                                            marginTop: 8,
                                        }}
                                    />
                                )}
                            </Box>
                        ))}
                    </div>
                </Box>
            </Box>

            <Box
                p={4}
                tw="bg-white border-t border-gray-200"
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <Button
                    htmlType="submit"
                    suffixIcon={<Icon icon="zi-chevron-right" />}
                    loading={creatingOrder}
                    disabled={isSubmitDisabled}
                >
                    Đặt hàng
                </Button>
            </Box>

            {infoOrder && (
                <Box p={4} tw="bg-white mt-4">
                    <Text style={{ fontWeight: 500, marginBottom: 10 }}>
                        Thông tin đơn hàng:
                    </Text>
                    <Text>Họ và tên: {infoOrder.fullName}</Text>
                    <Text>Số điện thoại: {infoOrder.phoneNumber}</Text>
                    <Text style={{ marginTop: 10 }}>Sản phẩm đã chọn:</Text>
                    {infoOrder.products.map((product, index) => (
                        <Text key={Number(index)}>
                            {product.product} - Số lượng: {product.quantity}
                        </Text>
                    ))}
                </Box>
            )}
        </form>
    );
};

export default CreateOrderForm;
