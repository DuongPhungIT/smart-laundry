import React from "react";
import { Button, Box, Text, Icon } from "zmp-ui";
import { closeApp } from "zmp-sdk/apis";

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
                    maxWidth: 400,
                    margin: "40px auto",
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 2px 8px #0001",
                    padding: 24,
                    textAlign: "center",
                    marginTop: "50%",
                }}
            >
                <Text.Title
                    style={{
                        fontWeight: 700,
                        fontSize: 20,
                        marginBottom: 16,
                    }}
                >
                    Hello {userInfomation?.name || ""}!
                </Text.Title>
                <Text.Title
                    style={{
                        fontWeight: 700,
                        fontSize: 20,
                        marginBottom: 16,
                    }}
                >
                    Chào mừng bạn đến với KIDO Shop!
                </Text.Title>
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
                <Text
                    style={{
                        display: "block",
                        margin: "16px 0 24px 0",
                        color: "#333",
                    }}
                >
                    Vui lòng đồng ý chia sẻ số điện thoại để liên kết với tài
                    khoản của bạn trên hệ thống KIDO Shop
                </Text>
                <Button
                    size="large"
                    style={{
                        width: "100%",
                        background: "#1976d2",
                        color: "#fff",
                        fontWeight: 600,
                        marginBottom: 12,
                    }}
                    onClick={() => {
                        handleGetPhoneNumber();
                    }}
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
