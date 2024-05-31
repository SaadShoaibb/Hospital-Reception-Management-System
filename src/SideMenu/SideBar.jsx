import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons";

const Nav = styled.div`
  background: #5356FF;
  height: 60px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #378CE7;
  width: 250px; /* Base width for sidebar */
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")}; /* Toggle position */
  transition: 350ms;
  z-index: 10;

  @media (max-width: 768px) {
    width: 200px; /* Adjust width for smaller screens */
  }

  @media (max-width: 480px) {
    width: 150px; /* Adjust width for even smaller screens */
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const MainContent = styled.div`
  /* Add this section */
  padding-left: ${({ isOpen }) => (isOpen ? "250px" : "0")}; /* Adjust padding based on sidebar state */
  transition: 350ms;
  width: 100%; /* Consider adding a width for responsiveness */
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={toggleSidebar} />
          </NavIcon>
          <h1
            style={{
              textAlign: "center",
              marginLeft: "500px",
              color: "white",
            }}
          >
            Billing Management System
          </h1>
        </Nav>
        <SidebarNav isOpen={isOpen}>
          <SidebarWrap>
            <NavIcon to="#">
              <AiIcons.AiOutlineClose onClick={toggleSidebar} />
            </NavIcon>
            {SideBarData.map((item, index) => (
              <SubMenu item={item} key={index} />
            ))}
          </SidebarWrap>
        </SidebarNav>
        {/* Wrap your main content area here */}
        <MainContent isOpen={isOpen}>
          {/* Your widgets and other content go here */}
        </MainContent>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
