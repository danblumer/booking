import styled from '@emotion/styled';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const GlobalContentContainer = styled.div`
    display: flex;
    flex: 1;
    max-width: 1024px;
    width: 100%;
`;

export const DefaultPageContentContainer = styled(GlobalContentContainer)`
    display: flex;
    flex: 1;
    flex-direction: column;
    max-width: 1024px;
    width: 100%;
    gap: 15px;
`;