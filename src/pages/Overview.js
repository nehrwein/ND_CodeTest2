import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components/macro';
import { LegoContext } from '../context/LegoContext';
import { API_URL } from '../utils/urls'

const Overview = () => {
  const { sets, setSets, setChosenSet, likedSets } = React.useContext(LegoContext)
  const [themes, setThemes] = useState([])
  const [chosenTheme, setChosenTheme] = useState('')
  const heart = <FontAwesomeIcon icon={faHeart} />

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

  // fetch all sets for a chosen theme
  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'key cef91563c41612c871ed256c1a22e628'
      }
    }

    fetch(API_URL(`sets/?page_size=1000&theme_id=${chosenTheme}`), options)
      .then((res) => res.json())
      .then((data) => setSets(data.results))
  }, [chosenTheme, setSets])

  return (
    <div>
      <h1>Lego-Sets</h1>
      <ThemeSelect
        value={chosenTheme}
        onChange={(e) => setChosenTheme(e.target.value)}>
        <option disabled value="">Choose a theme</option>
        {themes?.map((theme) => (
          <option
            key={theme.id}
            value={theme.id}>Id: {theme.id} - {theme.name}
          </option>
        ))}
      </ThemeSelect>
      <SetsSection>
        {sets?.map((set) => [
          <Set key={set.set_num}>
            <p>Set: {set.set_num}</p>
            <Link
              to={`/sets/${set.set_num}`}
              onClick={() => setChosenSet(set)}>
              <p>{set.name}</p>
            </Link>
            <p>Year: {set.year}</p>
            {likedSets.includes(set.set_num)
            && (
              <LikeIcon
                likedSets={likedSets}
                setNum={set.set_num}>{heart}
              </LikeIcon>
            )}
          </Set>
        ])}
      </SetsSection>
    </div>
  )
}

export default Overview

const LikeIcon = styled.i`
  display: block;
  font-size: 30px;
  color: red
`

const ThemeSelect = styled.select`
  margin-bottom: 20px;
`

const SetsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  grid-gap: 5px;
  width: 80vw;
  margin: 0 auto;
`

const Set = styled.div`
  padding: 0 10px;
  text-align: left;
  border: 2px solid orange;
  background-color: peachpuff;
`