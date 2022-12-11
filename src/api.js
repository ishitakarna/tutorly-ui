import axios from "axios";

export default class Api {
    constructor() {
        this.client = null;
        // this.api_url = "https://llaminators-fp-service.onrender.com/";
        this.api_url = "http://20.163.248.78:8083/"
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

    getBookedSlots = () => {
        return this.init().get(`${this.api_url}userSlots`)
    }

    getTopicDetails = (id) => {
        return this.init().get(`${this.api_url}topics/${id}`);
    };

    getTopics = () => {
        return this.init().get(`${this.api_url}topics`);
    };

    getTopicUser = (id) => {
        return this.init().get(`${this.api_url}v2/topics/${id}`);
    };

    getUserSlots = (id) => {
        return this.init().get(`${this.api_url}v2/userSlots/${id}`);
    };

    getUserTopics = (id) => {
        return this.init().get(`${this.api_url}v2/topics/user/${id}`);
    };

    getUserByEmail = (userEmail) => {
        return this.init().get(`${this.api_url}users/search/findByEmail`, { params: {email : userEmail} })
    }

    getTopicsByUserId = (userId) => {
        return this.init().get(`${this.api_url}topics/search/findByUserId`, { params: {userId : userId} })
    }

    getWalletByUserId = (userId) => {
        return this.init().get(`${this.api_url}wallets/search/findByUser_UserId`, { params: {userId : userId} })
    }
}