import styled from '@emotion/styled';
import { Form } from "formik";
export const CheckoutFormContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    height: 250px;
    align-items: center;
    background-color: #fff;
    margin: 0;
    padding: 15px;
    flex: 1;
    flex-direction: column;
`;
export const CheckoutStyledForm = styled(Form)`
    display: flex;
    margin: 0;
    flex: 1;
    width: 100%;
    flex-direction: column;
    gap: 10px;
`;
export const PriceContainer = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
`;