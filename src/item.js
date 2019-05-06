import React from "react";

class Item extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			text: '',			
			posX: 20,
			posY: 20,
			view: true			
		}
	}

	componentDidMount(){
		this.setState({
			posX: this.props.pos.x, 
			posY: this.props.pos.y, 
			text: this.props.text ? this.props.text : ''
		});
	}	

	setText(e){
		var targetText = e.target.value;	
		this.setState({text: e.target.value});		
	}
	
	saveText(event){		
		this.setState({view: !this.state.view});				
		this.props.getText(this.state.text.replace('\n', '<br>'), this.props.itemIndex);					
	}

	changeText(e){		
		this.setState({view: !this.state.view});		
	}

	dragStart(e){
		e.stopPropagation();		
		//var item = e.target;display
		var deltaX = e.pageX - this.noteDiv.offsetLeft;
		var deltaY = e.pageY - this.noteDiv.offsetTop;
		window.onmousemove = e => {
			this.setState({
				posX: (e.pageX - deltaX), 
				posY: (e.pageY - deltaY)
			})
		}
		// window.onmousemove = e => {
		// 	item.style.left = e.pageX - deltaX + "px";
		// 	item.style.top =  e.pageY - deltaY + "px";
		// }
		
	}
	
	dragEnd(e){
		window.onmousemove=null;
		this.props.updatePosition({x: this.state.posX, y: this.state.posY}, this.props.itemIndex);
	}

	render() {		
		//let x = this.props.pos.x;
		//let y = this.props.pos.y;

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
				onMouseDown={this.dragStart.bind(this)} 
				onMouseUp={this.dragEnd.bind(this)}				
				ref={ noteDiv => {this.noteDiv = noteDiv} }
				>

				<h4>{this.props.header}</h4>				
				<textarea 
					onChange={this.setText.bind(this)}
					value={this.state.text != null ? this.state.text : this.props.text}
					style={{display: this.state.view ? "none" : "inline-block"}}
					onMouseDown={e=>{
						e.stopPropagation();
					}}
					onMouseUp={e=>{
						e.stopPropagation();
				}}
				>
				</textarea>
				<div className="textNote"
					style={{display: this.state.view? "block" : "none"}}
					onClick={this.changeText.bind(this)}
					>
					{this.props.text}
				</div>
				<div className="save-btn" style={{display: this.state.view ? "none" : "block"}} onClick={this.saveText.bind(this)}>Save note</div>
				<div className="change-btn" style={{display: this.state.view ? "block" : "none"}} onClick={this.changeText.bind(this)}>Change note</div>
			</div>
			)
	}
}

export default Item;