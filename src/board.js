import React from "react";
import Sticker from "./sticker";

class Board extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stickers: []
		}

		this.createSticker = this.createSticker.bind(this);
		this.updatePosition = this.updatePosition.bind(this);
		this.getText = this.getText.bind(this);
		this.changeText = this.changeText.bind(this);
		this.deleteSticker = this.deleteSticker.bind(this);
	}

	componentDidMount(){
		if(localStorage.notes){
			let stickers = JSON.parse(localStorage.notes);
			this.uId = stickers[stickers.length - 1].id + 1;
			this.setState({stickers}, ()=>console.log(this.state));
		}
	}

	generateId(){
		this.uId = this.uId || 0;
		return this.uId++;
	}

	getX() {
		let pos = Math.floor( Math.random() * 500 );
		return pos;
	}

	createSticker(){
		let obj = {
			header: "I'm a new sticker",
			date: null,
			text: null,
			id: this.generateId(),
			pos: {
				x: this.getX(),
				y: this.getX(),

				// countX: function() {
				// 	var x=Math.random() * document.documentElement.clientWidth;
				// 	if(x+200>=document.documentElement.clientWidth) {
				// 		x-200
				// 	};	
				// 	return x;
				// },
				// countY: function(){
				// 	var y=Math.random() * document.documentElement.clientHeight;
				// 	if(y+200>=document.documentElement.clientHeight){
				// 		y-200
				// 	}
				// 	return y;
				// }
			},
		};
		let stickersCopy = this.state.stickers.concat([]);
		stickersCopy.push(obj);
		this.setState({stickers: stickersCopy});
	}

	deleteSticker(index){
		let stickersCopy = this.state.stickers.concat([]);
		stickersCopy.splice(index, 1);
		this.setState({stickers: stickersCopy});
	}

	updatePosition(posObj, index){
		let arr = [...this.state.stickers];
		arr[index].pos = posObj;
		this.setState({stickers: arr}, () => {
			localStorage.notes = JSON.stringify(this.state.stickers);
			// console.log("State from parent component", this.state);
		});
	}

	getText(text, index){
		let arr = this.state.stickers.concat([]);
		if(text){
			arr[index].text = text;
			arr[index].display = "none";
		}

		this.setState({stickers: arr}, function(){
			localStorage.notes = JSON.stringify(this.state.stickers);
			console.log(localStorage.notes);
		}); ///change textarea of stickers
	}

	changeText(index){
		let arr = this.state.stickers.concat([]);
		arr[index].display = !this.state.display;
		this.setState({stickers: arr});
	}

	render() {

		let stickerList=this.state.stickers.map((item,index) => {
			return( <Sticker 
				key={item.id}
				itemIndex={index}
				header={item.header}
				text={item.text}
				getText={this.getText}
				display={item.display}
				pos={item.pos}
				change={this.changeText}
				updatePosition={this.updatePosition}
				remove={this.deleteSticker}
				/> )

		});

		return (
			<div className="board">
				<div className="button" onClick={this.createSticker}>+</div>
				{stickerList}
			</div>
			)
	}
}

export default Board;