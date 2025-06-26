/* eslint-disable no-console */
import React from "react";
import { followOA } from "zmp-sdk";
import { Utinities } from "@components";
import { Button, Box, Text } from "zmp-ui";
import Logo from "@assets/logo.png";
import { APP_UTINITIES } from "@constants/utinities";
import LayoutHomePage from "./LayoutHomePage";

const OA_ID = "882731523191190754";

const FollowOAPage: React.FC = () => {
    const handleFollowOA = async () => {
        try {
            await followOA({ id: OA_ID });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <LayoutHomePage>
            <Utinities utinities={APP_UTINITIES} />

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
                    gap: 12,
                }}
            >
                <Box
                    style={{
                        width: 96,
                        height: 96,
                        borderRadius: "50%",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 10px auto",
                        boxShadow: "0 4px 16px #e5393522",
                        border: "4px solid #e53935",
                    }}
                >
                    <img
                        src={Logo}
                        alt="thophat"
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            objectFit: "contain",
                            background: "#fff",
                        }}
                    />
                </Box>
                <Text.Title
                    style={{
                        fontWeight: 800,
                        fontSize: 22,
                        color: "#e53935",
                        marginBottom: 2,
                        letterSpacing: 1,
                    }}
                >
                    Thọ Phát
                </Text.Title>
                <Text.Title
                    style={{
                        color: "#333",
                        fontSize: 16,
                        marginBottom: 10,
                        marginTop: 10,
                        lineHeight: 1.5,
                    }}
                >
                    Hãy{" "}
                    <b style={{ color: "#e53935" }}>follow OA Thọ Phát Shop</b>{" "}
                    để không bỏ lỡ những thông báo quan trọng về đơn hàng của
                    bạn qua tin nhắn.
                </Text.Title>
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
                    onClick={handleFollowOA}
                >
                    Follow OA
                </Button>
            </Box>
        </LayoutHomePage>
    );
};

export default FollowOAPage;
