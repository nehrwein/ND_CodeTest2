import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components/macro';
import { LegoContext } from '../context/LegoContext';

const Details = () => {
  const { chosenSet, toggleLike, likedSets } = React.useContext(LegoContext)
  const navigate = useNavigate()
  const heart = <FontAwesomeIcon icon={faHeart} />

  return (
    <>
      <SetContainer>
        <h2>{chosenSet.name}</h2>
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
        <BackButton
          type="button"
          onClick={() => navigate('/')}>Back
        </BackButton>
      </SetContainer>
    </>
  )
}

export default Details

const LikeButton = styled.button`
  border: none;
  background-color: transparent;
  font-size: 30px;
  cursor: pointer;
  margin-bottom: 20px;
  color: ${(props) => (props.likedSets.includes(props.setNum) ? 'red' : 'black')}
`

const BackButton = styled.button`
  width: 80px;
  padding: 5px;
  font-size: 16px;
`

const SetImage = styled.img`
  display: block;
  font-size: 30px;
`

const SetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  margin: 0 auto;
`