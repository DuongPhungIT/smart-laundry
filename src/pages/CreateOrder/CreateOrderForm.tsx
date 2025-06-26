import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import "styled-components/macro";
import ProductDefault from "@assets/product.png";
import { ProductOrderItem } from "@types";
import { request } from "@utils/KidoRequest";
import LoadingCreateOrderPage from "./components/LoadingCreateOrderPage";

const SHOP_ID_KEY = "shopId";

const CreateOrderForm: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductOrderItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const shopId = localStorage.getItem(SHOP_ID_KEY)

    useEffect(() => {
        const getSuggestionOrders = async () => {
            try {
                const params = {
                    business: "THOPHAT",
                    shopId,
                };
                const resp = await request("telesales/getSuggestionOrders", {
                    params,
                });
                if (resp?.code === 0) {
                    const data = resp?.data;
                    const listProduct = data.items;
                    const total = data.totalAmount;
                    setProducts(listProduct);
                    setTotalAmount(total);
                }
            } catch (error) {
                // Handle error appropriately (e.g., show notification)
            } finally {
                setLoading(false);
            }
        };
        getSuggestionOrders();
    }, []);

    if (loading) {
        return <LoadingCreateOrderPage />;
    }

    return (
        <Box
            style={{
                background: "#f4f7fa",
                margin: "24px auto",
                borderRadius: 16,
                maxWidth: 420,
                boxShadow: "0 2px 12px #0001",
                padding: 0,
                paddingBottom: 110,
            }}
        >

            <Box
                style={{
                    background: "#fff",
                    padding: "0 0 0 0",
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    borderBottom: "1px solid #f0f0f0",
                }}
            >
                <Box
                    style={{
                        borderBottom: "8px solid #f4f7fa",
                        padding: "16px 0 0 0",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 700,
                            fontSize: 22,
                            marginLeft: 24,
                            marginBottom: 8,
                        }}
                    >
                        Danh sách sản phẩm
                    </Text>
                    {loading || products.length === 0
                        ? Array.from({ length: 5 }).map((_, idx) => (
                              <Box
                                  key={Number(idx)}
                                  style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "16px 24px",
                                      borderBottom: "1px solid #f0f0f0",
                                      background: "#fff",
                                      opacity: 0.6,
                                  }}
                              >
                                  <div
                                      style={{
                                          width: 56,
                                          height: 56,
                                          borderRadius: 8,
                                          background: "#eee",
                                          marginRight: 16,
                                      }}
                                  />
                                  <div style={{ flex: 1 }}>
                                      <div
                                          style={{
                                              width: "80%",
                                              height: 16,
                                              background: "#eee",
                                              borderRadius: 4,
                                              marginBottom: 8,
                                          }}
                                      />
                                      <div
                                          style={{
                                              width: "40%",
                                              height: 14,
                                              background: "#f3eaea",
                                              borderRadius: 4,
                                          }}
                                      />
                                  </div>
                                  <div
                                      style={{
                                          minWidth: 48,
                                          height: 28,
                                          background: "#f5f6fa",
                                          borderRadius: 8,
                                      }}
                                  />
                              </Box>
                          ))
                        : products.map((item, idx) => (
                              <Box
                                  key={item.sap}
                                  style={{
                                      display: "flex",
                                      alignItems: "center",
                                      padding: "16px 24px",
                                      borderBottom:
                                          idx !== products.length - 1
                                              ? "1px solid #f0f0f0"
                                              : "none",
                                      background: "#fff",
                                  }}
                              >
                                  <img
                                      src={item.image}
                                      alt={item.sap}
                                      style={{
                                          width: 56,
                                          height: 56,
                                          borderRadius: 8,
                                          objectFit: "cover",
                                          marginRight: 16,
                                          border: "1px solid #eee",
                                      }}
                                      onError={e => {
                                          const target =
                                              e.target as HTMLImageElement;
                                          target.onerror = null;
                                          target.src = ProductDefault;
                                      }}
                                  />
                                  <div style={{ flex: 1 }}>
                                      <Text
                                          style={{
                                              fontWeight: 700,
                                              fontSize: 15,
                                              marginBottom: 2,
                                          }}
                                      >
                                          {item.name}
                                      </Text>
                                      <Text
                                          style={{
                                              color: "#e53935",
                                              fontWeight: 600,
                                              fontSize: 15,
                                          }}
                                      >
                                          Gói {item.price?.toLocaleString()} Đ
                                      </Text>
                                  </div>
                                  <div
                                      style={{
                                          minWidth: 48,
                                          background: "#f5f6fa",
                                          borderRadius: 8,
                                          fontWeight: 700,
                                          fontSize: 18,
                                          color: "#333",
                                          textAlign: "center",
                                          padding: "6px 0",
                                      }}
                                  >
                                      {item.quantity}
                                  </div>
                              </Box>
                          ))}
                </Box>
            </Box>

            <Box
                style={{
                    background: "#fff",
                    borderRadius: 0,
                    borderTop: "2px solid #f4f7fa",
                    padding: "18px 24px 8px 24px",
                    position: "fixed",
                    left: "50%",
                    bottom: 0,
                    transform: "translateX(-50%)",
                    width: "100%",
                    maxWidth: 420,
                    boxShadow: "0 -2px 12px #0001",
                    zIndex: 100,
                }}
            >
                <Text
                    style={{
                        fontWeight: 700,
                        fontSize: 16,
                        marginBottom: 12,
                    }}
                >
                    Chi tiết thanh toán
                </Text>
                <Box
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                        borderTop: "2px solid #f4f7fa",
                        paddingTop: 10,
                    }}
                >
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Tổng tiền tạm tính
                    </Text>
                    <Text
                        style={{
                            fontWeight: 700,
                            fontSize: 18,
                            color: "#e53935",
                        }}
                    >
                        {totalAmount?.toLocaleString()} Đ
                    </Text>
                </Box>
                <Text style={{ color: "#888", fontSize: 13, marginTop: 2 }}>
                    Giá trên đã bao gồm thuế VAT
                </Text>
            </Box>
        </Box>
    );
};

export default CreateOrderForm;
