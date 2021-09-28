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
                squares: Array(3 * 3).fill(null),
                location: {col: null, row: null},
            }],
            stepNumber: 0,
            IsAscending: true,
            SizeBoard: 3,
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares, this.state.SizeBoard) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: {col: (i % this.state.SizeBoard) + 1, row: Math.floor(i / this.state.SizeBoard) + 1 }
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

    changeSizeBoard(event)
    {
        if(event.target.value !== null && event.target.value !== "" && event.target.value !== undefined)
        {
            this.setState({
                history: [{
                    squares: Array(parseInt(event.target.value) * parseInt(event.target.value)).fill(null),
                    location: {col: null, row: null},
                }],
                stepNumber: 0,
                IsAscending: true,
                SizeBoard: parseInt(event.target.value),
                xIsNext: true,
            })
        }
        else
        {
            this.setState({
                history: [{
                    squares: Array(0).fill(null),
                    location: {col: null, row: null},
                }],
                stepNumber: 0,
                IsAscending: true,
                SizeBoard: 0,
                xIsNext: true,
            })
        }
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares, this.state.SizeBoard);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + " (" + step.location.col + ", " + step.location.row + ")":
                'Go to game start';
            
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
                        rowNumber={this.state.SizeBoard}
                        colNumber={this.state.SizeBoard}
                        causeWin = {causeWin}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>

                    <div className="input-size-board">
                        <label for="sizeboard">Size of board: </label>
                        <input type="number" id="sizeboard" name="sizeboard" min="1"
                            value={this.state.SizeBoard ? this.state.SizeBoard : null} step="1" onChange={(event) => this.changeSizeBoard(event)}/>
                    </div>

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

