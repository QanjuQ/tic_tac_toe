import React, { Component } from 'react';
import './App.css';
import Game from './Board';
import SelectSymbol from './SelectSymbol';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      computer: null
    };
  }

  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact={true} path='/Game' render={() => (
          <div className="App">
          <Game user = {this.state.user}  computer = {this.state.computer}/>
        </div>
        )}/>
        <Route exact={true} path='/' render={() => (
          <div className="App">
          <SelectSymbol selectPlayer={this.selectPlayer.bind(this)}/>
        </div>
        )}/>
      </div>
      </BrowserRouter>
    );
  }

  selectPlayer(symbolsSelected) {
    this.setState({user:symbolsSelected.user,computer:symbolsSelected.computer});
    return <Redirect to='/Game'/>;
  }
}

export default App;
