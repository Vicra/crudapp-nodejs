const axios = require('axios');

class CategoryService {
    constructor() {
        this.host = "https://crudapi-nodejs.herokuapp.com";
    }

    async getCategories() {
        try {
            const response = await axios.get(`${this.host}/category`);
            let HttpResponse = response.data;
            if (HttpResponse.success)
                return HttpResponse.data;
            else
                return [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

module.exports = new CategoryService();