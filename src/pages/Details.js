import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { LegoContext } from '../context/LegoContext';

const Details = () => {
  const { chosenSet, toggleLike } = React.useContext(LegoContext)
  console.log('DetailsSet: ', chosenSet)
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
      <button type="button" onClick={() => toggleLike(chosenSet.set_num)}>{heart}</button>
      <button type="button" onClick={() => navigate('/')}>Back</button>
    </>
  )
}

export default Details