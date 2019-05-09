import React from "react";
import TextArea from "./textarea";
import TextNote from "./textnote";

class Sticker extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: '',
			posX: 20,
			posY: 20,
			view: true
		}
	
		this.dragStart = this.dragStart.bind(this);
		this.dragEnd = this.dragEnd.bind(this);
		this.setText = this.setText.bind(this);
		this.changeText = this.changeText.bind(this);
		this.removeNote = this.removeNote.bind(this);
	}

	componentDidMount(){
		this.setState({
			posX: this.props.pos.x, 
			posY: this.props.pos.y, 
			text: this.props.text ? this.props.text : ''
		});
	}	

	setText(text){
		this.setState({text: text});
	}
	
	saveText(){
		this.setState({view: !this.state.view});
		this.props.getText(this.state.text.replace('\n', '<br>'), this.props.itemIndex);
	}

	changeText(e){
		this.setState({view: !this.state.view});
	}

	dragStart(e){
		e.stopPropagation();
		
		var deltaX = e.pageX - this.noteDiv.offsetLeft;
		var deltaY = e.pageY - this.noteDiv.offsetTop;
		window.onmousemove = e => {
			this.setState({
				posX: (e.pageX - deltaX), 
				posY: (e.pageY - deltaY)
			})
		}
	}
	
	dragEnd(e){
		window.onmousemove=null;
		this.props.updatePosition({x: this.state.posX, y: this.state.posY}, this.props.itemIndex);
	}

	removeNote() {
		console.log("hi");
		this.props.remove(this.props.itemIndex);
	}

	render() {
		let changeBtn;
		if(this.props.display == "none"){
			changeBtn = "inline-block"
		}
		else{
			changeBtn = "none"
		}
		
		return (
			<div 
				className="item" 
				style={ {left: `${this.state.posX}px`, top: `${this.state.posY}px`} }
				onMouseDown={this.dragStart}
				onMouseUp={this.dragEnd}
				ref={ noteDiv => {this.noteDiv = noteDiv} }
				>
				<h2>{this.props.header}</h2>

				<TextArea view={this.state.view} text={this.state.text} setText={this.setText}/>
				<TextNote view={this.state.view} text={this.props.text} changeText={this.changeText}/>

				<div className="delete-btn" onClick={this.removeNote}>Delete</div>
				<div className="save-btn" style={{display: this.state.view ? "none" : "block"}} onClick={this.saveText.bind(this)}>Save note</div>
				<div className="change-btn" style={{display: this.state.view ? "block" : "none"}} onClick={this.changeText.bind(this)}>Change note</div>
			</div>
			)
	}
}

export default Sticker;