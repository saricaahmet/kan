import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MessageIcon from '@material-ui/icons/Message';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import "./donations.scss";

import classNames from 'classnames';
import { capitalize } from '@material-ui/core/utils/helpers';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import DeleteIcon from '@material-ui/icons/Delete';

import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    card: {
        maxWidth: 400,
        position:"relative"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    speedDial: {},
    directionUp: {},
    directionRight: {},
    directionDown: {},
    directionLeft: {},

});

const actions = [
    { icon: <FileCopyIcon />, name: 'Facebook' },
    { icon: <SaveIcon />, name: 'Twitter' },
];

class DonationCard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            expanded: false,
            likeCssClass:"material-icons like-action",
            direction: 'right',
            open: false,
            hidden: false,
        };
    }


    decideLikeButton(donation){
        if(donation.isFavourite){
            return "action-buttons red";
        }
        else{
            return"action-buttons";
        }
    }

    toggleLike(donation){
        if(donation.isFavourite){
            this.setState({
                likeCssClass:"material-icons like-action"
            });
        }
        else{
            this.setState({
                likeCssClass:"material-icons like like-action"
            });
        }
        this.props.donationsContext.toggleLike(donation.id)
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClick = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    render(){

        const { classes,donation } = this.props;
        const { direction, hidden, open } = this.state;
        const speedDialClassName = classNames(
            classes.speedDial,
            classes[`direction${capitalize(direction)}`],
        );

        return (
            <div className="margin-top-10px">
                <Card className={classes.card}>
                    <i className={this.state.likeCssClass}>favorite</i>

                    <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.bigAvatar} src={donation.avatar}></Avatar>
                        }
                        action={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={donation.name + " " +donation.surname}
                        subheader={donation.bloodType}
                    />
                    <Divider/>
                    <CardContent>
                        <Typography component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="Add to favorites" onClick={()=>this.toggleLike(donation)}>
                            {/*<FavoriteIcon className={this.decideLikeButton(donation)}/>*/}
                            <FavoriteIcon className={this.decideLikeButton(donation)}/>
                        </IconButton>
                        <IconButton arial-label="Message">
                            <MessageIcon className="action-buttons"/>
                        </IconButton>

                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            className="speed-dial"
                            hidden={hidden}
                            icon={<ShareIcon />}
                            onClick={this.handleClick}
                            onClose={this.handleClick}
                            open={open}
                            direction={direction}
                        >
                            {actions.map(action => (
                                <SpeedDialAction
                                    key={action.name}
                                    icon={action.icon}
                                    tooltipTitle={action.name}
                                    onClick={this.handleClick}
                                />
                            ))}
                        </SpeedDial>

                        {/*<IconButton aria-label="Share">
                            <ShareIcon className="action-buttons"/>
                        </IconButton>*/}
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(DonationCard);