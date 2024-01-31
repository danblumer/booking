import styled from '@emotion/styled';

const baseStyle = {
  fontSize: '14px', 
  fontWeight: 'bold',
  color: '#333',
  fontFamily: 'Arial, sans-serif',
};

export const HeaderContainer = styled.div`
    display: flex;
    height: 80px;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    justify-content: center;
    margin-bottom: 10px;
    align-items: flex-end;
`;
export const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  > img {
    height: 50px;
    width: 50px;
  }
  margin: 0;
`;

export const Menu = styled.ul`
  ${baseStyle};
  display: flex;
  list-style: none;
  align-items: flex-end;
  margin: 0;
  margin-bottom: 2px;
`;

export const MenuItem = styled.li`
 ${baseStyle};
  margin-right: 16px;
  cursor: pointer;
  color: #333;
  
  &:hover {
    text-decoration: underline;
  }
`;