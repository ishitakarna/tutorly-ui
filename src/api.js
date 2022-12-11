import axios from "axios";

export default class Api {
    constructor() {
        this.client = null;
        this.api_url = "http://20.163.248.78:8083/";
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

    // Used in learn default page
    getTags = () => {
        return this.init().get(`${this.api_url}v2/tags`);
    };

    // getTopicsForTag = (tagId) => {
    //     return this.init().get(`${this.api_url}tags/${tagId}/topics`)
    // }

    getUserForTopic = (topicId) => {
        return this.init().get(`${this.api_url}topics/${topicId}/user`)
    }

    // Used in schedule page
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
}