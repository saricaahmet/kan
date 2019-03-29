import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import messagesJson from "../../assets/json/messages";
import "./messages.scss";
import Divider from '@material-ui/core/Divider';
import DetailDialog from "./dialogs/DetailDialog";
import MessagesProvider from "../../providers/messagesProvider/MessagesProvider";
import {MessagesContext} from "../../providers/messagesProvider/MessagesProvider";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
});


class Messages extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedMessage: {
                from: {
                    id: "",
                    name: "",
                    surname: "",
                    avatar: ""
                },
                text: "",
                date: "",
                isSeen: false
            },
            isClickStarted: false
        };

        this.handleButtonPress = this.handleButtonPress.bind(this)
        this.handleButtonRelease = this.handleButtonRelease.bind(this)
    }

    handleClickOpen = (message) => {

        this.setState({
            ...this.state,
            open: true,
            isClickStarted: false
        });
    };

    handleClose = value => {
        this.setState(
            {
                ...this.state,
                open: false
            }
        );
    };

    handleButtonPress(message) {
        this.setState({
            ...this.state,
            isClickStarted: true,
            selectedMessage: message
        })
        this.buttonPressTimer = setTimeout(() => {
            this.handleClickOpen(message);
        }, 500)
    }

    handleButtonRelease() {
        this.setState({
            ...this.state,
            isClickStarted: false
        })
        clearTimeout(this.buttonPressTimer);
    }

    isSeenIcon = (message) => {
        if (!message.isSeen) {
            return <div className="unseen-icon"></div>
        }
    }
    isSeenText = (message) => {
        if (!message.isSeen) {
            return "flex-1-5 unseen-font";
        }
        else {
            return "flex-1-5";
        }
    }

    fillMessageRow(id) {
        try {
            if (this.state.selectedMessage && this.state.selectedMessage.from) {
                if (this.state.isClickStarted && this.state.selectedMessage.from.id == id) {
                    return "message-row"
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    renderMessageList=(context)=>{
        const {classes} = this.props;
        return (
            <List className={classes.root}>
                {
                    context.state.messages.map((message) => {
                        return <React.Fragment key={message.from.id}>
                            <ListItem className={this.fillMessageRow(message.from.id)} alignItems="center"
                                      onTouchStart={() => {
                                          this.handleButtonPress(message)
                                      }}
                                      onTouchEnd={this.handleButtonRelease}
                                      onMouseDown={this.handleButtonPress}
                                      onMouseUp={this.handleButtonRelease}
                                      onMouseLeave={this.handleButtonRelease}>
                                <div className="fake-circle">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={message.from.avatar}
                                                className={classes.bigAvatar}/>
                                    </ListItemAvatar>
                                </div>
                                <ListItemText className={this.isSeenText(message)}
                                              primary={message.from.name + " " + message.from.surname}
                                              secondary={message.text}
                                />
                                {this.isSeenIcon(message)}
                            </ListItem>
                            <Divider/>
                        </React.Fragment>
                    })
                }
            </List>
        )
    }

    render() {

        return (
            <MessagesProvider>
                <MessagesContext.Consumer>
                    {
                        (context) => (
                            <React.Fragment>
                                <DetailDialog open={this.state.open}
                                              context={context}
                                              selectedMessage={this.state.selectedMessage}
                                              onClose={this.handleClose}>
                                </DetailDialog>
                                {this.renderMessageList(context)}
                            </React.Fragment>
                        )
                    }
                </MessagesContext.Consumer>
            </MessagesProvider>
        )
    }
}

export default withStyles(styles)(Messages);