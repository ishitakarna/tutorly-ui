import React from "react";
import Api from "../../api";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

function TeachView() {
    const navigate = useNavigate();
    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
        navigate('/fp/login');
    }
    }, []);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleErr, setScheduleErr] = useState('');

    const [topics, setTopics] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [active, setActive] = useState(null);
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [course, setCourse] = useState({});
    const api = new Api();
    var userID = 7;

    useEffect(() => {
      getUserTopics();
    },[]);

    const chooseTopic = () => {
      alert("Selected")
    }

    function getUserTopics() {
      let topics = []
      let userLinks = []
      api.getUserTopics(userID).then(result => {
          console.log(result)
          let data = result.data
          Object.keys(data).forEach(function(key) {
              let topic = {}
              let val = data[key]
              topic.topicId = val.topicId
              topic.topicName = val.topicName
              topics.push(topic)
          })
          setTopics(topics)
          setLoading(false)
      })
    }

    const onChange = (e) => {
      setCourse({ ...course, [e.target.name]: e.target.value });
    };

    function addCourse(){
      var newCourse = {}

      newCourse.topicName = course.title;
      newCourse.description = course.desc;
      newCourse.creditPerHr = course.price;
      newCourse.experienceLevel = course.exp;
      newCourse.overallRating = course.rate;
      newCourse.user = `${api.api_url}users/${userID}`

      const topicURL = `${api.api_url}topics`
      axios.post(topicURL, newCourse)
        .then((response)=> console.log(response))
        .catch(error => console.log(error))
        .finally(() => {toggleShow();
          window.location.reload();})
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
          <MDBCardTitle className="MDBCardTitle">Courses Taught</MDBCardTitle>
          <hr style={{
              background: 'grey',
              color: 'grey',
              borderColor: 'grey',
              height: '2px',
              }}/>
          {topics.slice(0, 5).map((topic) =>
            <ListGroup className="listrow" key={topic.topicId}>
                <ListGroup.Item onClick={() => setActive(topic)}
                  className={`list-item ${active === topic && "active"}`}>
                    {topic.topicName}
                </ListGroup.Item>
            </ListGroup>
          )} 
          <br />
          <MDBBtn className='mb-4' size='md' type="submit" onClick={toggleShow}>ADD COURSES</MDBBtn>

          <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
            <MDBModalDialog>
              <MDBModalContent>
                <MDBModalHeader>
                  <MDBModalTitle>Course Details</MDBModalTitle>
                  <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                  <MDBInput wrapperClass='mb-4' label='Title' id='form3' type='text'
                    value={course.title}
                    name='title'
                    onChange={onChange}
                    required/>
                  <MDBInput wrapperClass='mb-4' label='Description' id='form4' type='text'
                    value={course.desc}
                    name='desc'
                    onChange={onChange}
                    required/>
                  <MDBRow>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Price, $' id='form1' type='text'
                        value={course.price}
                        name='price'
                        onChange={onChange}
                        required/>
                    </MDBCol>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Rating' id='form2' type='text'
                        value={course.rate}
                        name='rate'
                        onChange={onChange}
                        required/>
                    </MDBCol>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Experience' id='form2' type='text'
                        value={course.exp}
                        name='exp'
                        onChange={onChange}
                        required/>
                    </MDBCol>
                  </MDBRow>
                </MDBModalBody>

                <MDBModalFooter>
                  <MDBBtn color='secondary' onClick={toggleShow}>
                    Close
                  </MDBBtn>
                  <MDBBtn onClick={addCourse}>Add Course</MDBBtn>
                </MDBModalFooter>
              </MDBModalContent>
            </MDBModalDialog>
          </MDBModal>

        </MDBCardBody>
        <MDBCardBody>
            <MDBCardTitle className="MDBCardTitle">Time Slots</MDBCardTitle>
            <hr style={{
                background: 'grey',
                color: 'grey',
                borderColor: 'grey',
                height: '2px',
                }}/>
            <MDBCardText className="MDBCardText">Set your availability on your own terms. Here, you can select different time slots for your schedule.</MDBCardText>
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