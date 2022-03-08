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
      <h2>{chosenSet.name}</h2>
      <img src={chosenSet.set_img_url} alt={chosenSet.name} />
      <ul>
        <li>Release Year: {chosenSet.year}</li>
        <li>Number of parts: {chosenSet.num_parts}</li>
      </ul>
      <LikeButton type="button" likedSets={likedSets} setNum={chosenSet.set_num} onClick={() => toggleLike(chosenSet.set_num)}>{heart}</LikeButton>
      <button type="button" onClick={() => navigate('/')}>Back</button>
    </>
  )
}

export default Details

const LikeButton = styled.button`
  border: none;
  color: ${(props) => (props.likedSets.includes(props.setNum) ? 'red' : 'black')}
`