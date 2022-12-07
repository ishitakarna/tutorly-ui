import React from "react";
import { useState, useEffect } from "react";
import Api from "../../api";
import { Row, Col, Card } from "react-bootstrap";
import './TopicCards.css'

function TopicCards({tagId}) {
    const [topics, setTopics] = useState([])
    const [isLoading, setLoading] = useState(true);
    const api = new Api();

    useEffect(() => {
        //getTopicsAndTutors();
    },[]);

    function getTopicsAndTutors() {
        let topics = []
        api.getTopicsForTag(tagId).then(result => {
            let data = result.data._embedded.topics
            Object.keys(data).forEach(function(key) {
                let topic = {}
                let val = data[key]
                topic.topicId = val.topicId
                topic.topicName = val.topicName
                topic.description = val.description
                topic.creditPerHr = val.creditPerHr
                topic.experienceLevel = val.experienceLevel
                topic.overallRating = val.overallRating
                topics.push(topic)

                api.getUserForTopic(topic.topicId).then(result => {
                    let data = result.data
                    console.log(data)
                    //topic.tutorName 
                })
            })
            setTopics(topics)

            setLoading(false)
            console.log(topics)
        })
    }

    if(!isLoading) {
        return (
            <div style={{textAlign: "center", padding: "10px"}}>
                <h1>Loading..</h1>
            </div>
        ) 
    }
    return (
        <>
        <Row xs={1} md={5} className="g-4">
        {Array.from({ length: 20 }).map((_, idx) => (
            <Col>
            <Card>
                <Card.Body>
                <Card.Title className = "card-title-custom">React basics</Card.Title>
                <Card.Text className = "card-text-custom"> Rating: 4.5/5 </Card.Text>
                <Card.Text className = "card-text-custom">Tutor: <a href="#" className="card-link-custom">John Doe</a></Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        </>
    )
}

export default TopicCards;