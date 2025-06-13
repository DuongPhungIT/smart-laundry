import OrderList, { Invoice } from "@components/information-order/InformationOrderList";
import PageLayout from "@components/layout/PageLayout";
import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "styled-components/macro";

const mockInvoices: Invoice[] = [
    {
        id: "HD001",
        customerName: "Nguyễn Văn A",
        phoneNumber: "0901234567",
        totalAmount: 1500000,
        createdAt: "2024-06-01T10:00:00Z",
    },
    {
        id: "HD002",
        customerName: "Trần Thị B",
        phoneNumber: "0912345678",
        totalAmount: 2500000,
        createdAt: "2024-06-02T11:30:00Z",
    },
    {
        id: "HD003",
        customerName: "Lê Văn C",
        phoneNumber: "0987654321",
        totalAmount: 3200000,
        createdAt: "2024-06-03T09:15:00Z",
    },
];

const InformationOrderPage: React.FC = () => {
    const listRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setData(mockInvoices);
            setHasMore(false);
            setLoading(false);
        };

        loadData();
    }, []);  

    // Nếu muốn mock load thêm dữ liệu, có thể thêm logic ở đây

    return (
        <PageLayout
            tw="bg-white"
            title="Thông tin - hoá đơn"
            id="informationGuides"
        >
            <InfiniteScroll
                dataLength={data.length}
                next={() => {
                    // Logic để load thêm dữ liệu nếu cần
                    // Ví dụ: setData([...data, ...mockInvoices]);
                }}
                hasMore={hasMore}
                loader={null}
                scrollableTarget="informationGuides"
            >
                <OrderList
                    data={data}
                    ref={listRef}
                    loading={loading}
                />
            </InfiniteScroll>
        </PageLayout>
    );
};

export default InformationOrderPage;
