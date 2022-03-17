import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components/macro';
import { LegoContext } from '../context/LegoContext';

const Details = () => {
  const { chosenSet, toggleLike, likedSets } = React.useContext(LegoContext)
  const heart = <FontAwesomeIcon icon={faHeart} />

  return (
    <>
      <SetContainer>
        <h1>Set &quot;{chosenSet.name}&quot;</h1>
        <InfoContainer>
          <SetImage
            src={chosenSet.set_img_url}
            alt={chosenSet.name} />
          <ul>
            <li>Release Year: {chosenSet.year}</li>
            <li>Number of parts: {chosenSet.num_parts}</li>
          </ul>
          <LikeButton
            type="button"
            likedSets={likedSets}
            setNum={chosenSet.set_num}
            onClick={() => toggleLike(chosenSet.set_num)}>{heart}
          </LikeButton>
        </InfoContainer>
      </SetContainer>
    </>
  )
}

export default Details

const InfoContainer = styled.div`
  background-color: rgb(62, 159, 180);
  border: 10px solid rgb(62, 159, 180);
  border-radius: 10px;
`

const LikeButton = styled.button`
  border-color: transparent;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 20px;
  color: ${(props) => (props.likedSets.includes(props.setNum) ? 'red' : 'black')};
  background-color: whitesmoke;
  border-radius: 50px;
  width: 38px;
  height: 38px;
  transition: all 0.3s ease-in-out;

  :hover {
    transform: scale(1.3)
  }
`

const SetImage = styled.img`
  display: block;
  width: 360px;
  border-radius: 10px;
`

const SetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: rgba(21, 20, 16, 0.5);
  color: whitesmoke;
`