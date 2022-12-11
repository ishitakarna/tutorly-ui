import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './SearchView.css'
import { ListGroup, Card } from "react-bootstrap";
import Api from "../../api";
import { useState, useEffect } from "react";
import ReactStars from 'react-stars'

function SearchView() {
    const { search } = useLocation();
    const searchText = search.split("=")[1].replaceAll("%20", ' ');
    const [searchTopicResults, setSearchTopicResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const [sortType, setSortType] = useState("Ascending");
    const api = new Api();
    const navigate = useNavigate();

    useEffect(() => {
        getTags();
    }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const handleSort = (order, column) => {
            let sorted = []
            if(order === "Ascending")
                sorted = searchTopicResults.sort(
                    (a, b) => 
                        (a[column] === null ? 0 : parseFloat(a[column])) - 
                        (b[column] === null ? 0 : parseFloat(b[column])))
            else 
                sorted = searchTopicResults.sort(
                    (a, b) => 
                    (b[column] === null ? 0 : parseFloat(b[column])) - 
                    (a[column] === null ? 0 : parseFloat(a[column])))
            setSortedResults([...sorted]);
        }

        if(sortOption.length !== 0)
            handleSort(sortType, sortOption);
    }, [searchTopicResults, sortOption, sortType]);

    function getTags() {
        let searchResults = []
        let topicIds = {}
        setSortOption("")
        setSortType("Ascending")
        api.getTags().then(result => {
            let data = result.data
            Object.keys(data).forEach(function(key) {
                let val = data[key]
                let topics = val.topics
                Object.keys(topics).forEach(function(key) {
                    let topicInfo = topics[key]
                    if(topicInfo.topicName.toLowerCase().includes(searchText.toLowerCase()) ||
                        topicInfo.description.toLowerCase().includes(searchText.toLowerCase())) {
                        if(topicIds[topicInfo.topicId] === undefined || topicIds[topicInfo.topicId] !== true) {
                            searchResults.push(topicInfo)
                            topicIds[topicInfo.topicId] = true
                        }
                    }
                })
            })
            setSearchTopicResults(searchResults)
            setSortedResults(searchResults)
            setLoading(false)
        })
    }

    return (
        <>
        <div className = "search-vertical-container">
            <div className = "sorting-div">
                <h1>Sort By</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <div className="radio">
                            <label>
                                <input type="radio" value="overallRating" checked={sortOption === "overallRating"} 
                                    onChange = {(e) => setSortOption(e.target.value)}/>
                                <span>Rating</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="experienceLevel" checked={sortOption === "experienceLevel"} 
                                    onChange = {(e) => setSortOption(e.target.value)}/>
                                <span>Experience</span>
                            </label>
                            </div>
                        </form>
                    </div>
                </div>
                <h1>Type</h1>
                <div className="row">
                    <div className="col-sm-12">
                        <form>
                            <div className="radio">
                            <label>
                                <input type="radio" value="Ascending" checked={sortType === "Ascending"} 
                                    onChange = {(e) => setSortType(e.target.value)}/>
                                <span>Ascending</span>
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="Descending" checked={sortType === "Descending"} 
                                    onChange = {(e) => setSortType(e.target.value)}/>
                                <span>Descending</span>
                            </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className = "results-div">
            {isLoading ? 
                <div style={{textAlign: "center", padding: "10px" , fontFamily: "Solway"}}>
                    <h1>Loading..</h1>
                </div> :
                
                sortedResults.map((topic) =>
                    <ListGroup key={topic.topicId}>
                        <Card className = "search-card" onClick={() => navigate(`/fp/course/${topic.topicId}`)}>
                            <Card.Body>
                            <Card.Title className = "search-card-title">{topic.topicName}</Card.Title>
                            <ReactStars
                                        count={5}
                                        value={topic.overallRating}
                                        size={20}
                                        edit={false}
                                        color2={'#FFB81C'}/>
                            <p>{topic.description}</p>
                            <p> Tutor experience: <span style={{fontWeight: "bold"}}>{topic.experienceLevel}</span></p>
                            </Card.Body>
                        </Card>
                    </ListGroup>
                )}   
            </div>
        </div>
        </>
    )
}

export default SearchView;