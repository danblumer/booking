import React from "react";
import { HeaderContainer, Logo, Menu, MenuItem } from "./styled";
import { useNavigate } from "react-router-dom";
import { GlobalContentContainer } from "../container/styled";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <GlobalContentContainer>
        <Logo>Logo</Logo>
        <Menu>
          <MenuItem onClick={() => navigate("/")}>Hotels</MenuItem>
          <MenuItem onClick={() => navigate("/mybooking")}>
            My Reservations
          </MenuItem>
        </Menu>
      </GlobalContentContainer>
    </HeaderContainer>
  );
};

export default Header;
