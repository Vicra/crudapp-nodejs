const axios = require('axios');

class UserService {
    constructor() {
        this.host = "https://crudapi-nodejs.herokuapp.com";
    }

    async isValidUser(user) {
        try {
            let response = await axios.post(`${this.host}/admin/login`, {
                user: user.user,
                password: user.password
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async registerUser(user){
        try {
            let response = await axios.post(`${this.host}/admin/register`, {
                user: user.user,
                password: user.password
            });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }
}

module.exports = new UserService();