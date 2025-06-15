import React, { FC } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "@assets/logo.png";

export interface HomeHeaderProps {
    title: string;
}

const HeaderContainer = styled.div`
    ${tw`flex bg-main items-center fixed top-0 left-0 w-full px-4 h-[calc(48px + var(--zaui-safe-area-inset-top, 0px))]`};
    padding-top: var(--zaui-safe-area-inset-top);
    z-index: 1;
    background: red;
    background-size: cover;
    height: 170px;
    border-radius: 0 0 40% 40%;
    flex-direction: column;
    color: #173553;
    background-position: center;
`;

const LogoWrapper = styled.div`
    width: 150px;
    height: 150px;
    position: relative;
    margin-right: 8px;
    background: #ffffff;
    border-radius: 50%;
    margin-top: 60px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const HomeHeader: FC<HomeHeaderProps> = props => {
    const { title } = props;
    return (
        <HeaderContainer>
            <LogoWrapper>
                <img src={Logo} alt={title} style={{ borderRadius: "50%" }} />
            </LogoWrapper>
        </HeaderContainer>
    );
};

export default HomeHeader;
