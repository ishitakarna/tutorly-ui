import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { useEffect } from "react";
import './GroupCards.css'

function GroupCards({tags}) {
    useEffect(() => {
        //console.log(Object.keys(tags).length)
    });

    return (
        <>
        <div className ="group-row">
        {tags.map((tag) => (
            <Col key={tag.tagId} className ="group-col">
                <Button className ="group-button-custom">
                    {tag.tagName}
                </Button>
            </Col>
        ))}
        </div>
        </>
    )
}

export default GroupCards;