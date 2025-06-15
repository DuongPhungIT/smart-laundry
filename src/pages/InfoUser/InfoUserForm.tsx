import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import "styled-components/macro";
import { Button, Input } from "@components";
import { useForm } from "react-hook-form";
import { getPhoneNumber, getUserInfo } from "zmp-sdk/apis";

const InfoUserForm: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userInfomation, setUserInfomation] = useState<any>();
    const [editing, setEditing] = useState(false);

    const {
        register: registerEdit,
        handleSubmit: handleSubmitEdit,
        formState: { errors: errorsEdit },
        reset: resetEdit,
    } = useForm({
        defaultValues: {
            name: "",
            phone: "",
        },
    });

    useEffect(() => {
        const fetchPhoneNumber = async () => {
            try {
                const resp = await getPhoneNumber({});
                if (resp && resp.number) {
                    setPhoneNumber(resp.number);
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
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        fetchUserInfo();
    }, []);

    useEffect(() => {
        if (userInfomation) {
            resetEdit({
                name: userInfomation?.name || "",
                phone: phoneNumber || "",
            });
        }
    }, [userInfomation, phoneNumber, resetEdit]);

    const onEditSubmit = (data: { name: string; phone: string }) => {
        setUserInfomation((prev: any) => ({
            ...prev,
            name: data.name,
        }));
        setPhoneNumber(data.phone);
        setEditing(false);
    };

    return (
        <div
            style={{ backgroundColor: "#f5f5f5", margin: 20, borderRadius: 8 }}
        >
            <Box p={4} tw="bg-white">
                <Box>
                    <Text style={{ fontWeight: 500 }}>
                        Avatar:{" "}
                        {userInfomation?.avatar ? (
                            <img
                                src={userInfomation.avatar}
                                alt="Avatar"
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: "50%",
                                }}
                            />
                        ) : (
                            "Không có avatar"
                        )}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        Id: {userInfomation?.id || "Không có id"}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        Họ và tên: {userInfomation?.name || "Không có tên"}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        idByOA: {userInfomation?.idByOA || "Không có idByOA"}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        isSensitive:{" "}
                        {userInfomation?.isSensitive !== undefined
                            ? String(userInfomation.isSensitive)
                            : "Không có isSensitive"}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        followedOA:{" "}
                        {userInfomation?.followedOA !== undefined
                            ? String(userInfomation.followedOA)
                            : "Không có followedOA"}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Text style={{ fontWeight: 500 }}>
                        Số điện thoại: {phoneNumber || "Không có số điện thoại"}
                    </Text>
                </Box>
                <Box mt={2}>
                    <Button size="small" onClick={() => setEditing(true)}>
                        Sửa thông tin
                    </Button>
                </Box>
            </Box>

            {editing && (
                <Box p={4} tw="bg-white border-t border-gray-200">
                    <form
                        onSubmit={handleSubmitEdit(onEditSubmit)}
                        style={{ marginTop: 12 }}
                    >
                        <Box>
                            <Input
                                label="Họ và tên"
                                placeholder="Nhập họ và tên"
                                {...registerEdit("name", { required: true })}
                                errorText={
                                    errorsEdit.name ? "Không được để trống" : ""
                                }
                            />
                        </Box>
                        <Box mt={4}>
                            <Input
                                label="Số điện thoại"
                                placeholder="Nhập số điện thoại"
                                {...registerEdit("phone", { required: true })}
                                errorText={
                                    errorsEdit.phone
                                        ? "Không được để trống"
                                        : ""
                                }
                            />
                        </Box>
                        <Box mt={4} style={{ display: "flex", gap: 8 }}>
                            <Button htmlType="submit" size="small">
                                Lưu
                            </Button>
                            <Button
                                size="small"
                                onClick={e => {
                                    e.preventDefault();
                                    setEditing(false);
                                }}
                            >
                                Hủy
                            </Button>
                        </Box>
                    </form>
                </Box>
            )}
        </div>
    );
};

export default InfoUserForm;
