import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import './TopicCards.css'
import { useNavigate } from "react-router-dom";

function TopicCards({topics}) {
    const navigate = useNavigate();

    return (
        <>
        <Row xs={1} md={5} className="g-4">
        {topics.map((topic) => (
            <Col key={topic.topicId}>
            <Card className = "topic-card" onClick={() => navigate(`/fp/course/${topic.topicId}`)}>
                <Card.Body>
                <Card.Title className = "card-title-custom">{topic.topicName}</Card.Title>
                <Card.Text className = "card-text-custom"> Rating: {topic.overallRating}/5 </Card.Text>
                <Card.Text className = "card-text-custom">Tutor: {topic.user.userName}</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
        </>
    )
}

export default TopicCards;