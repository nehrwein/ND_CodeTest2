import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components/macro';
import { LegoContext } from '../context/LegoContext';
import { API_URL, options } from '../utils/urls'

const Sets = () => {
  const {
    chosenTheme,
    setChosenSet,
    likedSets
  } = React.useContext(LegoContext)

  const [sets, setSets] = useState([])
  const heart = <FontAwesomeIcon icon={faHeart} />

  useEffect(() => {
    const setsStorage = JSON.parse(localStorage.getItem('setsStorage'))

    if (setsStorage) {
      setSets(setsStorage)
    } else {
      fetch(API_URL(`sets/?page_size=1000&theme_id=${chosenTheme}`), options)
        .then((res) => res.json())
        .then((data) => {
          setSets(data.results)
          localStorage.setItem('setsStorage', JSON.stringify(data.results))
        })
    }
  }, [chosenTheme])

  return (
    <div>
      <h1>LEGO-Sets</h1>
      <SetsSection>
        {sets?.map((set) => [
          <Set key={set.set_num}>
            <StyledLink
              to={`/set/${set.set_num}`}
              onClick={() => setChosenSet(set)}>
              <h3>{set.name} ({set.set_num})</h3>
              <Thumbnail src={set.set_img_url} alt={set.name} />
              {likedSets.includes(set.set_num)
              && (
                <LikeIcon
                  likedSets={likedSets}
                  setNum={set.set_num}>{heart}
                </LikeIcon>
              )}
            </StyledLink>
          </Set>
        ])}
      </SetsSection>
    </div>
  )
}

export default Sets

const LikeIcon = styled.i`
  display: block;
  font-size: 30px;
  color: red
`

const SetsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  justify-content: space-between;
  grid-gap: 5px;
  width: 80vw;
  margin: 0 auto;
`

const Set = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 10px;
  border: 2px solid orange;
  background-color: peachpuff;
`

const Thumbnail = styled.img`
  width: 150px;
`

const StyledLink = styled(Link)`
  color: black;
`
