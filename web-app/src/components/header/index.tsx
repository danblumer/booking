import React from "react";
import { HeaderContainer, Logo, Menu, MenuItem } from "./styled";
import { useNavigate } from "react-router-dom";
import { GlobalContentContainer } from "../container/styled";

import hotelLogo from "../../assets/png/hotel.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <GlobalContentContainer>
        <Logo>
          <img src={hotelLogo} alt="Hotel Logo" />
        </Logo>
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