function calculateWinner(squares, SizeBoard) {
    if(SizeBoard < 1)
        return null;
        
    if(SizeBoard === 1)
    {
        if(squares[0])
            return {player: squares[0], cause: [0]};
        else
            return null;
    }

    let winSquareNumber;
    if(SizeBoard <= 5)
        winSquareNumber = SizeBoard;
    else
        winSquareNumber = 5;
    
    //Check in row
    for(let row = 0; row < SizeBoard; row++)
    {
        for(let col = 0; col <= (SizeBoard - winSquareNumber); col++)
        {
            if(squares[row * SizeBoard + col])
            {
                let count = 1;
                let causeWin = [];
                causeWin.push(row * SizeBoard + col);

                for(let nextCol = col + 1; nextCol < SizeBoard; nextCol++)
                {

                    if(squares[row * SizeBoard + col] === squares[row * SizeBoard + nextCol])
                    {
                        count++;
                        causeWin.push(row * SizeBoard + nextCol);

                        if(count === winSquareNumber)
                        {
                            return {player: squares[row * SizeBoard + col], cause: causeWin};
                        }
                    }
                    else
                    {
                        col = nextCol - 1;
                        break;
                    }
                }
            }
        }
    }

    //Check in column
    for(let col = 0; col < SizeBoard; col++)
    {
        for(let row = 0; row <= (SizeBoard - winSquareNumber); row++)
        {
            if(squares[row * SizeBoard + col])
            {
                let count = 1;
                let causeWin = [];
                causeWin.push(row * SizeBoard + col);

                for(let nextRow = row + 1; nextRow < SizeBoard; nextRow++)
                {

                    if(squares[row * SizeBoard + col] === squares[nextRow * SizeBoard + col])
                    {
                        count++;
                        causeWin.push(nextRow * SizeBoard + col);

                        if(count === winSquareNumber)
                        {
                            return {player: squares[row * SizeBoard + col], cause: causeWin};
                        }
                    }
                    else
                    {
                        row = nextRow - 1;
                        break;
                    }
                }
            }
        }
    }

    //Check in diagonal (left to right)
   
    for(let col = 0; col <= (SizeBoard - winSquareNumber); col++)
    {
        for(let row = 0; row <= (SizeBoard - winSquareNumber - col); row++)
        {
            if(squares[row * SizeBoard + col + row])
            {
                let count = 1;
                let causeWin = [];
                causeWin.push(row * SizeBoard + col + row);

                for(let nextRow = row + 1; nextRow < SizeBoard; nextRow++)
                {
                    if(squares[row * SizeBoard + col + row] === squares[nextRow * SizeBoard + col + nextRow])
                    {
                        count++;
                        causeWin.push(nextRow * SizeBoard + col + nextRow);

                        if(count === winSquareNumber)
                        {
                            return {player: squares[row * SizeBoard + col + row], cause: causeWin};
                        }
                    }
                    else
                    {
                        row = nextRow - 1;
                        break;
                    }
                }
            }
        }
    }

    for(let row = 0; row <= (SizeBoard - winSquareNumber); row++)
    {
        for(let col = 0; col <= (SizeBoard - winSquareNumber - row); col++)
        {
            if(squares[row * SizeBoard + col * SizeBoard + col])
            {
                let count = 1;
                let causeWin = [];
                causeWin.push(row * SizeBoard + col * SizeBoard + col);

                for(let nextCol = col + 1; nextCol < SizeBoard; nextCol++)
                {

                    if(squares[row * SizeBoard + col * SizeBoard + col] === squares[row * SizeBoard + nextCol * SizeBoard + nextCol])
                    {
                        count++;
                        causeWin.push(row * SizeBoard + nextCol * SizeBoard + nextCol);

                        if(count === winSquareNumber)
                        {
                            return {player: squares[row * SizeBoard + col * SizeBoard + col], cause: causeWin};
                        }
                    }
                    else
                    {
                        col = nextCol - 1;
                        break;
                    }
                }
            }
        }
    }

    //Check in diagonal (right to left)
   
    for(let col = SizeBoard - 1; col >= winSquareNumber - 1; col--)
    {
        for(let row = 0; row <= (SizeBoard - winSquareNumber + col - (SizeBoard - 1)); row++)
        {
            if(squares[row * SizeBoard + col - row])
            {
                let count = 1;
                let causeWin = [];
                causeWin.push(row * SizeBoard + col - row);

                for(let nextRow = row + 1; nextRow < SizeBoard; nextRow++)
                {
                    if(squares[row * SizeBoard + col - row] === squares[nextRow * SizeBoard + col - nextRow])
                    {
                        count++;
                        causeWin.push(nextRow * SizeBoard + col - nextRow);

                        if(count === winSquareNumber)
                        {
                            return {player: squares[row * SizeBoard + col - row], cause: causeWin};
                        }
                    }
                    else
                    {
                        row = nextRow - 1;
                        break;
                    }
                }
            }
        }
    }

    for(let row = 0; row <= (SizeBoard - winSquareNumber); row++)
    {
        for(let col = SizeBoard - 1; col >= winSquareNumber - 1 + row; col--)
        {
            if(squares[row * SizeBoard + (SizeBoard - 1 - col) * SizeBoard + col])
            {
                let count = 1;
                let causeWin = [];
                causeWin.push(row * SizeBoard + (SizeBoard - 1 - col) * SizeBoard + col);

                for(let nextCol = col - 1; nextCol >= 0; nextCol--)
                {

                    if(squares[row * SizeBoard + (SizeBoard - 1 - col) * SizeBoard + col] === squares[row * SizeBoard + (SizeBoard - 1 - nextCol) * SizeBoard + nextCol])
                    {
                        count++;
                        causeWin.push(row * SizeBoard + (SizeBoard - 1 - nextCol) * SizeBoard + nextCol);

                        if(count === winSquareNumber)
                        {
                            return {player: squares[row * SizeBoard + (SizeBoard - 1 - col) * SizeBoard + col], cause: causeWin};
                        }
                    }
                    else
                    {
                        col = nextCol + 1;
                        break;
                    }
                }
            }
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