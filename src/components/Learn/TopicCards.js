import React from "react";
import { useState, useEffect } from "react";
import Api from "../../api";
import { Row, Col, Card } from "react-bootstrap";
import './TopicCards.css'
import axios from "axios";

function TopicCards({tagId}) {
    const [topics, setTopics] = useState([])
    const [topicTutor, setTopicTutor] = useState({})
    const [isLoading, setLoading] = useState(true);
    const api = new Api();

    useEffect(() => {
        getTopicsAndTutors();
    },[]);

    async function getTopicsAndTutors() {
        let topicsList = []
        let topicIds = new Set()
        let topicTutor = {}

        let topicsResponse = await api.getTopicsForTag(tagId)
        let data = topicsResponse.data._embedded.topics

        Object.keys(data).forEach(function(key) {
            let topic = {}
            let val = data[key]
            topic.topicId = val.topicId
            topic.topicName = val.topicName
            topic.description = val.description
            topic.creditPerHr = val.creditPerHr
            topic.experienceLevel = val.experienceLevel
            topic.overallRating = val.overallRating
            topicsList.push(topic)
            topicIds.add(topic.topicId)
        })

        setTopics(topicsList)
        let tempTopicArr = Array.from(topicIds)
        let tempTutorArr = []

        await axios.all(tempTopicArr.map((topicId) => api.getUserForTopic(topicId))).then(
            axios.spread((...allData) => {
                tempTutorArr = allData
            })
        );

        Object.keys(tempTopicArr).forEach(function(key) {
            let topic = tempTopicArr[key]
            let user = tempTutorArr[key].data.userName
            topicTutor[topic] = user
        })

        setTopicTutor(topicTutor)
        setLoading(false)
    }

    if(isLoading) {
        return (
            <div style={{textAlign: "center", padding: "10px", fontFamily: "Solway"}}>
                <h1>Loading..</h1>
            </div>
        ) 
    }
    return (
        <>
        <Row xs={1} md={5} className="g-4">
        {topics.map((topic, idx) => (
            <Col key={topic.topicId}>
            <Card>
                <Card.Body>
                <Card.Title className = "card-title-custom">{topic.topicName}</Card.Title>
                <Card.Text className = "card-text-custom"> Rating: {topic.overallRating}/5 </Card.Text>
                <Card.Text className = "card-text-custom">Tutor: <a href="#" className="card-link-custom">{topicTutor[topic.topicId]}</a></Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        </>
    )
}

export default TopicCards;