import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components/macro';
import { LegoContext } from '../context/LegoContext';
import { API_URL } from '../utils/urls'

const Sets = () => {
  const { chosenTheme, setChosenTheme, sets, setSets, setChosenSet, likedSets } = React.useContext(LegoContext)
  const heart = <FontAwesomeIcon icon={faHeart} />
  const navigate = useNavigate()

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
      .then((data) => {
        setSets(data.results)
      })
  }, [chosenTheme, setSets])

  const onNavigatingHome = () => {
    setChosenTheme('')
    navigate('/')
  }

  return (
    <div>
      <h2>Sets</h2>
      <SetsSection>
        {sets?.map((set) => [
          <Set key={set.set_num}>
            <StyledLink
              to={`/set/${set.set_num}`}
              onClick={() => setChosenSet(set)}>
              <h3>{set.name} ({set.set_num})</h3>
              <Thumbnail src={set.set_img_url} alt={set.name} />
              <p>Year: {set.year}</p>
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
      <BackButton
        type="button"
        onClick={onNavigatingHome}>Back
      </BackButton>
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
  text-align: left;
  border: 2px solid orange;
  background-color: peachpuff;
`
const BackButton = styled.button`
  width: 80px;
  padding: 5px;
  font-size: 16px;
  margin-top: 10px;
`

const Thumbnail = styled.img`
  width: 150px;
`

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  h3 {
    text-decoration: underline;
  }
`
