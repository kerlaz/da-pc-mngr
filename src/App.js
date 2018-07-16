import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Picker from './Picker/Picker';
import Editor from './Editor/Editor';

class App extends Component {
    constructor(){
        super();
        this.state = {
            editor: false
        }
    }
    toggle() {
        this.setState({editor:!this.state.editor});
    }
    render() {
        return ([
            <div key="top-bar" onClick={()=>{this.toggle()}} className={this.state.editor ? "toggle-btn editor" : "toggle-btn picker"}>
                {this.state.editor ? "Editor" : "Picker"}
                {/*<small>{window.location.hostname}</small>*/}
            </div>,
            <div key="app-body" className="App">
                {this.state.editor ? <Editor/> : <Picker/>}
            </div>
        ]);
    }
}

export default App;
