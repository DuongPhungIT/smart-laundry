import React from "react";
import Logo from "@assets/logo.png";
import { Spinner, Box } from "zmp-ui";

import LayoutHomePage from "./LayoutHomePage";

const LoadingHomePage: React.FC = () => (
    <LayoutHomePage>
        <Box
            style={{
                height: "calc(100vh - 75px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
            }}
        >
            <Box
                style={{
                    maxWidth: 400,
                    borderRadius: 16,
                    padding: 24,
                    textAlign: "center",
                }}
            >
                <Spinner
                    logo={
                        <img
                            src={Logo}
                            alt="thophat"
                            style={{ borderRadius: "50%" }}
                        />
                    }
                />
            </Box>
        </Box>
    </LayoutHomePage>
);

export default LoadingHomePage;
