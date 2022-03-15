import React, { useState, useEffect } from 'react'

export const LegoContext = React.createContext()

const LegoProvider = ({ children }) => {
  const [sets, setSets] = useState([])
  const [chosenSet, setChosenSet] = useState({})
  const [chosenTheme, setChosenTheme] = useState('')
  const [likedSets, setLikedSets] = useState([])

  useEffect(() => {
    const likedStorageSets = JSON.parse(localStorage.getItem('likedLegoSets'))
    if (likedStorageSets) {
      setLikedSets(likedStorageSets)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('likedLegoSets', JSON.stringify(likedSets))
  }, [likedSets])

  const toggleLike = (setNum) => {
    const index = likedSets.indexOf(setNum)
    if (index > -1) {
      likedSets.splice(index, 1)
      setLikedSets([...likedSets])
    } else {
      setLikedSets([...likedSets, setNum])
    }
  }

  return (
    <LegoContext.Provider
      value={{ sets, setSets, chosenSet, setChosenSet, chosenTheme, setChosenTheme, toggleLike, likedSets }}>
      {children}
    </LegoContext.Provider>
  )
}

export default LegoProvider