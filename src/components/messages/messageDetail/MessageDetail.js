import React from "react";
import Avatar from '@material-ui/core/Avatar'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
};

class MessageDetail extends React.Component{

    renderMessage = () =>{
        const { classes } = this.props;
        return (
            <div>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />
                <div>Gelen Mesaj</div>
            </div>
        )
    }

    renderSentMessage = () =>{
        return (
            <div>Gönderilen Mesaj</div>
        )
    }

    render(){
        return (
            <div>
                {this.renderMessage}
            </div>
        )
    }
}
export default withStyles(styles)(MessageDetail);