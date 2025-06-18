import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import "styled-components/macro";
import { Button, Input } from "@components";
import { useForm } from "react-hook-form";
import { useStore } from "@store";

const InfoUserForm: React.FC = () => {
    const [editing, setEditing] = useState(false);
    const [user, numberPhone, setUser, setNumberPhone] = useStore(state => [
        state.user,
        state.numberPhone,
        state.setUser,
        state.setNumberPhone,
    ]) || [{}, "", () => undefined, () => undefined];

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
        if (user || numberPhone) {
            resetEdit({
                name: user?.name || "",
                phone: numberPhone || "",
            });
        }
    }, [user, numberPhone, resetEdit]);

    const onEditSubmit = (data: { name: string; phone: string }) => {
        setUser({ ...user, name: data.name });
        setNumberPhone(data.phone);
        setEditing(false);
    };

    return (
        <div
            style={{
                background: "#f4f7fa",
                minHeight: "100vh",
                padding: "24px 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
            }}
        >
            <Box
                style={{
                    maxWidth: 400,
                    width: "100%",
                    background: "#fff",
                    borderRadius: 18,
                    boxShadow: "0 4px 24px #0002",
                    padding: 28,
                    margin: "0 auto",
                }}
            >
                <Box style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            overflow: "hidden",
                            marginBottom: 16,
                            border: "2px solid #1976d2",
                            background: "#f5f5f5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {user?.avatar ? (
                            <img
                                src={user.avatar}
                                alt="Avatar"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <Text style={{ color: "#bdbdbd" }}>No Avatar</Text>
                        )}
                    </div>
                    <Text.Title style={{ fontWeight: 700, fontSize: 22, marginBottom: 4 }}>
                        {user?.name || "Chưa có tên"}
                    </Text.Title>
                    <Text style={{ color: "#888", marginBottom: 16 }}>
                        ID: {user?.id || "Không có id"}
                    </Text>
                </Box>
                <Box mb={2}>
                    <Text style={{ fontWeight: 500 }}>
                        <span style={{ color: "#1976d2" }}>Số điện thoại:</span>{" "}
                        {numberPhone || "Không có số điện thoại"}
                    </Text>
                </Box>
                <Box mb={2}>
                    <Text>
                        <b>idByOA:</b> {user?.idByOA || "Không có idByOA"}
                    </Text>
                </Box>
                <Box mb={2}>
                    <Text>
                        <b>isSensitive:</b>{" "}
                        {user?.isSensitive !== undefined
                            ? String(user.isSensitive)
                            : "Không có"}
                    </Text>
                </Box>
                <Box mb={2}>
                    <Text>
                        <b>followedOA:</b>{" "}
                        {user?.followedOA !== undefined
                            ? String(user.followedOA)
                            : "Không có"}
                    </Text>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Button
                        size="large"
                        style={{
                            minWidth: 140,
                            borderRadius: 8,
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                        onClick={() => setEditing(true)}
                    >
                        Sửa thông tin
                    </Button>
                </Box>
                {editing && (
                    <Box
                        p={4}
                        style={{
                            background: "#f9f9f9",
                            borderRadius: 12,
                            marginTop: 24,
                            boxShadow: "0 2px 8px #0001",
                        }}
                    >
                        <form onSubmit={handleSubmitEdit(onEditSubmit)}>
                            <Box mb={3}>
                                <Input
                                    label="Họ và tên"
                                    placeholder="Nhập họ và tên"
                                    {...registerEdit("name", { required: true })}
                                    errorText={
                                        errorsEdit.name ? "Không được để trống" : ""
                                    }
                                />
                            </Box>
                            <Box mb={3}>
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
                            <Box style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                                <Button
                                    htmlType="submit"
                                    size="small"
                                    style={{ minWidth: 80 }}
                                >
                                    Lưu
                                </Button>
                                <Button
                                    size="small"
                                    style={{
                                        background: "#eee",
                                        color: "#333",
                                        minWidth: 80,
                                    }}
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
            </Box>
        </div>
    );
};

export default InfoUserForm;
