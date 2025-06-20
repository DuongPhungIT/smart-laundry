import React, { FunctionComponent } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import UtinityItem, { UtinityItemProps } from "./UtilityItem";

interface UtinitiesProps {
    utinities: UtinityItemProps & { key: string }[];
}

const UtinitiesWrapper = styled.div`
    ${tw`flex flex-row flex-wrap justify-between bg-ui_bg bg-center bg-no-repeat`};
    padding: 16px;
    margin-top: 150px;
    background: none;
`;

const Utinities: FunctionComponent<UtinitiesProps> = props => {
    const { utinities } = props;
    return (
        <UtinitiesWrapper>
            {utinities.map(item => {
                const { key, ...utinity } = item;
                return <UtinityItem key={key} {...utinity} />;
            })}
        </UtinitiesWrapper>
    );
};

export default Utinities;
