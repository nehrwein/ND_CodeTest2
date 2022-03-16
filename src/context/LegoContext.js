import React, { useState, useEffect } from 'react'

export const LegoContext = React.createContext()

const LegoProvider = ({ children }) => {
  const [chosenSet, setChosenSet] = useState({})
  const [chosenTheme, setChosenTheme] = useState('')
  const [likedSets, setLikedSets] = useState([])

  useEffect(() => {
    const likedStorageSets = JSON.parse(localStorage.getItem('likedLegoSets'))
    if (likedStorageSets) {
      setLikedSets(likedStorageSets)
    }

    const chosenStorageTheme = localStorage.getItem('chosenStorageTheme')
    if (chosenStorageTheme) {
      setChosenTheme(chosenStorageTheme)
    }

    const chosenSetStorage = JSON.parse(localStorage.getItem('chosenSetStorage'))
    if (chosenSetStorage) {
      setChosenSet(chosenSetStorage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('likedLegoSets', JSON.stringify(likedSets))

    localStorage.setItem('chosenStorageTheme', chosenTheme)

    localStorage.setItem('chosenSetStorage', JSON.stringify(chosenSet))
  }, [likedSets, chosenTheme, chosenSet])

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
      value={{
        chosenSet,
        setChosenSet,
        chosenTheme,
        setChosenTheme,
        toggleLike,
        likedSets
      }}>
      {children}
    </LegoContext.Provider>
  )
}

export default LegoProvider