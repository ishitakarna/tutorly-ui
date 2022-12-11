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


function ProfileView() {

    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [degree, setDegree] = useState("")
    const [university, setUniversity] = useState("")
    const [credits, setCredits] = useState("")
    const [topicRatings, setTopicRatings] = useState([])
    const api = new Api()

    useEffect(() => {
        let userEmail = localStorage.getItem("email")
        setEmail(userEmail)
        let userId
        api.getUserByEmail(userEmail).then(result => {
            let user = result.data
            setName(user.userName)
            setPhone(user.phoneNumber)
            setDegree(user.userDegree)
            setUniversity(user.university)
            userId = user.userId

            api.getWalletByUserId(userId).then(result => {
                setCredits(result.data.credit)
            })
            api.getTopicsByUserId(userId).then(result => {
                let topics = result.data._embedded.topics
                console.log(topics.map(val => ({
                    topicName: val.topicName,
                    overallRating: val.overallRating
                })))
                setTopicRatings(topics.map(val => ({
                    topicName: val.topicName,
                    overallRating: val.overallRating
                })))
            })
        })
    }, []);

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
                                <p className="mt-3">{university}</p>
                                <p className="mt-0">{degree}</p>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBCardText className="mb-4" size="large" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Profile Details</MDBCardText>
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText style={{fontSize: '1.1rem'}}>Name</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{name}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText style={{fontSize: '1.1rem'}}>Email</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{email}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText style={{fontSize: '1.1rem'}}>Phone</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{phone}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText style={{fontSize: '1.1rem'}}>Degree</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{degree}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText style={{fontSize: '1.1rem'}}>University</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">{university}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="4">
                                        <MDBCardText style={{fontSize: '1.1rem'}}>Credits</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="8">
                                        <MDBCardText className="text-muted">${credits}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>

                {topicRatings ?

                <MDBRow className="ratings-container">
                    <MDBCol lg="8">
                        <MDBCard className="mb-4 mb-md-0">
                            <MDBCardBody>
                                <MDBCardText className="mb-4" size="large" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>Topic Ratings</MDBCardText>
                                {
                                    topicRatings.map((item, index) => {
                                    return (
                                        <>
                                    <MDBRow key={index}>
                                        <MDBCol sm="4">
                                            <MDBCardText className="mb-1"
                                                         style={{fontSize: '1.1rem'}}>{item.topicName}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol sm="8">
                                            <Rating name="read-only" value={item.overallRating} readOnly
                                                    precision={0.5} size="medium"/>
                                        </MDBCol>
                                    </MDBRow>
                                    {index < topicRatings.length-1 ? <hr /> : <></> }
                                    </>
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