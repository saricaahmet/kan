import axios from "axios";

import {BASE_URL} from "../config/config";

export function GET(path) {
    let _path = BASE_URL + path;
    return axios.get(_path);
}