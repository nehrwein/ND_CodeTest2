import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'
import { LegoContext } from '../context/LegoContext';

const NavBar = () => {
  const { setChosenSet, setChosenTheme } = useContext(LegoContext)

  const onNavigate = () => {
    setChosenTheme('')
    setChosenSet({})
  }

  return (
    <Header>
      <Link to="/" onClick={onNavigate}>Home</Link>
    </Header>
  )
}

export default NavBar

const Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 60px;
  background-color: rgb(21, 20, 16);
  padding-left: 20px;
`

const Link = styled(NavLink)`
  color: whitesmoke;
  font-size: 25px;
  text-decoration: none;
`