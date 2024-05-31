import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SideBarData } from "./SideBarData";
import SubMenu from "./SubMenu";
import user from "../Components/images/user1.png";
import "./SideBar.css";
import logout from "../Components/images/logout.png";

const Nav = styled.div`
  background: #5356FF;
  height: 60px;
  display: flex;
  justify-content: space-between; /* Align items to both ends */
  align-items: center;
  padding: 0 2rem;
`;

const NavIcon = styled(Link)`
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;

  &:hover {
    color: black;
  }
`;

const SidebarNav = styled.nav`
  background: #5356FF;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;

  @media (max-width: 768px) {
    width: 200px;
  }

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const MainContent = styled.div`
  padding-left: ${({ isOpen }) => (isOpen ? "250px" : "0")};
  transition: 350ms;
  width: 100%;
`;

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef();
  const imgRef = useRef();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target !== menuRef.current && e.target !== imgRef.current) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Nav>
        <NavIcon to="#">
          <FaIcons.FaBars onClick={toggleSidebar} />
        </NavIcon>
        <h1
          style={{
            textAlign: "center",
            color: "white",
          }}
        >
          Reception Management System
        </h1>
        <img
          className="user"
          src={user}
          alt="user"
          ref={imgRef}
          onClick={toggleDropdown}
        />
        {showDropdown && (
          <div ref={menuRef} className="dropdown">
            <ul>
              <li onClick={handleLogout}>
                <img className="logout-icon" src={logout} alt="Logout Icon" />
                Logout
              </li>
            </ul>
          </div>
        )}
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
      <MainContent isOpen={isOpen}>
        {/* Your widgets and other content go here */}
      </MainContent>
    </>
  );
};

export default Sidebar;
