import React, {Component} from 'react';
import enlarge from "../arrows-expand.svg";
import testImg from "../img/_0a2x34put.jpg";

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
            annotation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis et ipsum et ultrices. Proin ac justo scelerisque, placerat lectus in, varius sapien. Nulla quis feugiat erat. Aenean posuere tellus non posuere consectetur. Vestibulum elementum, metus vel interdum lobortis, lectus libero ullamcorper tellus, sed semper velit eros nec erat. Duis enim est, fermentum ac rutrum sit amet, bibendum et tortor. Cras quis neque congue, placerat arcu a, finibus nisl. Duis interdum, tortor quis viverra eleifend, risus est placerat ante, id eleifend risus dui vel diam. In id dapibus dolor. In efficitur eros sed nisi viverra, eu ullamcorper dui bibendum. Suspendisse eu placerat erat. Duis eget egestas tellus. Proin est erat, ullamcorper at imperdiet quis, hendrerit et turpis. Phasellus eget eros vitae orci sodales cursus eu nec eros.\n" +
            "\n" +
            "Sed tristique, lorem sed interdum posuere, nibh urna aliquam est, eu dapibus eros purus sed tellus. Phasellus ut neque vitae dolor hendrerit feugiat eu egestas metus. Aenean non mattis orci, et aliquet libero. Maecenas pretium ornare sem eu molestie. Phasellus consectetur vitae felis nec ullamcorper. Vivamus scelerisque sem enim, vel suscipit turpis tempor ut. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur rutrum, felis tristique dignissim ultricies, nunc lacus blandit est, nec vehicula urna risus porta libero. Nunc sit amet pretium nulla. Maecenas venenatis vestibulum finibus. Sed luctus magna vehicula, ullamcorper enim ut, condimentum arcu. Integer lobortis in massa ut porta. Pellentesque volutpat ultrices dolor, vitae efficitur felis feugiat sit amet. Quisque felis risus, cursus et vehicula vitae, imperdiet eleifend ligula. Etiam tincidunt nisi sed nibh consectetur ultricies. In ac dolor quis enim eleifend ornare finibus ullamcorper tellus.\n" +
            "\n" +
            "Integer quis est eget sapien consequat fermentum sed ut tortor. Etiam vitae interdum sapien. Nunc id vehicula mauris, ut elementum nisi. Nam sed leo vel enim aliquam dapibus in quis sapien. Suspendisse eu sagittis turpis. Proin ac quam non turpis rhoncus laoreet. Mauris et lorem quis nunc tempus aliquet. Sed pharetra sapien quis dignissim elementum. Quisque vel scelerisque diam. In vel semper augue.\n" +
            "\n" +
            "In hac habitasse platea dictumst. Duis gravida placerat diam non ultrices. Suspendisse nec ante lobortis, finibus tortor quis, maximus odio. Quisque sit amet neque eu turpis ultricies porta quis sed dui. Ut blandit magna erat, non pretium lectus vehicula quis. Cras eget convallis lectus, quis pharetra purus. Morbi ac mattis nibh, eget ultrices tortor. Curabitur eget volutpat est. Suspendisse placerat magna non mauris interdum laoreet. Fusce eget porta risus, ac tincidunt arcu. Integer quis eleifend nunc. In tempor tincidunt dui id consequat. Aenean ac aliquam ante. Sed dapibus, massa et vulputate semper, elit lacus posuere nisl, non pretium dolor ante sit amet tellus. Integer nec nunc ante. Vivamus magna quam, interdum vel porttitor bibendum, eleifend et tellus.\n" +
            "\n" +
            "Fusce blandit vitae dolor sit amet maximus. In eget commodo elit, quis lobortis nunc. Mauris auctor faucibus quam, ut auctor magna vehicula in. Sed quis magna in lectus porta elementum. Mauris vel ex massa. Vestibulum ut lobortis eros, eget pretium orci. Mauris maximus ipsum ac ultrices volutpat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla quis auctor metus, id mattis lacus. Phasellus imperdiet fringilla purus, et egestas lacus. Phasellus at augue vulputate, pulvinar ex eget, aliquam risus. In in blandit tellus, vel congue eros. Aliquam vestibulum quam lectus, nec semper justo scelerisque id.",
            metaStack: []
        }
    }

    expand() {
        this.setState({noteExpanded:!this.state.noteExpanded});
    }

    render() {
        return (
            <div className="module-wrapper">
                <div className="action-bar">
                    <div className="a-btn"><span>ok</span></div>
                    <div className="a-btn"><span>no</span></div>
                    <div className="a-btn"><span>report</span></div>
                    <div className="a-btn"><span>prev</span></div>
                    <div className="a-btn"><span>next</span></div>
                </div>
                <h4 className="name">{this.state.intName}</h4>
                <h4 className="name">{this.state.extName}</h4>
                <div className="stage">
                    <img className="img" src={this.state.img} alt=""/>
                    <p className="score">Совпадения: {this.state.matches}</p>
                    <div className={this.state.noteExpanded ? "note-wrapper expanded" : "note-wrapper"}>
                        <div className="note">{this.state.annotation}</div>
                        <div onClick={()=>{this.expand()}} className="size-toggle"><img src={enlarge} alt=""/></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Picker;