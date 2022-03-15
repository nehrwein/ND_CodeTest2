import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { LegoContext } from '../context/LegoContext';
import { API_URL } from '../utils/urls'

const Overview = () => {
  const { chosenTheme, setChosenTheme } = React.useContext(LegoContext)
  const [themes, setThemes] = useState([])
  const navigate = useNavigate()

  // fetch all the available lego-themes
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'key cef91563c41612c871ed256c1a22e628'
      }
    }

    fetch(API_URL('themes/?page_size=1000'), options)
      .then((res) => res.json())
      .then((data) => {
        setThemes(data.results)
      })
  }, [])

  const onChoosingTheme = (value) => {
    setChosenTheme(value)
    navigate(`/sets/${value}`)
  }

  return (
    <div>
      <h1>Lego-Sets</h1>
      <ThemeSelect
        value={chosenTheme}
        onChange={(e) => onChoosingTheme(e.target.value)}>
        <option disabled value="">Choose a theme</option>
        {themes?.map((theme) => (
          <option
            key={theme.id}
            value={theme.id}>Id: {theme.id} - {theme.name}
          </option>
        ))}
      </ThemeSelect>
    </div>
  )
}

export default Overview

const ThemeSelect = styled.select`
  font-size: 20px;
`
