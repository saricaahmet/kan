import React from "react";
import DonationCard from "../donations/donationCard/DonationCard";
import DonationService from "../../services/DonationService";


class Donations extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {donationsContext, isFavourites} = this.props;
        if (!isFavourites) {
            let donations = [];
            donationsContext.state.donations.filter((donation) => {
                return donation.isFavourite && donations.push(donation);
            });
            return (
                //favourites
                <div>
                    {
                        donations.map((donation) =>
                            <DonationCard donationsContext={donationsContext} donation={donation} key={donation.id}/>
                        )
                    }
                </div>

            );
        }
        else {
            return (
                //donations
                <div>
                    {donationsContext.state.donations.map((donation) =>
                        (<DonationCard donationsContext={donationsContext} donation={donation} key={donation.id}/>)
                    )}
                </div>

            );
        }
    }
}

export default Donations;