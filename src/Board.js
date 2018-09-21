import React, { Component } from 'react';
import './Board.css';

function Square(props){
    return (
        <button 
        className="square" id={props.id} 
        onClick={props.onClick}>
        {props.value}
        </button>
        )
};

const getSymbol = function(xIsNext) {
   const symbolsBasedOnX = {true:'X',false: 'O'};
   return symbolsBasedOnX[xIsNext]; 
}

const isSubset = (list,sublist)=>(sublist.every((ele)=>(list.includes(ele))));

const hasCurrPlayerWon = function(moves,currPlayer) {
    const currPlayerMoves = moves.filter((move)=>(move===currPlayer));
    const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  console.log(winningPositions.some(
      (winningPosition)=>isSubset(currPlayerMoves,winningPosition)
    ));
  return winningPositions.some(
      (winningPosition)=>isSubset(currPlayerMoves,winningPosition)
    );
};

const isGameDraw = (moves) => (!moves.includes(null));

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true
        };
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        squares[index] = getSymbol(this.state.xIsNext);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(index) {
        return <Square 
        value={this.state.squares[index]}
        onClick= {()=> this.handleClick(index)} id={index}></Square>;
    }

    render(){
        const currPlayer = getSymbol(this.state.xIsNext);
        let status = 'Next Player: ' + currPlayer;
        if(hasCurrPlayerWon(this.state.squares,currPlayer.slice())) {
            status = "Winner :" + currPlayer;
        }else if(isGameDraw(this.state.squares)) {
            status = "Game Draw";
        }
        return (
            <div className = "board">
            <div className="status">{status}</div>
                <div className= "row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className= "row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className= "row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

class Game extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="game">
                <Board/>            
            </div>
        );
    }
}

export default Game;