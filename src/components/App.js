import React from "react";
import {Route} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from "../components/header/Header";
import CssBaseline from '@material-ui/core/CssBaseline';
import mainScss from "../style/main.scss";
import TabComponent from "../components/tabComponent/TabComponent";
//swipeable
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

//avatar
import Avatar from '@material-ui/core/Avatar';
import avatarImage from "../assets/images/avatar.jpg"

//providers
import {DrawerContext} from "../providers/drawerProvider/DrawerProvider";
import DrawerProvider from "../providers/drawerProvider/DrawerProvider";


const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    root: {
        flexGrow: 1,
    }
};

class App extends React.Component{




    renderSideList = () =>{

        const { classes } = this.props;
        return (
            <div className={classes.list}>
                <Grid className="padding-30px image-bg-1" container justify="flex-start" alignItems="center">
                    <Avatar alt="Remy Sharp" src={avatarImage} className={classes.bigAvatar} />
                    <div className="width-100-percent margin-left-10px margin-top-20px color-white">Ahmet Sarıca</div>
                    <div className="width-100-percent margin-left-10px margin-top-5px color-white">sarica.ahmett@gmail.com</div>
                </Grid>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    }
    renderGrids = (drawerContext) =>{
        const { classes } = this.props;
        return <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Header drawerContext = {drawerContext}></Header>
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <TabComponent>
                        </TabComponent>
                    </div>
                </Grid>
            </Grid>
        </div>
    }
    renderNavBar = (drawerContext) =>{
        return <SwipeableDrawer
            open={drawerContext.state.left}
            onClose={drawerContext.toggleDrawer('left', false)}
            onOpen={drawerContext.toggleDrawer('left', true)}
        >
            <div
                tabIndex={0}
                role="button"
                onClick={drawerContext.toggleDrawer('left', false)}
                onKeyDown={drawerContext.toggleDrawer('left', false)}
            >
                {this.renderSideList()}
            </div>
        </SwipeableDrawer>
    }

    render(){
        return (
            <React.Fragment>
                <CssBaseline>
                    <div>
                        <DrawerProvider>
                            <DrawerContext.Consumer>
                                {
                                    (context) => (
                                        <React.Fragment>
                                            {this.renderNavBar(context)}
                                            {this.renderGrids(context)}
                                        </React.Fragment>
                                    )
                                }
                            </DrawerContext.Consumer>
                        </DrawerProvider>
                    </div>
                </CssBaseline>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(App);