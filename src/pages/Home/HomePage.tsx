/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { getPhoneNumber, getUserInfo, getAccessToken } from "zmp-sdk/apis";
import { useStore } from "@store";
import LoadingHomePage from "./components/LoadingHomePage";
import FollowOAPage from "./components/FollowOAPage";
import WelcomePage from "./components/WelcomePage";

const HomePage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userInfomation, setUserInfomation] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const { numberPhone, setNumberPhone, setUser } = useStore();

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
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

    const getNumberPhoneByZalo = async token => {
        const userAccessToken = (await getAccessToken({})) || "ACCESS_TOKEN";
        const secretKey = "5NDKWi8Fo48B23hDAl1L";

        if (token) {
            const zaloResp = await fetch("https://graph.zalo.me/v2.0/me/info", {
                method: "GET",
                headers: {
                    access_token: userAccessToken,
                    code: token,
                    secret_key: secretKey,
                },
            });
            const result = await zaloResp.json();
            if (result?.data?.number) {
                setPhoneNumber(result.data.number);
                setNumberPhone(result.data.number || "");
                localStorage.setItem("number-phone", result.data.number || "");
            }
        }
    };

    const checkPhonePermission = async () => {
        try {
            const resp = await getPhoneNumber({});
            if (resp?.number) {
                setPhoneNumber(resp.number);
                setNumberPhone(resp.number);
                localStorage.setItem("number-phone", resp.number);
                return;
            }
            if (resp?.token) {
                getNumberPhoneByZalo(resp.token);
            } else {
                localStorage.removeItem("number-phone");
                setPhoneNumber("");
                setNumberPhone("");
            }
        } catch (err) {
            localStorage.removeItem("number-phone");
            setPhoneNumber("");
            setNumberPhone("");
        }
    };

    useEffect(() => {
        fetchUserInfo();
        checkPhonePermission();
    }, []);

    const handleGetPhoneNumber = async () => {
        try {
            setLoading(true);
            const resp = await getPhoneNumber({});
            if (resp?.token) {
                getNumberPhoneByZalo(resp.token);
            } else if (resp?.number) {
                setPhoneNumber(resp.number);
                setNumberPhone(resp.number);
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

    if (loading) {
        return <LoadingHomePage />;
    }

    if (phoneNumber || numberPhone) {
        return <FollowOAPage />;
    }

    return (
        <WelcomePage
            handleGetPhoneNumber={handleGetPhoneNumber}
            userInfomation={userInfomation}
        />
    );
};

export default HomePage;
