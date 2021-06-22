import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
const axios = require('axios')
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message:""
    }
  }
  handleChange=(event)=> {
    this.setState({message:event.target.value});
  }
  handleClick=(event)=> {
    axios.post("http://localhost:7000/users", {
      message: this.state.message
    })
  }
  render() {
    return (
      <div>
        <input onChange={this.handleChange} value = {this.state.message} placeholder="enter a message"></input>
        <button onClick = {this.handleClick}>Submit</button>
      </div>
    );
  }
}


export default App;
