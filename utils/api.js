const axios = require("axios");

const api = {
    getUser(username) {
        // return axios.get(`https://api.github.com/users/${username}`);        
        return axios.get(`https://api.github.com/users/${username}`).then(response => {
            // returning the data here allows the caller to get it through another .then(...)
            return response.data
        });
    }
};

module.exports = api;
// api.getUser(GITHUBUSERNAME)
// https://api.github.com/users/