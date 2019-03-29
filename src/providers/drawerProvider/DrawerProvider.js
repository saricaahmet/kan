import React from 'react';

export const DrawerContext = React.createContext();

export default class DrawerProvider extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    render(){
        return (
            <DrawerContext.Provider value ={{
                state:this.state,
                toggleDrawer:this.toggleDrawer
            }}>
                {this.props.children}

            </DrawerContext.Provider>
        )
    }
}