import React, { Component } from 'react';
import './Board.css';


const isSubset = (list,sublist)=>(sublist.every((ele)=>(list.includes(ele))));

const hasPlayerWon = function(moves) {
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
    return winningPositions.some(
        (winningPosition)=>isSubset(moves,winningPosition)
    );
};

const getIndicesOf = (array, ele) => {
    return array.reduce((indicesOf, element, index) => 
    (element === ele) ? indicesOf.concat(index) : indicesOf, []);
};

const generateNumberLessThan = (number) => Math.floor((Math.random() * number));

const isGameDraw = (moves) => (!moves.includes(null));

const getBotsMove = (boardState) => {
    const emptySquares = getIndicesOf(boardState, null);
    return emptySquares[ generateNumberLessThan(emptySquares.length) ];
};
    
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

class Board extends Component {
    constructor(props){
        super(props)
        this.state = {
            squares : Array(9).fill(null),
            state : null
        };
    }

    isGameOver (squares,symbol) {
        const moves = getIndicesOf(squares,symbol);
        if(hasPlayerWon(moves)){
            this.setState({
                state:symbol===this.props.user?"You Win":"You Lost!",
                squares:squares,
            });
            setTimeout(()=>this.props.onGameOver(this.state.state),1000);
            return true;
        }
        if(isGameDraw(squares)) {
            this.setState({
                state:"Game Drawn" ,
                squares:squares,
            });
            setTimeout(()=>this.props.onGameOver(this.state.state),1000);
            return true;
        }
    }

    handleClick(index) {
        const squares = this.state.squares.slice();
        if(squares[index]){
            return;
        }
        squares[index] = this.props.user;
        this.isGameOver(squares,this.props.user)
        squares[getBotsMove(squares)] = this.props.computer; 
        this.isGameOver(squares,this.props.computer);
        this.setState({squares: squares});
    }

    renderSquare(index) {
        const onClick = this.state.state?null:()=> this.handleClick(index);
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

export default Board;