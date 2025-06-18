
import React from "react";
import PageLayout from "@components/layout/PageLayout";

import { HomeHeader } from "@components";

interface LayoutHomePageProps {
    children: React.ReactNode;
}

const LayoutHomePage: React.FC<LayoutHomePageProps> = props => {
    const { children } = props;
    return (
        <PageLayout
            id="grant-permission-page"
            customHeader={<HomeHeader title="Thọ Phát" />}
        >
            {children}
        </PageLayout>
    );
};

export default LayoutHomePage;
