/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { getPhoneNumber, getUserInfo, getAccessToken } from "zmp-sdk/apis";
import { useStore } from "@store";
import LoadingHomePage from "./components/LoadingHomePage";
import FollowOAPage from "./components/FollowOAPage";
import WelcomePage from "./components/WelcomePage";

const NUMBER_PHONE_KEY = "number-phone";

const HomePage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userInfomation, setUserInfomation] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const { numberPhone, setNumberPhone, setUser } = useStore();


    const savePhoneNumber = (phone: string) => {
        setPhoneNumber(phone);
        setNumberPhone(phone);
        localStorage.setItem(NUMBER_PHONE_KEY, phone);
    };

    const removePhoneNumber = () => {
        setPhoneNumber("");
        setNumberPhone("");
        localStorage.removeItem(NUMBER_PHONE_KEY);
    };

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
                savePhoneNumber(result.data.number || "");
            }
        }
    };

    const checkPhonePermission = async () => {
        try {
            const resp = await getPhoneNumber({});
            if (resp?.number) {
                savePhoneNumber(resp.number || "");
                return;
            }
            if (resp?.token) {
                getNumberPhoneByZalo(resp.token);
            } else {
                removePhoneNumber();
            }
        } catch (err) {
            removePhoneNumber();
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
