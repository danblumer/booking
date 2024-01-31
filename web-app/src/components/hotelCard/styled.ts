import styled from '@emotion/styled';
export const CardContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 250px;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    border-radius: 10px;
    margin: 0;
    padding: 15px;
    gap: 10px;
    flex: 1;
`;
export const CardFooter = styled.div`
    display: flex;
    flex: 1;
`;
export const CardContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;
export const CardReviewContent = styled(CardContent)`
    align-items: flex-start;
    justify-content: flex-end;
`;
export const CardPriceContent = styled(CardContent)`
    align-items: flex-end;
`;
