import React from 'react';
import donationsJson from "../../assets/json/donations";

export const DonationsContext = React.createContext();

export default class DonationsProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            donations: []
        };
    }


    getAllDonations = () => {
        this.setState({
            donations: donationsJson
        })
    }

    getDonationById = (id) => {
        if (id && this.state.donations.length > 0) {
            return this.state.donations.filter((donation) => donation.id === id);
        }
    }

    toggleLike=(id)=>{

        let {donations} = this.state;

        donations.forEach((donation)=>{
            if(donation.id === id){
                donation.isFavourite = !donation.isFavourite
            }
        })

        this.setState({
            donations:donations
        })
    }

    componentDidMount() {
        this.getAllDonations();
    }


    render() {
        return (
            <DonationsContext.Provider value={{
                state: this.state,
                getAllDonations: this.getAllDonations,
                getDonationById: this.getDonationById,
                toggleLike : this.toggleLike
            }}>
                {this.props.children}

            </DonationsContext.Provider>
        )
    }
}