import React from "react";
import { Col, Button } from "react-bootstrap";
import './GroupCards.css'

function GroupCards({tags, filterCondition, setFilterCondition}) {

    function handleGroupClick(e) {
        const val = e.target.value
        const index = filterCondition.indexOf(val)
        if (index > -1) { 
            e.target.style.backgroundColor = "#3B71CA"
            e.target.style.color = "white"
            filterCondition.splice(index, 1)  
        }
        else {
            e.target.style.backgroundColor = "lavender"
            e.target.style.color = "black"
            filterCondition.push(val)
        }
        setFilterCondition([...filterCondition])
    }

    return (
        <>
        <div className ="group-row">
        {tags.map((tag) => (
            <Col key={tag.tagId} className ="group-col">
                <Button className ="group-button-custom" value = {tag.tagName} onClick={(e) => handleGroupClick(e)}>
                {tag.tagName}
                </Button>
            </Col>
        ))}
        </div>
        </>
    )
}

export default GroupCards;