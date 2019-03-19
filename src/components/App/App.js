import React, { Component } from 'react'

import './App.css'
import Header from '../Header'
import Main from '../Main'

class App extends Component {
  state = {
    inputText: ''
  }

  getUsers = inputText => this.setState({ inputText })

  render() {
    return (
      <div>
        <Header getUsers={this.getUsers}/>
        <Main {...this.state} />
      </div>
    )
  }
}

export default App
