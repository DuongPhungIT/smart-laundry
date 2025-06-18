import React, { useState } from "react";
import { Box, Icon, Text } from "zmp-ui";
import "styled-components/macro";
import { Button, Input } from "@components";
import { useForm, Controller } from "react-hook-form";
import { useStore } from "@store";

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
    const [user, numberPhone] = useStore(state => [
        state.user,
        state.numberPhone,
    ]) || [{}, ""];

    const { control, handleSubmit, reset, watch } = useForm<FormData>({
        mode: "onChange",
        defaultValues: {
            quantities: BANH_BAO_OPTIONS.reduce<Quantities>((acc, cur) => {
                acc[cur.value] = 0;
                return acc;
            }, {}),
        },
    });

    const quantities = watch("quantities");
    const isSubmitDisabled = !Object.values(quantities || {}).some(q => q > 0);

    const onSubmit = (data: FormData) => {
        const selectedProducts: SelectedProduct[] = Object.entries(
            data.quantities || {},
        )
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
            fullName: user?.name || user?.id || "Không có tên",
            phoneNumber: numberPhone || "Không có số điện thoại",
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
            style={{
                background: "#f4f7fa",
                margin: "24px auto",
                borderRadius: 16,
                maxWidth: 420,
                boxShadow: "0 2px 12px #0001",
                padding: 16,
            }}
        >
            <Box p={0} style={{ borderRadius: 16}}>
                <Box
                    style={{
                        background: "#c71438",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        padding: "24px 24px 16px 24px",
                        color: "#fff",
                        textAlign: "center",
                        fontWeight: 700,
                    }}
                >
                    <Text.Title style={{  fontSize: 22, fontWeight: 700, }}>
                        Đặt hàng Bánh bao Thọ Phát
                    </Text.Title>
                    <Text style={{ opacity: 0.9, marginTop: 10, fontWeight: 700, }}>
                        Vui lòng kiểm tra thông tin trước khi đặt hàng
                    </Text>
                </Box>
                <Box p={4} style={{ background: "#fff", borderRadius: 16 }}>
                    <Box mb={2}>
                        <Text style={{ fontWeight: 500 }}>
                            Họ và tên:{" "}
                            <span style={{ color: "#1976d2" }}>
                                {user?.name || user?.id || "Không có tên"}
                            </span>
                        </Text>
                    </Box>
                    <Box mb={4}>
                        <Text style={{ fontWeight: 500 }}>
                            Số điện thoại:{" "}
                            <span style={{ color: "#1976d2" }}>
                                {numberPhone || "Không có số điện thoại"}
                            </span>
                        </Text>
                    </Box>
                    <Box>
                        <Text
                            style={{
                                marginBottom: 10,
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Chọn sản phẩm
                        </Text>
                        <div
                            style={{
                                background: "#f9f9f9",
                                padding: "16px",
                                borderRadius: "10px",
                                marginTop: 8,
                                marginBottom: 8,
                                boxShadow: "0 1px 4px #0001",
                            }}
                        >
                            {BANH_BAO_OPTIONS.map((item, index) => (
                                <Box key={item.value} mb={index !== BANH_BAO_OPTIONS.length - 1 ? 3 : 0}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            width: "100%",
                                            padding: "8px 0",
                                        }}
                                    >
                                        <Text style={{ minWidth: 140 }}>
                                            {item.label}
                                        </Text>
                                        <Controller
                                            name={`quantities.${item.value}`}
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    type="number"
                                                    inputMode="numeric"
                                                    pattern="[0-9]*"
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
                                                    style={{
                                                        width: 80,
                                                        borderRadius: 8,
                                                        border: "1px solid #e0e0e0",
                                                        background: "#fff",
                                                        textAlign: "center",
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>
                                    {BANH_BAO_OPTIONS.length - 1 !== index && (
                                        <div
                                            style={{
                                                borderBottom: "1px solid #e3e3e3",
                                                width: "100%",
                                            }}
                                        />
                                    )}
                                </Box>
                            ))}
                        </div>
                    </Box>
                </Box>
            </Box>

            <Box
                p={4}
                style={{
                    background: "#fff",
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                    borderTop: "1px solid #f0f0f0",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Button
                    htmlType="submit"
                    suffixIcon={<Icon icon="zi-chevron-right" />}
                    loading={creatingOrder}
                    disabled={isSubmitDisabled}
                    style={{
                        minWidth: 140,
                        fontWeight: 600,
                        fontSize: 16,
                        borderRadius: 8,
                        background: isSubmitDisabled ? "#bdbdbd" : "#1976d2",
                        color: "#fff",
                        boxShadow: "0 2px 8px #1976d233",
                    }}
                >
                    Đặt hàng
                </Button>
            </Box>

            {infoOrder && (
                <Box
                    p={4}
                    style={{
                        background: "#e3f2fd",
                        borderRadius: 16,
                        margin: 16,
                        boxShadow: "0 2px 8px #1976d211",
                    }}
                >
                    <Text style={{ fontWeight: 600, marginBottom: 10, fontSize: 16, color: "#1976d2" }}>
                        Thông tin đơn hàng:
                    </Text>
                    <Text>Họ và tên: {infoOrder.fullName}</Text>
                    <Text>Số điện thoại: {infoOrder.phoneNumber}</Text>
                    <Text style={{ marginTop: 10, fontWeight: 500 }}>Sản phẩm đã chọn:</Text>
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
