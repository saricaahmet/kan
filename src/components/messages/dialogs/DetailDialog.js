import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Divider from '@material-ui/core/Divider';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class DetailDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };


    renderMarkButtons = () => {
        const {selectedMessage} = this.props;
        if(!selectedMessage.isSeen){
            return (
                <ListItem button key="markAsRead">
                    <ListItemText primary="Mark as Read" />
                </ListItem>
            )
        }
        else{
            return (
                <ListItem button key="markAsUnread">
                    <ListItemText primary="Mark as Unread" />
                </ListItem>
            )
        }
    }

    getName = (selectedMessage) =>{
        if(selectedMessage && selectedMessage.from){
            return selectedMessage.from.name + " " + selectedMessage.from.surname;
        }

    }

    render() {
        const { selectedMessage, classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <div className="min-width-250">
                    <DialogTitle id="simple-dialog-title">{this.getName(selectedMessage)}</DialogTitle>
                    <Divider/>
                    <div>
                        <List>
                            <ListItem button key="delete">
                                <ListItemText primary="Delete Message" />
                            </ListItem>
                            {this.renderMarkButtons()}
                        </List>
                    </div>
                </div>
            </Dialog>
        );
    }
}
export default withStyles(styles)(DetailDialog);