import React from "react";
import { Box, Text } from "zmp-ui";
import ProductDefault from "@assets/product.png";

const NoProduct: React.FC = () => (
    <Box
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#fff",
            borderRadius: 16,
            minHeight: 320,
            height: "60vh",
            margin: "0 auto",
            maxWidth: 420,
        }}
    >
        <img src={ProductDefault} alt="ProductDefault" style={{ width: 80, height: 80, objectFit: "contain" }} />
        <Text.Title style={{ fontSize: 18, fontWeight: 700, color: "#888", marginTop: 30 }}>
            Không có sản phẩm
        </Text.Title>
        <Text style={{ color: "#aaa", marginTop: 4 }}>
            Hiện tại chưa có sản phẩm nào trong danh sách.
        </Text>
    </Box>
);

export default NoProduct;