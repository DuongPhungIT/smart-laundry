/* eslint-disable no-console */
import React, { useEffect, useState } from "react";
import { getPhoneNumber, getUserInfo, getAccessToken } from "zmp-sdk/apis";
import { useStore } from "@store";
import { request } from "@utils/KidoRequest";
import LoadingHomePage from "./components/LoadingHomePage";
import FollowOAPage from "./components/FollowOAPage";
import WelcomePage from "./components/WelcomePage";

const NUMBER_PHONE_KEY = "number-phone";
const SHOP_ID_KEY = "shopId";

const HomePage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userInfomation, setUserInfomation] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const { numberPhone, setNumberPhone, setUser } = useStore();

    const isPhone = localStorage.getItem(NUMBER_PHONE_KEY);

    const savePhoneNumber = (phone: string) => {
        setPhoneNumber(phone);
        setNumberPhone(phone);
        localStorage.setItem(NUMBER_PHONE_KEY, phone);
    };

    const saveShopId = (id: string) => {
        localStorage.setItem(SHOP_ID_KEY, id);
    };

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const user = await getUserInfo({
                avatarType: "normal",
                autoRequestPermission: true,
            });
            const { userInfo } = user;
            console.log('user', user)

            setUser(userInfo);
            setUserInfomation(userInfo);
        } catch (error) {
            console.error("Error fetching user info:", error);
        } finally {
            setLoading(false);
        }
    };

    const submitShopZaloInfo = async body => {
        console.log("body", body);
        try {
            const params = {
                business: "THOPHAT",
            };
            const resp = await request("telesales/submitShopZaloInfo", {
                method: "POST",
                params,
                body: JSON.stringify(body),
            });
            if (resp?.code === 0) {
                saveShopId(resp?.data?.shopId);
            }
        } catch (error) {
            // Log error
        }
    };

    const getShopByPhone = async number => {
        try {
            const params = {
                business: "THOPHAT",
                phone: number,
            };
            console.log("params", params);
            const resp = await request("telesales/getShopByPhone", {
                params,
            });
            if (resp?.code === 0) {
                if (!resp?.data?.isExisted) {
                    const body = {
                        phone: number,
                        uidZalo: userInfomation.id,
                        uidByOAZalo: userInfomation.idByOA,
                    };
                    submitShopZaloInfo(body);
                } else {
                    saveShopId(resp?.data?.shopId);
                }
            }
            console.log("resp", resp);
        } catch (error) {
            // Log error
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
            const number = result?.data?.number;
            if (number) {
                getShopByPhone(number);
                savePhoneNumber(number || "");
            }
        }
    };

    useEffect(() => {
        fetchUserInfo();
        if (isPhone) {
            savePhoneNumber(isPhone);
        }
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
