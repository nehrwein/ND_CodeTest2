import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
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
      <SetsContainer>
        <h1>LEGO-Sets</h1>
        <SetsSection>
          {sets?.map((set) => [
            <Set key={set.set_num}>
              <StyledLink
                to={`/set/${set.set_num}`}
                onClick={() => setChosenSet(set)}>
                <Thumbnail image={set.set_img_url} />
                <h3>{set.name} ({set.set_num})</h3>
              </StyledLink>
              {likedSets.includes(set.set_num)
                && (
                  <LikeIcon
                    likedSets={likedSets}
                    setNum={set.set_num}>
                    <span
                      role="img"
                      aria-label="heart">💘
                    </span>
                  </LikeIcon>
                )}
            </Set>
          ])}
        </SetsSection>
      </SetsContainer>
    </div>
  )
}

export default Sets

const SetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  padding: 10px;
  margin: 0 auto;
  background-color: rgba(21, 20, 16, 0.5);
  color: whitesmoke;
`

const LikeIcon = styled.i`
  display: block;
  font-size: 30px;
  color: red
`

const SetsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 5px;
  width: 80vw;
  margin: 0 auto;
`

const Set = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: rgb(62, 159, 180);
  border-radius: 10px;
`

const Thumbnail = styled.div`
  width: 200px;
  height: 150px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin: 0 auto;
  border-radius: 10px;
`

const StyledLink = styled(Link)`
  color: whitesmoke;
`
