import React from 'react'

import './Header.css'
import Search from '../Search'

const Header = props =>
  <header className="header">
    <div className="container">
      <div className="content">
        <Search {...props} />
      </div>
    </div>
  </header>

export default Header