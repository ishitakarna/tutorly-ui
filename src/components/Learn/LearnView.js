import React from "react";
import { useState, useEffect } from "react";
import Api from "../../api";
import { ListGroup } from "react-bootstrap";
import TopicCards from "./TopicCards";
import './LearnView.css'
import GroupCards from "./GroupCards";

function LearnView() {
    const [tags, setTags] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const api = new Api();

    useEffect(() => {
        getTags();
    },[]);

    function getTags() {
        let tags = []
        let topicLinks = []
        api.getTags().then(result => {
            let data = result.data._embedded.tags
            Object.keys(data).forEach(function(key) {
                let tag = {}
                let val = data[key]
                tag.tagId = val.tagId
                tag.tagName = val.tagName
                topicLinks.push(val._links.topics.href)
                tags.push(tag)
            })
            setTags(tags)
            setLoading(false)
        })
    }

    if(isLoading) {
        return (
            <div style={{textAlign: "center", padding: "10px"}}>
                <h1>Loading..</h1>
            </div>
        ) 
    }
    return (
        <>
        <div className = "learn-container">
        <div className = "group-container">
            <GroupCards tags = {tags}/>
        </div>
        {tags.map((tag) =>
            <ListGroup key={tag.tagId}>
                <ListGroup.Item className = "tag-container">{tag.tagName}</ListGroup.Item>
                <div className = "topics-container">
                    <TopicCards tagId = {tag.tagId}/>
                </div>
            </ListGroup>
        )}   
        </div>
        </>
    )
}

export default LearnView;