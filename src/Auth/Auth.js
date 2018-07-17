import React, { Component } from 'react';

const host = window.location.hostname;
const authURI = `http://${host}:5000/auth`;

class Auth extends Component{
    constructor(){
        super();
        this.state = {
            fetching: false,
            error: false
        }
    }
    auth(e){
        e.preventDefault();
        let data = {
            login: e.target.login.value,
            password: e.target.password.value
        };
        console.log(data);
        fetch(authURI,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res=>res.json()).then((status)=>{
            console.log(status);
            if(status.error){
                this.setState({error: true});
            } else {
                this.setState({error: false});
                this.props.setToken(status.token)
            }
        });
    }
    render(){
        return (
            <div className={this.state.error ? "auth-wrapper" : "auth-wrapper red"} style={{textAlign:"center"}}>
                <h4>Введите Ваш логин и пароль</h4>
                <form id="authForm" name="auth" onSubmit={this.auth.bind(this)}>
                    <div className="group">
                        <input type="text" name="login" required />
                            <span className="highlight" />
                            <span className="bar" />
                            <label>Логин</label>
                    </div>
                    <div className="group">
                        <input type="password" name="password" required />
                            <span className="highlight" />
                            <span className="bar" />
                            <label>Пароль</label>
                    </div>
                    <button type="submit">Войти</button>
                </form>
                {this.state.error && <p className="auth-error">Неверный логин или пароль</p>}
            </div>
        )
    }
}

export default Auth;