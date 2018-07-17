import React, {Component} from 'react';
import enlarge from "../arrows-expand.svg";
import arrowForward from "../arrow_forward_24px.svg";
import arrowBack from "../arrow_back_24px.svg"
import spinner from "../spinner.svg";
import testImg from "../img/_0a2x34put.jpg";
import Path from '../api';

const api = Path.api;
const imgCDN = Path.imgCDN;
const noteCDN = Path.noteCDN;

class Picker extends Component {
    constructor() {
        super();
        this.state = {
            fetching: false,
            modal: false,
            noteExpanded: false,
            intName: "Internal name",
            extName: "External name",
            img: testImg,
            matches: 0,
            annotation: "",
            metaStack: [],
            position: 0,
            metaCount: 0
        }
    }

    componentDidMount() {
        this.getData();
        // window.test = this.ok.bind(this);
    }

    getData() {
        this.setState({
            fetching: true,
            position: 0
        });
        fetch(api + 'getrandom')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    metaStack: data,
                    metaCount: data[0].metastack.length,
                    intName: data[0].name
                }, () => {
                    try {
                        this.update();
                    } catch (e) {
                        if(e){
                            this.update();
                        }
                    }
                });
                // this.getNote(noteCDN + data[0].metastack[this.state.position].int_id + '.html');
            })
            .catch(error => console.log(error));
    }

    update() {
        this.setState({
            fetching: true,
            extName: this.state.metaStack[0].metastack[this.state.position].title,
            img: imgCDN + this.state.metaStack[0].metastack[this.state.position].int_id + '.jpg',
            matches: this.state.metaStack[0].metastack[this.state.position].matches
            // annotation: noteCDN+data[0].metastack[this.state.position].int_id+'.html'
        }, () => {
            this.setState({fetching: false})
        });
        this.getNote(noteCDN + this.state.metaStack[0].metastack[this.state.position].int_id);
    }

    getNote(url) {
        let cleanStyles = /style="[a-zA-Z0-9:;.\s()\-,]*"/gi;
        let cleanPre = /<pre/g;
        let cleanWidth = /width="[a-zA-Z0-9:;.\s()\-,]*"/gi;
        try {
            fetch(url).then(res => {
                console.log('status: ', res.status);
                if (res.status === 404) {
                    this.setState({annotation: '<code>No annotation</code>'})
                } else {
                    // console.log(res=>res.json());
                    res.text().then(text => {
                        text = text.replace(cleanStyles, '')
                            .replace(cleanWidth,'')
                            .replace(/\s{2}/g,' ')
                            .replace(cleanPre,'<p');
                        this.setState({annotation: text})
                    })
                }
            });
        } catch (e) {
            console.log(e);
        }

    }

    expand() {
        this.setState({noteExpanded: !this.state.noteExpanded});
    }

    next() {
        let max = this.state.metaStack[0].metastack.length;
        let current = this.state.position;
        if (current < (max - 1)) {
            current++;
            this.setState({position: current}, () => {
                this.update();
            });
        }
    }

    prev() {
        let current = this.state.position;
        if (current > 0) {
            current--;
            this.setState({position: current}, () => {
                this.update();
            });
        }
    }

    ok() {
        let data = {
            nameid: this.state.metaStack[0].nameid,
            image: this.state.metaStack[0].metastack[this.state.position].int_id+'.jpg',
            annotation: this.state.annotation
        };
        console.log(data);
        fetch(api+'set/meta',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            },
            body: JSON.stringify(data)
        }).then(res=>res.json()).then((status)=>{
            console.log(status);
            if(!status.error){
                console.log('ok');
                this.getData();
            }
        });
    }
    toggleModal(){
        this.setState({modal: !this.state.modal});
    }
    error(eCase){
        console.log(eCase);
        if(eCase === -1){
            this.toggleModal();
        } else {
            let data = {
                nameid: this.state.metaStack[0].nameid,
                error: eCase
            };
            console.log(data);
            fetch(api+'set/error',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                },
                body: JSON.stringify(data)
            }).then(res=>res.json()).then((status)=>{
                console.log(status);
                if(!status.error){
                    console.log('ok');
                    this.toggleModal();
                    this.getData();
                }
            });
        }
    }

    render() {
        return (
            <div className={this.state.fetching ? "module-wrapper fetching" : "module-wrapper"}>
                <div className="overlay"><img src={spinner} alt="spinner"/></div>
                <h4 className="name">{this.state.intName}</h4>
                <h4 className="name">{this.state.extName}</h4>
                <div className="stage">
                    <img className="img" src={this.state.img} alt=""/>
                    <div className="a-btn meta-prev" onClick={() => {
                        this.prev()
                    }}><img src={arrowBack} alt=""/></div>
                    <div className="a-btn meta-next" onClick={() => {
                        this.next()
                    }}><img src={arrowForward} alt=""/></div>
                    <p className="score">
                        Совпадения: {this.state.matches}<br/>
                        Позиция: {this.state.position + 1}/{this.state.metaCount}
                    </p>
                    <div className={this.state.noteExpanded ? "note-wrapper expanded" : "note-wrapper"}>
                        <div className="note" dangerouslySetInnerHTML={{__html: this.state.annotation}}/>
                        <div onClick={() => {
                            this.expand()
                        }} className="size-toggle"><img src={enlarge} alt=""/></div>
                    </div>
                </div>
                <div className="action-bar">
                    <div className="a-btn" onClick={()=>{this.toggleModal()}}><span>Oшибка</span></div>
                    <div className="a-btn" onClick={()=>{this.ok()}}><span>OK</span></div>
                    <div className="a-btn" onClick={()=>{this.getData()}}><span>Дальше</span></div>
                </div>
                <div className={this.state.modal ? "modal open" : "modal"}>
                    <div className="e-btn" onClick={()=>{this.error(1)}}><span>Нет аннотации</span></div>
                    <div className="e-btn" onClick={()=>{this.error(2)}}><span>Нет варианта</span></div>
                    <div className="e-btn" onClick={()=>{this.error(3)}}><span>Некачественное изображение</span></div>
                    <div className="e-btn" onClick={()=>{this.error(0)}}><span>Прочие ошибки</span></div>
                    <div className="e-btn" onClick={()=>{this.error(-1)}}><span>Отмена</span></div>
                </div>
            </div>
        )
    }
}

export default Picker;