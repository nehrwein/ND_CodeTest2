import React, { useState } from 'react'

export const LegoContext = React.createContext()

const LegoProvider = ({ children }) => {
  const [sets, setSets] = useState([])
  const [chosenSet, setChosenSet] = useState({})
  const [likedSets, setLikedSets] = useState([])

  const toggleLike = (setNum) => {
    const index = likedSets.indexOf(setNum)
    if (index > -1) {
      likedSets.splice(index, 1)
    } else {
      setLikedSets([...likedSets, setNum])
    }
    console.log('likedSets', likedSets)
  }

  return (
    <LegoContext.Provider
      value={{ sets, setSets, chosenSet, setChosenSet, toggleLike, likedSets }}>
      {children}
    </LegoContext.Provider>
  )
}

export default LegoProvider