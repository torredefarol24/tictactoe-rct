import React from 'react';
import { Square } from './Square';

export class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true
		}

		this.calculateWinner = this.calculateWinner.bind(this);
		this.renderSquare = this.renderSquare.bind(this);

	}

	clickSquare(i) {
		const squares = this.state.squares.slice();
		if (this.calculateWinner(squares) || squares[i]) {
			return;
		}

		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext
		})
	}

	renderSquare(i) {
		return <Square value={this.state.squares[i]} onClick={() => this.clickSquare(i)} />;
	}

	calculateWinner(squareArr) {
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

			if (squareArr[a] && squareArr[a] === squareArr[b] && squareArr[a] === squareArr[c]) {
				return squareArr[a]
			}
		}

		return null
	}

	render() {
		const winner = this.calculateWinner(this.state.squares);
		let playerName, preStatus;

		if (winner) {
			preStatus = 'Winner';
			playerName = winner;
		} else {
			preStatus = 'Next Player';
			playerName = this.state.xIsNext ? `X` : `O`;
		}

		return (
			<div>
				<div className="status">
					<h1 className='game-status'> {preStatus}: <strong>{playerName}</strong> </h1>
				</div>

				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}

}