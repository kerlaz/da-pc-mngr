import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Auth from './Auth/Auth';
import Picker from './Picker/Picker';
import Editor from './Editor/Editor';
import Path from './api';

const checkToken = Path.checkToken;

class App extends Component {
    constructor(){
        super();
        this.state = {
            authorized: false,
            token: null,
            editor: false
        }
    }
    setToken(token){
        this.setState({token,authorized:true});
        localStorage.token = token;
    }
    componentDidMount(){
        if(localStorage.token){
            let resStatus = 0;
            fetch(checkToken,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token:localStorage.token})
            }).then(res=>{
                resStatus = res.status;
                return res.json()
            }).then((status)=>{
                console.log('auth: ',resStatus);
                console.log(status);
                if(!status.error && resStatus === 200){
                    this.setToken(status.token);
                }
            });
        }
    }
    toggle() {
        this.setState({editor:!this.state.editor});
    }
    render() {
        return (this.state.authorized ? [
            <div key="top-bar" onClick={()=>{this.toggle()}} className={this.state.editor ? "toggle-btn editor" : "toggle-btn picker"}>
                {this.state.editor ? "Editor" : "Picker"}
                {/*<small>{window.location.hostname}</small>*/}
            </div>,
            <div key="app-body" className="App">
                {this.state.editor ? <Editor token={this.state.token}/> : <Picker token={this.state.token}/>}
            </div>
        ] : <Auth key="auth" setToken={this.setToken.bind(this)}/>);
    }
}

export default App;
