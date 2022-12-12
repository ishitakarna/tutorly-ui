import React, {useEffect, useState} from 'react';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
} from 'mdb-react-ui-kit';
import {Rating} from "@mui/material";
import './ProfileView.scss';
import Api from "../../api";
import { Spinner } from 'react-bootstrap';


function ProfileView() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [degree, setDegree] = useState("")
    const [university, setUniversity] = useState("")
    const [credits, setCredits] = useState("")
    const [topicRatings, setTopicRatings] = useState([])
    const [isLoading, setLoading] = useState(true)
    const api = new Api()

    useEffect(() => {
        let userEmail = localStorage.getItem("email")
        setEmail(userEmail)
        
        api.getUserByEmail(userEmail).then(result => {
            let user = result.data
            setName(user.userName)
            setPhone(user.phoneNumber)
            setDegree(user.userDegree)
            setUniversity(user.university)
            let userId = user.userId

            api.getWalletByUserId(userId).then(result => {
                setCredits(result.data.credit)
            })
            api.getTopicsByUserId(userId).then(result => {
                let topics = result.data._embedded.topics
                setTopicRatings(topics.map(val => ({
                    topicName: val.topicName,
                    overallRating: val.overallRating
                })))
                setLoading(false)
            })
        })
    }, []);

    if(isLoading) {
        return (
            <div style={{textAlign: "center", padding: "100px" ,fontFamily: "Solway"}}>
                <Spinner animation="border" variant="primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        ) 
    }
    return (
        <section style={{ fontFamily: "Solway"}}>
            <MDBContainer className="py-5">
                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <MDBCardImage
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6.webp"
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: '150px' }}
                                    fluid />
                                <p className="mt-3 card-name">{name}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBCardText className="mb-4 heading">Profile Details</MDBCardText>
                                <div>
                                    <MDBRow>
                                        <MDBCol sm="5">
                                            <MDBCardText className='left-margin'>Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted left">{name}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="5">
                                            <MDBCardText className='left-margin'>Email</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted left">{email}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="5">
                                            <MDBCardText className='left-margin'>Phone</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted left">{phone}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="5">
                                            <MDBCardText className='left-margin'>Degree</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted left">{degree}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="5">
                                            <MDBCardText className='left-margin'>University</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted left">{university}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                    <hr />
                                    <MDBRow>
                                        <MDBCol sm="5">
                                            <MDBCardText className='left-margin'>Credits</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="7">
                                            <MDBCardText className="text-muted left">${credits}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                {topicRatings ?

                <MDBRow className="ratings-container">
                    <MDBCol lg="8">
                        <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <MDBCardText className="mb-4 heading">Topic Ratings</MDBCardText>
                                {
                                    topicRatings.map((item, index) => {
                                    return (
                                    <div key={index}>
                                        <MDBRow key={index}>
                                            <MDBCol sm="5">
                                                <MDBCardText className="left-margin">{item.topicName}</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="7" className = "ratings-col left">
                                                <Rating name="read-only" value={item.overallRating} readOnly
                                                        precision={0.5} size="medium"/>
                                            </MDBCol>
                                        </MDBRow>
                                        {index < topicRatings.length-1 ? <hr /> : <></> }
                                    </div>
                                    )
                                })}
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            : <div></div>}
            </MDBContainer>
        </section>
    );
}

export default ProfileView;