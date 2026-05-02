import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

// Стили для навбара
const Nav = styled.nav`
    display: flex;
    flex-direction: column; /* Выстраиваем элементы вертикально */
    background-color: #4790b6;
    padding: 20px;
`;

const StyledNavLink = styled(NavLink)`
    color: whitesmoke;
    text-decoration: none;
    margin: 10px 0; /* Фиксированный отступ между кнопками */
    padding: 5px 0; /* Паддинг для улучшения кликабельности */

    &.active {
        color: gold;
    }

    &:hover {
        color: lightgoldenrodyellow;
    }
`;

// Компонент NavBar
export const NavBar = () => {
    return (
        <Nav>
            <StyledNavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                Profile
            </StyledNavLink>
            <StyledNavLink to="/dialog" className={({ isActive }) => (isActive ? "active" : "")}>
                Friends
            </StyledNavLink>
            <StyledNavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
                Users
            </StyledNavLink>
            <StyledNavLink to="/news" className={({ isActive }) => (isActive ? "active" : "")}>
                News
            </StyledNavLink>
            <StyledNavLink to="/music" className={({ isActive }) => (isActive ? "active" : "")}>
                Music
            </StyledNavLink>
            <StyledNavLink to="/setting" className={({ isActive }) => (isActive ? "active" : "")}>
                Settings
            </StyledNavLink>
        </Nav>
    );
};
