import styled from '@emotion/styled';

export const HeaderContainer = styled.div`
    display: flex;
    height: 80px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    justify-content: center;
    margin-bottom: 10px;
`;
export const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export const Menu = styled.ul`
  display: flex;
  list-style: none;
`;

export const MenuItem = styled.li`
  margin-right: 16px;
  cursor: pointer;
  color: #333;
  &:hover {
    text-decoration: underline;
  }
`;