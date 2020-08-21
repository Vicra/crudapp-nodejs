const axios = require('axios');

class ProductService {
    constructor() {
        this.host = "http://localhost:3000";
    }

    async getProducts() {
        try {
            const response = await axios.get(`${this.host}/product`);
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

    async getProductById(productId) {
        try {
            const response = await axios.get(`${this.host}/product/${productId}`);
            let HttpResponse = response.data;
            if (HttpResponse.success)
                return HttpResponse.data;
            else
                return {};
        } catch (error) {
            console.log(error);
            return {};
        }
    }
}

module.exports = new ProductService();