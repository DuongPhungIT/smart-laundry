import React from "react";
import { Button, Box, Text, Icon } from "zmp-ui";
import { closeApp } from "zmp-sdk/apis";

import BannerIcon from "@components/icons/Banner";

import LayoutHomePage from "./LayoutHomePage";

interface WelcomePageProps {
    handleGetPhoneNumber: () => void;
    userInfomation: any;
}

const WelcomePage: React.FC<WelcomePageProps> = props => {
    const { handleGetPhoneNumber, userInfomation } = props;

    return (
        <LayoutHomePage>
            <Box
                style={{
                    maxWidth: 450,
                    width: "100%",
                    textAlign: "center",
                    position: "fixed",
                    bottom: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <BannerIcon/>
            </Box>
            <Box
                style={{
                    maxWidth: 450,
                    width: "100%",
                    background:
                        "linear-gradient(180deg, #e0eafc00 0%, #6dd5ed 80%, #2193b0 100%)",
                    padding: "36px 24px 28px 24px",
                    textAlign: "center",
                    position: "fixed",
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 18,
                }}
            >
                <Text.Title
                    style={{
                        fontWeight: 700,
                        fontSize: 20,
                        marginBottom: 10,
                    }}
                >
                    Hello {userInfomation?.name || ""}!
                </Text.Title>
                <Text
                    style={{
                        color: "#333",
                        fontSize: 16,
                        marginBottom: 10,
                        marginTop: 10,
                        lineHeight: 1.5,
                    }}
                >
                    Chào mừng bạn đến với{" "}
                    <b style={{ color: "#e53935" }}>Thọ Phát Shop</b>!<br />
                    Để sử dụng đầy đủ tính năng, vui lòng cho phép truy cập số
                    điện thoại của bạn.
                </Text>
                <Box mb={2} style={{ textAlign: "left" }}>
                    <Box flex alignItems="center" mb={1}>
                        <Icon
                            icon="zi-location"
                            style={{
                                marginRight: 8,
                                color: "#1976d2",
                            }}
                        />
                        <Text>Tra cứu tình trạng đơn hàng</Text>
                    </Box>
                    <Box flex alignItems="center" mb={1}>
                        <Icon
                            icon="zi-location"
                            style={{
                                marginRight: 8,
                                color: "#1976d2",
                            }}
                        />
                        <Text>Nhận thông tin thay đổi trạng thái</Text>
                    </Box>
                    <Box flex alignItems="center" mb={1}>
                        <Icon
                            icon="zi-location"
                            style={{
                                marginRight: 8,
                                color: "#1976d2",
                            }}
                        />
                        <Text>Xem hành trình giao hàng trực tiếp</Text>
                    </Box>
                </Box>
                <Button
                    size="large"
                    style={{
                        width: "100%",
                        background:
                            "linear-gradient(90deg, #e53935 60%, #ff7043 100%)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 18,
                        borderRadius: 14,
                        boxShadow: "0 2px 12px #e5393533",
                        transition: "background 0.2s",
                    }}
                    onClick={handleGetPhoneNumber}
                >
                    Liên kết số điện thoại
                </Button>
                <Button
                    size="large"
                    style={{
                        width: "100%",
                        background: "none",
                        color: "#e53935",
                        fontWeight: 600,
                    }}
                    onClick={() => {
                        closeApp();
                    }}
                >
                    Từ chối và Thoát
                </Button>
            </Box>
        </LayoutHomePage>
    );
};

export default WelcomePage;
