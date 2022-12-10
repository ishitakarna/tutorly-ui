import {
    json,
    useParams
  } from "react-router-dom";  
import React from "react";
import { useState, useEffect } from "react";
import Api from "../../api";
import { Button } from "react-bootstrap";
import axios from "axios";
import './Detail.scss'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardSubTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn
  } from 'mdb-react-ui-kit';
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

function TopicDetailView() {
    let { id } = useParams();
    const api = new Api();
    const [topic, setTopicDetails] = useState({
        topicName : '',
        description : '',
        creditPerHr : '',
        experienceLevel : '',
        overallRating : '',
        user : {}
    });
    const [isLoading, setLoading] = useState(true);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleErr, setScheduleErr] = useState('');
    const [slots, setSlot] = useState('');

    function fakeRequest(data) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            // Uncomment below to trigger error:
            //return reject('Error: KABOOM!');
            resolve({
              status: 'ok',
              scheduled: data
            });
          }, 2e3);
        });
      }

    function mockAnswer() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              // Uncomment below to trigger error:
              //return reject('Error: KABOOM!');
              resolve({
                topicId: 46,
                user: {
                    userId: 1,
                    userName: "Aditya K",
                    email: "aditya@illinois.edu",
                    university: "UIUC",
                    userDegree: "MCS",
                    phoneNumber: "9876543211"
                },
                topicName: "Time Complexity",
                description: "Learn basics of time complexity",
                creditPerHr: 10.0,
                experienceLevel: 5.0,
                overallRating: 4.5
            });
            }, 2e3);
          });
    }

    function mockSlot() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
              // Uncomment below to trigger error:
              //return reject('Error: KABOOM!');
              resolve([
                {
                    "slotId": 106,
                    "user": {
                        "userId": 1,
                        "userName": "Aditya K",
                        "email": "aditya@illinois.edu",
                        "university": "UIUC",
                        "userDegree": "MCS",
                        "phoneNumber": "9876543211"
                    },
                    "topic": null,
                    "slotDate": "2022-12-02",
                    "startTime": "12:00:00",
                    "endTime": "13:00:00",
                    "isBooked": false,
                    "bookedByUser": null
                },
                {
                    "slotId": 116,
                    "user": {
                        "userId": 1,
                        "userName": "Aditya K",
                        "email": "aditya@illinois.edu",
                        "university": "UIUC",
                        "userDegree": "MCS",
                        "phoneNumber": "9876543211"
                    },
                    "topic": {
                        "topicId": 46,
                        "user": {
                            "userId": 1,
                            "userName": "Aditya K",
                            "email": "aditya@illinois.edu",
                            "university": "UIUC",
                            "userDegree": "MCS",
                            "phoneNumber": "9876543211"
                        },
                        "topicName": "Time Complexity",
                        "description": "Learn basics of time complexity",
                        "creditPerHr": 10.0,
                        "experienceLevel": 5.0,
                        "overallRating": 4.5
                    },
                    "slotDate": "2022-12-10",
                    "startTime": "12:00:00",
                    "endTime": "13:00:00",
                    "isBooked": true,
                    "bookedByUser": {
                        "userId": 10,
                        "userName": "Nikhil S",
                        "email": "nikhil@illinois.edu",
                        "university": "NEU",
                        "userDegree": "MSCS",
                        "phoneNumber": "9876543210"
                    }
                },
                {
                    "slotId": 117,
                    "user": {
                        "userId": 1,
                        "userName": "Aditya K",
                        "email": "aditya@illinois.edu",
                        "university": "UIUC",
                        "userDegree": "MCS",
                        "phoneNumber": "9876543211"
                    },
                    "topic": {
                        "topicId": 46,
                        "user": {
                            "userId": 1,
                            "userName": "Aditya K",
                            "email": "aditya@illinois.edu",
                            "university": "UIUC",
                            "userDegree": "MCS",
                            "phoneNumber": "9876543211"
                        },
                        "topicName": "Time Complexity",
                        "description": "Learn basics of time complexity",
                        "creditPerHr": 10.0,
                        "experienceLevel": 5.0,
                        "overallRating": 4.5
                    },
                    "slotDate": "2022-12-11",
                    "startTime": "12:00:00",
                    "endTime": "13:00:00",
                    "isBooked": true,
                    "bookedByUser": {
                        "userId": 9,
                        "userName": "Anu N",
                        "email": "anu@illinois.edu",
                        "university": "UMich",
                        "userDegree": "MSCS",
                        "phoneNumber": "9987654321"
                    }
                },
                {
                    "slotId": 118,
                    "user": {
                        "userId": 1,
                        "userName": "Aditya K",
                        "email": "aditya@illinois.edu",
                        "university": "UIUC",
                        "userDegree": "MCS",
                        "phoneNumber": "9876543211"
                    },
                    "topic": null,
                    "slotDate": "2022-12-12",
                    "startTime": "12:00:00",
                    "endTime": "13:00:00",
                    "isBooked": false,
                    "bookedByUser": null
                }
            ]);
            }, 2e3);
          });
    }

    function timeSlotValidator(slotTime) {
        var isBooked = false;
        const startTime = new Date(
            slotTime.getFullYear(),
            slotTime.getMonth(),
            slotTime.getDate(),
            9,
            0,
            0
        );
        const endTime = new Date(
            slotTime.getFullYear(),
            slotTime.getMonth(),
            slotTime.getDate(),
            17,
            0,
            0
        );
        //alert(slotTime.getTime);
        const isValid = (slotTime.getTime() >= startTime.getTime()) && (slotTime.getTime() <= endTime.getTime());
        //const Month = Number(slotTime.getMonth())+1
        const sDate = slotTime.getFullYear()+"-"+slotTime.getMonth()+"-"+slotTime.getDate()
        //console.log(slotTimeDate.getTime());

        slots.map((slot) =>  {
            //alert()
            //console.log(slot.slotDate)
            //console.log(slot.slotDate === slotTimeDate)
            const mDate = slot.slotDate.slice(0,4)+"-"+(Number(slot.slotDate.slice(5,7))-1)+"-"+slot.slotDate.slice(8);
            //console.log(sDate === mDate);
            if(sDate === mDate){
                //console.log(sDate, mDate, slot.startTime, (slotTime.getHours()+":00:00"))
                if(slot.startTime === (slotTime.getHours()+":00:00")) {
                    console.log(slot.startTime === (slotTime.getHours()+":00:00"))
                    console.log(slot.isBooked === true)
                    if(slot.isBooked === true) {
                        isBooked = true;
                    }
                }   
            }
        }
        );
        //console.log(slotTime.getHours(), isBooked)
        return (isValid && !isBooked)
        //return isValid;
    }

    const handleScheduled = dateTime => {
        setIsScheduling(true);
        setScheduleErr('');
        const bookedUserID = 2;
        let slotURL = `${api.api_url}userSlots`
        let userURL = `${api.api_url}users/${topic.user.userId}`
        let topicURL = `${api.api_url}topics/${id}`
        let bookedURL = `${api.api_url}users/${bookedUserID}`
        let updatedSlot = {}
        updatedSlot.slotDate = dateTime.getFullYear()+"-"+dateTime.getMonth()+"-"+dateTime.getDate();
        updatedSlot.startTime = dateTime.getHours()+":00:00";
        updatedSlot.endTime = dateTime.getHours()+1+":00:00";
        updatedSlot.isBooked = true;
        updatedSlot.user = userURL;
        updatedSlot.topic = topicURL;
        updatedSlot.bookedByUser = bookedURL;

        axios.post(slotURL, updatedSlot)
        //fakeRequest(dateTime)
          .then(json => {
            setScheduleErr('');
            setIsScheduled(true);
            console.log(json);
          })
          .catch(err => {
            setScheduleErr(err);
          })
          .finally(() => {
            setIsScheduling(false);
          });
        }

    useEffect(() => {
        getTopicDetails();
    },[]);

    function getTopicDetails() {
        var topicId = String(Number(id));
        //alert(client);

        api.getTopicUser(topicId)
        //mockAnswer()
        .then(res => {
            //alert("Got"+res)
            console.log(res)
            topic.topicName = res.data.topicName
            topic.description = res.data.description
            topic.creditPerHr = res.data.creditPerHr
            topic.overallRating = res.data.overallRating
            topic.user = res.data.user
            /*topic.topicName = res.topicName
            topic.description = res.description
            topic.creditPerHr = res.creditPerHr
            topic.overallRating = res.overallRating
            topic.user = res.user*/
            //alert(topic.description);
            setTopicDetails(topic)

            api.getUserSlots(res.data.user.userId)
            //mockSlot()
            .then(result => {
                console.log(result)
                let res = result.data
                let slots = []
                Object.keys(res).forEach(function(key) {
                    let slot = {}
                    let val = res[key]
                    slot.slotId = val.slotId;
                    slot.slotDate = val.slotDate;
                    slot.startTime = val.startTime;
                    slot.isBooked = val.isBooked;
                    //alert(val.slotId)
                    slots.push(slot);
                })
                setSlot(slots)
            })
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
        <MDBCard>
            <MDBCardBody>
                <MDBCardTitle className="MDBCardTitle">{topic.topicName}</MDBCardTitle>
                <MDBCardSubTitle className="MDBCardTitle">Taught By {topic.user.userName}</MDBCardSubTitle>
            </MDBCardBody>
            <MDBCardBody>
                <MDBCardTitle>Description</MDBCardTitle>
                <hr style={{
                    background: 'grey',
                    color: 'grey',
                    borderColor: 'grey',
                    height: '2px',
                    }}/>
                <MDBCardText className="MDBCardText">{topic.description}.</MDBCardText>
            </MDBCardBody>
            <MDBRow>
            <MDBCol sm='6'>
            <MDBCardBody>
                <MDBCardTitle>Rating</MDBCardTitle>
                <hr style={{
                    background: 'grey',
                    color: 'grey',
                    borderColor: 'grey',
                    height: '2px',
                    }}/>
                <MDBCardText className="MDBCardText">{topic.overallRating}</MDBCardText>
            </MDBCardBody>
            </MDBCol>
            <MDBCol sm='6'>
            <MDBCardBody>
                <MDBCardTitle>Cost</MDBCardTitle>
                <hr style={{
                    background: 'grey',
                    color: 'grey',
                    borderColor: 'grey',
                    height: '2px',
                    }}/>
                <MDBCardText className="MDBCardText">${topic.creditPerHr} per Hour</MDBCardText>
            </MDBCardBody>
            </MDBCol>
            </MDBRow>
            <MDBCardBody>
                <MDBCardTitle>Book A Slot</MDBCardTitle>
                <hr style={{
                    background: 'grey',
                    color: 'grey',
                    borderColor: 'grey',
                    height: '2px',
                    }}/>
                <DayTimePicker timeSlotSizeMinutes={60} 
                    onConfirm={handleScheduled}
                    isLoading={isScheduling}
                    isDone={isScheduled}
                    err={scheduleErr}
                    timeSlotValidator={timeSlotValidator} 
                    doneText={"Thank You, Your session has been scheduled! Details have been sent to your mail."}/>;
            </MDBCardBody>
        </MDBCard>
        </>
    )
}

export default TopicDetailView;