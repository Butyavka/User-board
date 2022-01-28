import axios from "axios";

export const getUsers = ( results = 5000, inc = "name, email, registered, picture"  ) => {
    return axios.get('https://randomuser.me/api/', {
        params: {
            results,
            inc,
        }
    })
};