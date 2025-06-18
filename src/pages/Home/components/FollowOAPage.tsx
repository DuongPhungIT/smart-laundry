/* eslint-disable no-console */
import React from "react";
import { followOA } from "zmp-sdk";
import { Utinities } from "@components";
import { Button, Box } from "zmp-ui";
import { APP_UTINITIES } from "@constants/utinities";
import LayoutHomePage from "./LayoutHomePage";

const OA_ID = "1763339190618924040";

const FollowOAPage: React.FC = () => {

    const handleFollowOA = async () => {
        try {
            await followOA({ id: OA_ID });
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <LayoutHomePage>
            <Utinities utinities={APP_UTINITIES} />
            <Box
                style={{
                    maxWidth: 400,
                    margin: "40px auto",
                    background: "#fff",
                    borderRadius: 16,
                    boxShadow: "0 2px 8px #0001",
                    padding: 24,
                    textAlign: "center",
                }}
            >
                <Button
                    size="large"
                    style={{
                        width: "100%",
                        background: "#1976d2",
                        color: "#fff",
                        fontWeight: 600,
                    }}
                    onClick={() => {
                        handleFollowOA();
                    }}
                >
                    Follow OA
                </Button>
            </Box>
        </LayoutHomePage>
    );
};

export default FollowOAPage;
