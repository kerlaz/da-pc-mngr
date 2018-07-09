import React, {Component} from 'react';
import enlarge from "../arrows-expand.svg";
import testImg from "../img/_0a2x34put.jpg";

const api = 'http://localhost:3333/api/';
const imgCDN = 'http://localhost:5000/images/';
const noteCDN = 'http://localhost:5000/annotations/parsed/';

class Picker extends Component {
    constructor() {
        super();
        this.state = {
            fetching: false,
            noteExpanded: false,
            intName: "Internal name",
            extName: "External name",
            img: testImg,
            matches: 0,
            annotation: "",
            metaStack: [],
            position: 0
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.setState({
            fetching: true
        });
        fetch(api + 'get/1')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    metaStack: data,
                    intName: data[0].name
                },()=>{
                    this.update();
                });
                // this.getNote(noteCDN + data[0].metastack[this.state.position].int_id + '.html');
            })
            .catch(error => console.log(error));
    }

    update(){
        this.setState({
            fetching: true,
            extName: this.state.metaStack[0].metastack[this.state.position].int_id,
            img: imgCDN + this.state.metaStack[0].metastack[this.state.position].int_id + '.jpg',
            matches: this.state.metaStack[0].metastack[this.state.position].matches
            // annotation: noteCDN+data[0].metastack[this.state.position].int_id+'.html'
        },()=>{this.setState({fetching: false})});
        this.getNote(noteCDN + this.state.metaStack[0].metastack[this.state.position].int_id + '.html');
    }

    getNote(url) {
        let cleaner = /style="[a-zA-Z0-9:;.\s()\-,]*"/gi;
        try {
            fetch(url).then(res => {
                console.log('status: ',res.status);
                if (res.status === 404) {
                    this.setState({annotation: '<code>No annotation</code>'})
                } else {
                    res.text().then(text => {
                        text = text.replace(cleaner,'');
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
        if(current<(max-1)){
            current++;
            this.setState({position:current},()=>{this.update();});
        }
    }
    prev() {
        let current = this.state.position;
        if(current > 0){
            current--;
            this.setState({position:current},()=>{this.update();});
        }
    }

    render() {
        return (
            <div className={this.state.fetching ? "module-wrapper fetching" : "module-wrapper"}>
                <div className="action-bar">
                    <div className="a-btn"><span>ok</span></div>
                    <div className="a-btn"><span>no</span></div>
                    <div className="a-btn"><span>report</span></div>
                    <div className="a-btn" onClick={()=>{this.prev()}}><span>prev</span></div>
                    <div className="a-btn" onClick={()=>{this.next()}}><span>next</span></div>
                </div>
                <h4 className="name">{this.state.intName}</h4>
                <h4 className="name">{this.state.extName}</h4>
                <div className="stage">
                    <img className="img" src={this.state.img} alt=""/>
                    <p className="score">Совпадения: {this.state.matches}</p>
                    <div className={this.state.noteExpanded ? "note-wrapper expanded" : "note-wrapper"}>
                        <div className="note" dangerouslySetInnerHTML={{__html: this.state.annotation}}/>
                        <div onClick={() => {
                            this.expand()
                        }} className="size-toggle"><img src={enlarge} alt=""/></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Picker;