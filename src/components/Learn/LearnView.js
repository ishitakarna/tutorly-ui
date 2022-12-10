import React from 'react';
import { useState, useEffect } from "react";
import Api from "../../api";
import { ListGroup } from "react-bootstrap";
import TopicCards from "./TopicCards";
import './LearnView.css'
import {useNavigate} from 'react-router-dom';
import GroupCards from "./GroupCards";

function LearnView() {

    const navigate = useNavigate();
    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
        navigate('/fp/login');
    }
    }, []);

    const [tags, setTags] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [filterCondition, setFilterCondition] = useState("");
    const [filteredTags, setFilteredTags] = useState([]);
    const api = new Api();

    useEffect(() => {
        getTags();
    }, []);

    useEffect(() => {
        filterTags();
    }, [filterCondition]); // eslint-disable-line react-hooks/exhaustive-deps

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
            setFilteredTags(tags)
            setLoading(false)
        })
    }

    function filterTags() {
        console.log("Filter tags called")
        let filtered = tags.filter(tag => tag.tagName.includes(filterCondition));
        setFilteredTags(filtered)
    }

    if(isLoading) {
        return (
            <div style={{textAlign: "center", padding: "10px" , fontFamily: "Solway"}}>
                <h1>Loading..</h1>
            </div>
        ) 
    }
    return (
        <>
        <div className = "learn-container">
        <div className = "group-container">
            <GroupCards tags = {tags} filterCondition = {filterCondition} setFilterCondition = {setFilterCondition}/>
        </div>
        {filteredTags.map((tag) =>
            <ListGroup key={tag.tagId}>
                <ListGroup.Item className = "tag-container">{tag.tagName}</ListGroup.Item>
                { (filterCondition === "") ? 
                    <div className = "topics-container">
                        {/* <Suspense fallback={Loader}> */}
                            <TopicCards tagId = {tag.tagId}/>
                        {/* </Suspense> */}
                    </div> :
                    <div>
                        <TopicCards tagId = {tag.tagId}/>
                    </div> 
                }   
            </ListGroup>
        )}   
        </div>
        </>
    )
}

export default LearnView;