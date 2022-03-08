import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { LegoContext } from '../context/LegoContext';
import { API_URL } from '../utils/urls'

const Overview = () => {
  const { sets, setSets, setChosenSet } = React.useContext(LegoContext)
  const [themes, setThemes] = useState([])
  const [chosenTheme, setChosenTheme] = useState('')
  const heart = <FontAwesomeIcon icon={faHeart} />
  console.log('sets:', sets)

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
        console.log('Daten ausm themes-useEffect: ', data.results)
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
      <select
        value={chosenTheme}
        onChange={(e) => setChosenTheme(e.target.value)}>
        <option disabled value="">Choose a theme</option>
        {themes?.map((theme) => (
          <option
            key={theme.id}
            value={theme.id}>Id: {theme.id} - {theme.name}
          </option>
        ))}
      </select>
      <section className="sets">
        {sets?.map((set) => [
          <div className="set" key={set.set_num}>
            <p>Set: {set.set_num}</p>
            <Link
              to={`/sets/${set.set_num}`}
              onClick={() => setChosenSet(set)}>
              <p>{set.name}</p>
            </Link>
            <p>Year: {set.year}</p>
            <i>{heart}</i>
          </div>
        ])}
      </section>
    </div>
  )
}

export default Overview