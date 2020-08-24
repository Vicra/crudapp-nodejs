const axios = require('axios');

class UserService {
    constructor() {
        this.host = "http://localhost:3000";
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
}

module.exports = new UserService();