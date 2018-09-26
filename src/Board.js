import React, { Component } from 'react';
import './Board.css';

class Square extends Component{
    render() {
        return (
            <div className = "square" id = {this.props.id}
            onClick={this.props.onClick}>
            {this.props.value}
            </div>
        );
    }
}

const getSymbol = function(xIsNext) {
   const symbolsBasedOnX = {true:'x',false: 'o'};
   return symbolsBasedOnX[xIsNext]; 
}

const isSubset = (list,sublist)=>(sublist.every((ele)=>(list.includes(ele))));

const hasCurrPlayerWon = function(moves,currPlayer) {
    const currPlayerMoves =  moves.reduce((array, element, index) => 
        (element === currPlayer) ? array.concat(index) : array, []);
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
  return winningPositions.filter(
      (winningPosition)=>isSubset(currPlayerMoves,winningPosition)
    );
};

const isGameDraw = (moves) => (!moves.includes(null));

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            squares : Array(9).fill(null),
            xIsNext : true,
            state : "x's Turn"
        };
    }

    handleClick(index) {
        const squares = this.state.squares;
        if(squares[index]){
            return;
        }
        const currPlayer = getSymbol(!this.state.xIsNext);
        let winningMove = hasCurrPlayerWon(squares,currPlayer);
        if(winningMove.length) {
            this.setState({state:"Winner:" + currPlayer});
            return;
        }else if(isGameDraw(this.state.squares)) {
            this.setState({state:"Game Draw"})
        }
        squares[index] = getSymbol(this.state.xIsNext);
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
            state: currPlayer + "'s Turn"
        });
    }

    renderSquare(index) {
        const isGameNotOver = this.state.state.match(/Turn/);
        const onClick = isGameNotOver?()=> this.handleClick(index):null;
        return <Square
        key = {index}
        value={this.state.squares[index]}
        onClick= {onClick} id={"sq"+index}></Square>;
    }

    render(){
        return (
            <div>
                <div className="game-status"> {this.state.state}</div>
                <div className = "board">
                {[0,1,2,3,4,5,6,7,8].map(this.renderSquare.bind(this))}
                </div>
            </div>
        )
    }
}

class Game extends Component {
    render() {
        return (
            <div className="game">
                <Board/>            
            </div>
        );
    }
}

export default Game;