import React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header>
      <div className='navbar navbar-expand-lg navbar-dark bg-dark shadow-sm'>
        <div className='container d-flex justify-content-between'>
          <a href='./' className='navbar-brand d-flex align-items-center'>
            <strong>🚀 TodoWiz</strong>
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <NavLink
                  to='/'
                  className='nav-link'
                  style={({ isActive }) => {
                    return {
                      fontWeight: isActive ? 'bold' : '',
                    }
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/about' className='nav-link'>
                  About
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/contact' className='nav-link'>
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
