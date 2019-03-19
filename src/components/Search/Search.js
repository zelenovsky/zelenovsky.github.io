import React, { Component } from 'react'

import './Search.css'
import IconSearch from '../Icons/IconSearch'

export default class Search extends Component {
  render() {
    const { getUsers } = this.props

    return (
      <form className="search">
        <input
          ref="search"
          type="text"
          className="input-text"
          onChange={() => getUsers(this.refs.search.value)}
        />
        <div className="message">Please enter login </div>
        <button className="button submit">
          <IconSearch />
        </button>
      </form>
    )
  }
}
