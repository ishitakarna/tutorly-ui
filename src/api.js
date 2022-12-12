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

    // USER
    getUserByEmail = (userEmail) => {
        return this.init().get(`${this.api_url}users/search/findByEmail`, { params: {email : userEmail} })
    }

    // LEARN
    getTags = () => {
        return this.init().get(`${this.api_url}v2/tags`);
    };

    // TEACH, SCHEDULE
    getUserSlots = (id) => {
        return this.init().get(`${this.api_url}v2/userSlots/${id}`);
    };

    //SCHEDULE 
    getUserBookedLearnSlots = (id) => {
        return this.init().get(`${this.api_url}v2/userSlots/booked/${id}`);
    }

    //FEEDBACK
    postUserFeedback = (body) => {
        return this.init().post(`${this.api_url}ratings`, body)
    }

    getUserForTopic = (topicId) => {
        return this.init().get(`${this.api_url}topics/${topicId}/user`)
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

    getUserTopics = (id) => {
        return this.init().get(`${this.api_url}v2/topics/user/${id}`);
    };

    getTopicsByUserId = (userId) => {
        return this.init().get(`${this.api_url}topics/search/findByUserId`, { params: {userId : userId} })
    }

    getWalletByUserId = (userId) => {
        return this.init().get(`${this.api_url}wallets/search/findByUser_UserId`, { params: {userId : userId} })
    }

    getAvailableSlots = (id) => {
        return this.init().get(`${this.api_url}v2/userSlots/available/${id}`);
    }

    // getTopicsForTag = (tagId) => {
    //     return this.init().get(`${this.api_url}tags/${tagId}/topics`)
    // }

    // getBookedSlots = () => {
    //     return this.init().get(`${this.api_url}userSlots`)
    // }
}