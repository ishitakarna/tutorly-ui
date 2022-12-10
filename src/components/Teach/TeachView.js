import React from "react";
import Api from "../../api";
import axios from "axios";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardSubTitle,
    MDBCardText,
    MDBBtn
  } from 'mdb-react-ui-kit';
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

function TeachView() {
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleErr, setScheduleErr] = useState('');

    const [topics, setTopics] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [active, setActive] = useState(null);
    const api = new Api();
    var userID = 1;

    useEffect(() => {
        getTopics();
    },[]);

    const chooseTopic = () => {
      alert("Selected")
    }

    function getTopics() {
      let topics = []
      let userLinks = []
      api.getTopics().then(result => {
          let data = result.data._embedded.topics
          Object.keys(data).forEach(function(key) {
              let topic = {}
              let val = data[key]
              topic.topicId = val.topicId
              topic.topicName = val.topicName
              userLinks.push(val._links.user.href)
              topics.push(topic)
          })
          setTopics(topics)
          setLoading(false)
      })
    }

    function timeSlotValidator(slotTime) {
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
        return isValid;
    }

    const handleScheduled = dateTime => {
        setIsScheduling(true);
        setScheduleErr('');

        let slotURL = `${api.api_url}userSlots`
        let userURL = `${api.api_url}users/${userID}`
        let userSlot = {}
        userSlot.slotDate = dateTime.getFullYear()+"-"+(Number(dateTime.getMonth())+1)+"-"+dateTime.getDate();
        userSlot.startTime = dateTime.getHours()+":00:00";
        userSlot.endTime = dateTime.getHours()+":00:00";
        userSlot.isBooked = false;
        userSlot.user = userURL;

        axios.post(slotURL, userSlot)
          .then(response => {
            setScheduleErr('');
            setIsScheduled(true);
            alert(response);
          })
          .catch(err => {
            setScheduleErr(err);
          })
          .finally(() => {
            setIsScheduling(false);
            setActive(false);
            //alert("Posted");
          });
      }

    return (
        <>
        <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Courses Taught</MDBCardTitle>
          <hr style={{
              background: 'grey',
              color: 'grey',
              borderColor: 'grey',
              height: '2px',
              }}/>
          <MDBCardText className="MDBCardText">Set your availability on your own terms. Here, you can select a topic and different time slots for your schedule.</MDBCardText>
          {topics.slice(0, 5).map((topic) =>
            <ListGroup className="listrow" key={topic.topicId}>
                <ListGroup.Item onClick={() => setActive(topic)}
                  className={`list-item ${active == topic && "active"}`}>
                    {topic.topicName}
                </ListGroup.Item>
            </ListGroup>
          )} 
        </MDBCardBody>
        <MDBCardBody>
            <MDBCardTitle>Time Slots</MDBCardTitle>
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
                confirmText={"Add Availability"}
                loadingText={"Adding Slot"}
                doneText={"Your Slot has been added."} />;
        </MDBCardBody>
        </MDBCard>
        </>
    )
}

export default TeachView;