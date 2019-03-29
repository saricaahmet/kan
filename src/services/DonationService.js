import {GET} from './BaseService';

export default class DonationService{
    getAllDonations(){
        const url="users";

        let data = GET(url);

        return data;
    }
}