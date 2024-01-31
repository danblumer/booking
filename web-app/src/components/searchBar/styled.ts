import styled from '@emotion/styled';
import Grid from "@mui/material/Grid";

export const StyledGrid = styled(Grid)`
    background: #fff;
    align-items: center;
    margin: 0;
    width: 100%;
    padding-right: 15px;
    padding-bottom: 15px;
    border-radius: 15px;
`;

export const ErrorMessageContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 0;
    width: 100%;
    > label {
        font-size: 14px;
        color: #ff0000;
        font-weight: 600;
    }
`;
