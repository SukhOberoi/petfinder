import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='flex justify-center'>
      <Link to="adopter"><button className='text-2xl border-2 border-black rounded-md p-2 m-2'>Adopter Login</button></Link>
      <Link to="shelter"><button className='text-2xl border-2 border-black rounded-md p-2 m-2'>Shelter Login</button></Link>
    </div>
  )
}
