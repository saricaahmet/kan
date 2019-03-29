import React from 'react';
import messagesJson from "../../assets/json/messages";

export const MessagesContext = React.createContext();

export default class MessagesProvider extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
    }

    getAllMessages = () => {
        this.setState({
            messages: messagesJson
        })
    }

    setMessagesToState = (messages) =>{
        this.setState({
            ...this.state,
            messages:messages
        })
    }

    deleteMessage = (id) => {
        try{
            if (id) {
                let messages = [];
                messages = this.state.messages.filter((message) => message.from.id != id);
                this.setMessagesToState(messages);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    toggleRead = (id) =>{
        try{
            if(id){
                let messages = [];
                messages = this.state.messages.map((message)=>{
                    if(id == message.from.id){
                        message.isSeen = !message.isSeen;
                    }
                    return message;
                })
                this.setMessagesToState(messages);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    componentDidMount() {
        this.getAllMessages();
    }

    render() {
        return (
            <MessagesContext.Provider value={{
                state: this.state,
                getAllMessages: this.getAllMessages,
                deleteMessage: this.deleteMessage,
                toggleRead : this.toggleRead
            }}>
                {this.props.children}

            </MessagesContext.Provider>
        )
    }
}
