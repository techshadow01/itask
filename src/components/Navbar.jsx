import React from 'react'
import "./Navbar.css"

const Navbar = () => {
    return (
        <div className='Navbar1 max-sm:block'>
            <span className='font-extrabold  text-xl text-white'>iTask</span>

            <ul>
                <li>Home</li>
                <li>Your Tasks</li>
            </ul>
        </div>
    )
}

export default Navbar
