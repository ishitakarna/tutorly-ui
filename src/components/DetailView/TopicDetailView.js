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
import {useNavigate} from 'react-router-dom';

function TopicDetailView() {
    const navigate = useNavigate();
    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
        navigate('/fp/login');
    }
    }, []);
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
        const sDate = slotTime.getFullYear()+"-"+slotTime.getMonth()+"-"+slotTime.getDate()

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

        api.getTopicUser(topicId)
        .then(res => {
            console.log(res)
            topic.topicName = res.data.topicName
            topic.description = res.data.description
            topic.creditPerHr = res.data.creditPerHr
            topic.overallRating = res.data.overallRating
            topic.user = res.data.user
            setTopicDetails(topic)

            api.getUserSlots(res.data.user.userId)
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
                <MDBCardTitle className="MDBCardHTitle">{topic.topicName}</MDBCardTitle>
                <MDBCardSubTitle className="MDBCardSubTitle">Taught By {topic.user.userName}</MDBCardSubTitle>
            </MDBCardBody>
            <MDBCardBody>
                <MDBCardTitle className="MDBCardTitle">Description</MDBCardTitle>
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
                <MDBCardTitle className="MDBCardTitle">Rating</MDBCardTitle>
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
                <MDBCardTitle className="MDBCardTitle">Cost</MDBCardTitle>
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
                <MDBCardTitle className="MDBCardTitle">Book A Slot</MDBCardTitle>
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