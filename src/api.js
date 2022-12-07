import axios from "axios";

export default class Api {
    constructor() {
        this.client = null;
        this.api_url = "https://llaminators-fp-service.onrender.com/";
    }

    init = () => {

        let headers = {
            Accept: "application/json",
        };

        this.client = axios.create({
            baseURL: this.api_url,
            timeout: 31000,
            headers: headers,
        });

        return this.client;
    };

    getTags = () => {
        return this.init().get(`${this.api_url}tags`);
    };

    getTopicsForTag = (tagId) => {
        return this.init().get(`${this.api_url}tags/${tagId}/topics`)
    }

    getUserForTopic = (topicId) => {
        return this.init().get(`${this.api_url}topics/${topicId}/user`)
    }
}