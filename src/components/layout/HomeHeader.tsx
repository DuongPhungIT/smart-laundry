import React, { FC } from "react";
import { Box } from "zmp-ui";
import styled from "styled-components";
import tw from "twin.macro";
import Logo from "@assets/logo.png";
import TextItemSkeleton from "@components/skeleton/TextSketeton";
import { useStore } from "@store";
import Background from "@assets/header-background.png";

export interface HomeHeaderProps {
    title: string;
    name: string;
}

const HeaderContainer = styled.div`
    ${tw`flex flex-row bg-main items-center fixed top-0 left-0 w-full px-4 h-[calc(48px + var(--zaui-safe-area-inset-top, 0px))]`};
    padding-top: var(--zaui-safe-area-inset-top);
    z-index: 1;
    background: linear-gradient(
            0deg,
            #cecece95,
            #7ed95795
        ),
        url(${Background});
    background-size: cover;
    height: 100px;
    color: #173553;
    background-position: center;
`;

const Title = styled.div`
    ${tw`text-base font-medium`}
    color: #173553;
    font-weight: 600;
    line-height: 24px;
    font-size: 20px;
`;

const LogoWrapper = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
    margin-right: 8px;
    background: #ffffff;
    border-radius: 50%;
`;

const StyledText = styled.div`
    ${tw`text-wth_a70 text-xs`}
    min-height: 16px;
    font-weight: 500;
    color: #173553
`;
const HomeHeader: FC<HomeHeaderProps> = props => {
    const { title, name } = props;
    const loading = useStore(state => state.gettingOrganization);
    return (
        <HeaderContainer>
            <LogoWrapper>
                <img src={Logo} alt={title} />
            </LogoWrapper>
            <Box flex flexDirection="column">
                <Title>{title}</Title>
                {loading ? (
                    <TextItemSkeleton
                        color="rgba(255,255,255,0.2)"
                        height={16}
                        width={180}
                    />
                ) : (
                    <StyledText>{name}</StyledText>
                )}
            </Box>
        </HeaderContainer>
    );
};

export default HomeHeader;
