export default class Api {
    constructor() {
        this.api_url = "https://llaminators-fp-service.onrender.com/";
    }

    getTags = () => {
        return this.init().get(`${this.api_url}/tags`);
    };
}