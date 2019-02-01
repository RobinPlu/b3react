import React, { Component } from 'react';
import './Form.css';
import Message from '../Message/Message';
import firebase from 'firebase';

export default class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: 'Sebastian',
            message: '',
            list: [],
            imageUrl: ''
        };
        this.messageRef = firebase.database().ref().child('messages');


        // Create the ref
        this.fileInput = React.createRef()
        this.imgCanvas = React.createRef()

    }

    componentDidMount(){
        this.listenMessages();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({ userName: nextProps.user.displayName });
        }
    }
    handleChange(event) {
        this.setState({ message: event.target.value });
    }
    handleSend() {
        if (this.state.message) {
            var newItem = {
                userName: this.state.userName,
                message: this.state.message,
                imageUrl: this.state.imageUrl
            }
            this.messageRef.push(newItem);
            this.setState({ message: '' });
        }
    }
    handleImage() {

        console.log("là", this.fileInput.current.files[0].name)
        console.log("là", this.fileInput)

        if (this.fileInput.current.files[0]) {
            const file = this.fileInput.current.files[0];
            //const reader = new FileReader();
            // TODO : check si c'est une image
            let img = new Image;
            img.src = URL.createObjectURL(file);
            console.log('img.src == ', img.src)
            console.log('refcanvas == ', this.imgCanvas)
            img.onload = () => {
                console.log('img onooaded')
                let canvas = this.imgCanvas
                let ctx = this.imgCanvas.current.getContext('2d');
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 100)
                console.log('pouf', canvas)
                canvas.current.toBlob(blob => {
                    // inject into storage then send msg
                    firebase.storage().ref('images/').child(file.name)
                        .put(blob)
                        .then(snapshot => {
                            snapshot.ref.getDownloadURL()
                                .then(downloadURL => {
                                    this.setState({ imageUrl: downloadURL });
                                });
                        })

                }, 'image/webp', 0.8)

            };
        }
    }
    handleKeyPress(event) {
        if (event.key !== 'Enter') return;
        this.handleSend();
    }
    listenMessages() {
        this.messageRef
            .limitToLast(10)
            .on('value', message => {
                this.setState({
                    list: Object.values(message.val()),
                });
            });
    }
    render() {
        return (
            <div className="form">
                <div className="form__message">
                    {this.state.list.map((item, index) =>
                        <Message key={index} message={item} />
                    )}
                </div>
                <canvas ref={this.imgCanvas}></canvas>
                <input type="file" ref={this.fileInput} onChange={this.handleImage.bind(this)}></input>
                <div className="form__row">


                    <input
                        className="form__input"
                        type="text"
                        placeholder="Type message"
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                    />
                    <button
                        className="form__button"
                        onClick={this.handleSend.bind(this)}
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        );
    }
}