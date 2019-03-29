import React from "react";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom';

//color
import cyan from '@material-ui/core/colors/cyan';


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    background:{
        backgroundColor:cyan[500]
    }
};



class Header extends React.Component {


    constructor(props){
        super(props);
        console.log(this.props);
    }

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.root}>
                <AppBar className={classes.background} position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.props.drawerContext.toggleDrawer("left",true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            <Link to="/">News</Link>
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default withStyles(styles)(Header);