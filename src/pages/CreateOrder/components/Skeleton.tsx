import React from "react";
import { Box } from "zmp-ui";

const shimmerStyle = {
    background: "linear-gradient(90deg, #eee 25%, #f5f5f5 50%, #eee 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.2s infinite linear",
};

const Skeleton: React.FC = () => (
    <>
        <style>
            {`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}
        </style>
        <Box
            style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 24px",
                borderBottom: "1px solid #f0f0f0",
                background: "#fff",
                opacity: 0.8,
            }}
        >
            <div
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: 8,
                    marginRight: 16,
                    ...shimmerStyle,
                }}
            />
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        width: "80%",
                        height: 16,
                        borderRadius: 4,
                        marginBottom: 8,
                        ...shimmerStyle,
                    }}
                />
                <div
                    style={{
                        width: "40%",
                        height: 14,
                        borderRadius: 4,
                        ...shimmerStyle,
                    }}
                />
            </div>
            <div
                style={{
                    minWidth: 48,
                    height: 28,
                    borderRadius: 8,
                    ...shimmerStyle,
                }}
            />
        </Box>
    </>
);

export default Skeleton;
