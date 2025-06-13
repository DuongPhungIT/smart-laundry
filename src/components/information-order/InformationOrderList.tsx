/* eslint-disable no-nested-ternary */
import EmptyDataContainer from "@components/common/EmptyDataContainer";
import InformationGuideItemSkeleton from "@components/skeleton/InformationGuideItemSkeleton";
import React, { useEffect } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { getPhoneNumber, getUserInfo } from "zmp-sdk/apis";


// Định nghĩa kiểu dữ liệu hóa đơn
export interface Invoice {
    id: string;
    customerName: string;
    phoneNumber: string;
    totalAmount: number;
    createdAt: string; // ISO date string
}

export interface OrderListProps {
    data: Invoice[];
    loading?: boolean;
}

const Wrapper = styled.div`
    ${tw`bg-ui_bg`};
`;

const EmptyWrapper = styled.div`
    ${tw`h-[94vh]`}
`;

const Title = styled.div`
    ${tw`p-4 font-semibold`};
    color: #173553;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 16px;
    background-color: #f5f5f5;
`;

const Info = styled.div`
    ${tw`text-[15px] font-normal font-semibold ml-4 mb-2`};
    color: #173553;
    margin-bottom: 8px;
`;

const InfoItem = styled.div`
    ${tw`text-[15px] font-normal font-semibold ml-4 mb-4 mr-4`};
    color: #173553;
    margin-bottom: 16px;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #f4f2f7;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &:not(:last-child) {
        margin-bottom: 16px;
    }
    & > b {
        color: #0d6efd;
        font-weight: 600;
    }
`;

const InvoiceItem = ({ invoice }: { invoice: Invoice }) => (
    <InfoItem>
        <div>
            <strong>Mã hóa đơn:</strong>{" "}
            <span style={{ color: "red" }}>{invoice.id}</span>
        </div>
        <div>
            <strong>Khách hàng:</strong> {invoice.customerName}
        </div>
        <div>
            <strong>Số điện thoại:</strong> {invoice.phoneNumber}
        </div>
        <div>
            <strong>Tổng tiền:</strong> {invoice.totalAmount.toLocaleString()} đ
        </div>
        <div>
            <strong>Ngày tạo:</strong>{" "}
            {new Date(invoice.createdAt).toLocaleDateString()}
        </div>
    </InfoItem>
);

const OrderList = React.forwardRef<HTMLDivElement, OrderListProps>(
    (props, ref) => {
        const { data, loading = true } = props;
        const [numberPhone, setPhoneNumber] = React.useState<string | null>(
            null,
        );
        const [info, setUserInfo] = React.useState<any>(null);

        useEffect(() => {
            const fetchPhoneNumber = async () => {
                try {
                    const resp = await getPhoneNumber({});
                    console.log("response", resp);
                    // Kiểm tra nếu response hợp lệ và có trường number
                    if (resp && resp.number) {
                        setPhoneNumber(resp.number);
                        // Do something with the phone number if needed
                        console.log("Phone Number:", resp.number, resp);
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
                    setUserInfo(userInfo);
                    console.log("User Info:", userInfo);
                    console.log("User ===:", user);
                    // Do something with the user info if needed
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            };
            fetchUserInfo();
        }, []);

        return (
            <Wrapper id="invoices" ref={ref}>
                <Title>Danh sách hóa đơn</Title>
                <Info>
                    Nhân viên: <b>{info?.name || info?.id || ''}</b>
                </Info>
                <Info>
                    Số điện thoại: <b>{numberPhone || "-"}</b>
                </Info>
                {data.map((invoice, index) => (
                    <InvoiceItem
                        invoice={invoice}
                        key={`invoice-${invoice.phoneNumber}-${index}`}
                    />
                ))}
                {loading ? (
                    [...Array(5)].map((_, index) => (
                        <InformationGuideItemSkeleton
                            key={`invoice-skeleton-${index}`}
                        />
                    ))
                ) : data.length === 0 ? (
                    <EmptyWrapper>
                        <EmptyDataContainer />
                    </EmptyWrapper>
                ) : null}
            </Wrapper>
        );
    },
);

export default OrderList;
