import React from "react";
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Donations from "../donations/Donations";
import Needs from "../needs/Needs";
import Favourites from "../favourites/Favourites";
import cyan from '@material-ui/core/colors/cyan';

//providers
import {DonationsContext} from "../../providers/donationProvider/DonationsProvider";
import DonationsProvider from "../../providers/donationProvider/DonationsProvider";


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}} className="body-area">
            {props.children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    tabsIndicator: {
        backgroundColor: cyan[500],
    },
    tabRoot: {
        '&$tabSelected': {
            color: cyan[500],
        },
    },
    tabSelected: {},
});

class TabComponent extends React.Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        variant="fullWidth"
                        classes={{indicator: classes.tabsIndicator}}
                    >
                        <Tab label="Donations" icon={<PhoneIcon/>}
                             classes={{root: classes.tabRoot, selected: classes.tabSelected}}/>
                        <Tab label="Needs" icon={<PersonPinIcon/>}
                             classes={{root: classes.tabRoot, selected: classes.tabSelected}}/>
                        <Tab label="Favourites" icon={<FavoriteIcon/>}
                             classes={{root: classes.tabRoot, selected: classes.tabSelected}}/>
                    </Tabs>
                </AppBar>
                {(value === 0 || value === 2) &&
                    <TabContainer>
                        <DonationsProvider>
                            <DonationsContext.Consumer>
                                {
                                    (context) => (
                                        <Donations isFavourites={value === 0 ? true : false} donationsContext={context}>
                                        </Donations>
                                    )
                                }
                            </DonationsContext.Consumer>
                        </DonationsProvider>
                    </TabContainer>}
                {value === 1 &&
                <TabContainer>
                    <Needs></Needs>
                </TabContainer>}
            </div>
        )
    }
}

export default withStyles(styles)(TabComponent);