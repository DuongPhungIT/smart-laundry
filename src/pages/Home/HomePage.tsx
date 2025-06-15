import React from "react";
import { HomeHeader, Utinities } from "@components";
import PageLayout from "@components/layout/PageLayout";
import { APP_UTINITIES } from "@constants/utinities";
import { useStore } from "@store";

const HomePage: React.FunctionComponent = () => {
    const [organization] = useStore(state => [
        state.organization,
        state.getOrganization,
    ]);
    console.log('organization', organization);

    return (
        <PageLayout
            id="home-page"
            customHeader={
                <HomeHeader
                    title="Thọ Phát"
                />
            }
        >
            <Utinities utinities={APP_UTINITIES} />
        </PageLayout>
    );
};

export default HomePage;
