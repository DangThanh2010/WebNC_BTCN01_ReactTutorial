import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square({value, onClick, background}) {
    return (
        <button className="square" onClick={() => onClick()} style={background}>
            {value}
        </button>
    );
}
  
class Board extends React.Component {
    renderSquare(i) {
        let background = {background: "white"};
        if(this.props.causeWin)
        {
            for(let j = 0; j < this.props.causeWin.length; j++)
            {
                if(i === this.props.causeWin[j])
                {
                    background = {background: "yellow"}
                    break;
                }
            }
        }
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} background={background}/>;
    }
  
    render() {
        const board = [];
        for(let i = 0; i < this.props.rowNumber; i++)
        {
            const row = [];
            for(let j  = 0; j < this.props.colNumber; j++)
            {
                row.push(this.renderSquare(i * this.props.colNumber + j));
            }
            board.push(<div className="board-row">{row}</div>)
        }

        return (
            <div>{board}</div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                location: {col: null, row: null},
            }],
            stepNumber: 0,
            IsAscending: true,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: {col: (i % 3) + 1, row: Math.floor(i / 3) + 1 }
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    toggle() {
        this.setState({
            IsAscending: !this.state.IsAscending,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + " (" + step.location.col + ", " + step.location.row + ")":
                'Go to game start (col: null, row: null)';
            
            if(move === this.state.stepNumber)
            {
                return(
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}> <b>{desc}</b> </button>
                    </li>
                )
            }
            else
            {
                return (
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </li>
                );
            }
        });

        let sortOrder = "descending";
        if(!this.state.IsAscending)
        {
            sortOrder = "ascending";
            for(let i = 0; i < moves.length / 2; i++)
            {
                const temp = moves[i];
                moves[i] = moves[moves.length - 1 - i];
                moves[moves.length - 1 - i] = temp;
            }
        }

        let status;
        let causeWin;
        if (winner) {
            status = 'Winner: ' + winner.player;
            causeWin = winner.cause;
        }
        else {
            if(checkFullBoard(current.squares))
            {
                status = 'Result: Draw';
            }
            else
            {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
            causeWin = null;
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        rowNumber={3}
                        colNumber={3}
                        causeWin = {causeWin}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.toggle()}>Sort in {sortOrder} order</button>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}
  
  // ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {player: squares[a], cause: [a, b, c]};
        }
    }
    return null;
}

function checkFullBoard(squares) {
    for(let i = 0; i < squares.length; i++)
    {
        if(squares[i])
        {
            continue;
        }
        else
        {
            return false;
        }
    }
    return true;
}