import React from 'react'
import Hero from '../components/Hero'
import Blog from './Blog'

const Home = ({token}) => {
  return (
    <>
    <Hero/>
    <Blog token={token} />
    </>
  )
}

export default Home