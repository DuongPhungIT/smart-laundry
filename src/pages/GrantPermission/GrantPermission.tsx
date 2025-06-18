import React, { useEffect, useState } from "react";
import PageLayout from "@components/layout/PageLayout";
import Logo from "@assets/logo.png";

import { HomeHeader, Utinities } from "@components";
import { Spinner, Button, Box, Text, Icon } from "zmp-ui";
import { getPhoneNumber, getUserInfo, getAccessToken } from "zmp-sdk/apis";
import { APP_UTINITIES } from "@constants/utinities";
import { useStore } from "@store";
import { followOA } from "zmp-sdk";

const GrantPermissionPage: React.FunctionComponent = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userInfomation, setUserInfomation] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const { numberPhone, setNumberPhone, setUser } = useStore();

    useEffect(() => {
        setLoading(true);
        const fetchUserInfo = async () => {
            try {
                const user = await getUserInfo({
                    avatarType: "normal",
                    autoRequestPermission: true,
                });
                const { userInfo } = user;
                setUser(userInfo);
                setUserInfomation(userInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    const handleGetPhoneNumber = async () => {
        setLoading(true);
        try {
            const resp = await getPhoneNumber({});
            const userAccessToken =
                (await getAccessToken({})) || "ACCESS_TOKEN";
            const secretKey = "5NDKWi8Fo48B23hDAl1L";

            if (resp?.token) {
                // Gọi trực tiếp Zalo API để lấy số điện thoại
                const zaloResp = await fetch(
                    "https://graph.zalo.me/v2.0/me/info",
                    {
                        method: "GET",
                        headers: {
                            access_token: userAccessToken,
                            code: resp.token,
                            secret_key: secretKey,
                        },
                    },
                );
                const result = await zaloResp.json();
                if (result?.data?.number) {
                    setPhoneNumber(result.data.number);
                    setNumberPhone(result.data.number || "");
                }
            } else if (resp?.number) {
                setPhoneNumber(resp.number);
            } else {
                console.log(
                    "Bạn cần cấp quyền truy cập số điện thoại cho OA để sử dụng chức năng này.",
                );
            }
        } catch (error) {
            console.error("Lỗi khi lấy số điện thoại:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollowOA = async () => {
        try {
            await followOA({
                id: "1763339190618924040", // ID của OA cần theo dõi
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PageLayout
            id="grant-permission-page"
            customHeader={<HomeHeader title="Thọ Phát GrantPermissionPage" />}
        >
            {loading ? (
                <Box
                    style={{
                        height: "calc(100vh - 75px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "transparent",
                    }}
                >
                    <Box
                        style={{
                            maxWidth: 400,
                            borderRadius: 16,
                            padding: 24,
                            textAlign: "center",
                        }}
                    >
                        <Spinner
                            logo={
                                <img
                                    src={Logo}
                                    alt="thophat"
                                    style={{ borderRadius: "50%" }}
                                />
                            }
                        />
                    </Box>
                </Box>
            ) : (
                <>
                    {phoneNumber || numberPhone ? (
                        <>
                            <Utinities utinities={APP_UTINITIES} />
                            <Box
                                style={{
                                    maxWidth: 400,
                                    margin: "40px auto",
                                    background: "#fff",
                                    borderRadius: 16,
                                    boxShadow: "0 2px 8px #0001",
                                    padding: 24,
                                    textAlign: "center",
                                }}
                            >
                                <Button
                                    size="large"
                                    style={{
                                        width: "100%",
                                        background: "#1976d2",
                                        color: "#fff",
                                        fontWeight: 600,
                                    }}
                                    onClick={() => {
                                        handleFollowOA();
                                    }}
                                >
                                    Follow OA
                                </Button>
                            </Box>
                        </>
                    ) : (
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
                                Chào mừng bạn đến với ZaUI KIDO Shop!
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
                                    <Text>
                                        Nhận thông tin thay đổi trạng thái
                                    </Text>
                                </Box>
                                <Box flex alignItems="center" mb={1}>
                                    <Icon
                                        icon="zi-location"
                                        style={{
                                            marginRight: 8,
                                            color: "#1976d2",
                                        }}
                                    />
                                    <Text>
                                        Xem hành trình giao hàng trực tiếp
                                    </Text>
                                </Box>
                            </Box>
                            <Text
                                style={{
                                    display: "block",
                                    margin: "16px 0 24px 0",
                                    color: "#333",
                                }}
                            >
                                Vui lòng đồng ý chia sẻ số điện thoại để liên
                                kết với tài khoản của bạn trên hệ thống ZaUI
                                KIDO Shop
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
                            >
                                Từ chối và Thoát
                            </Button>
                        </Box>
                    )}{" "}
                </>
            )}
        </PageLayout>
    );
};

export default GrantPermissionPage;
