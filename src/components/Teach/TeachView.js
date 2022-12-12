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
import Select from 'react-select'
import { useState, useEffect } from "react";
import { ListGroup, Table } from "react-bootstrap";
import DayTimePicker from '@mooncake-dev/react-day-time-picker';

function TeachView() {
    const api = new Api();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduled, setIsScheduled] = useState(false);
    const [scheduleErr, setScheduleErr] = useState('');

    const [topics, setTopics] = useState([]);
    const [tags, setTags] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [active, setActive] = useState(null);
    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);
    const [course, setCourse] = useState({});
    const [tagIds, setTagIds] = useState([]); 
    const [slots, setSlot] = useState('');
    const [availSlots, setAvailSlot] = useState([]);

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (!email) {
            navigate('/fp/login');
        } else {
            let userId;
            api.getUserByEmail(email)
            .then(result => {
              let user = result.data
              userId = user.userId
              setCurrentUser(result.data.userId);
              console.log(userId);
              getUserTopics(userId);
              getTags();
              getAvailableSlots(userId);
            }).catch(err => {
              console.log(err);
            })
        }
    },[]);

    const chooseTopic = () => {
      alert("Selected")
    }

    function getUserTopics(currentUser) {
      let topics = []
      let userLinks = []
      api.getUserTopics(currentUser).then(result => {
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

          api.getUserSlots(currentUser)
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
      })
    }

    function getTags() {
      let tags = []
      api.getTags().then(result => {
          let data = result.data
          Object.keys(data).forEach(function(key) {
              let tag = {}
              let val = data[key]
              tag.value = val.tagId
              tag.label = val.tagName
              tags.push(tag)
          })
          setTags(tags)
          setLoading(false)
      })
    }

    function getAvailableSlots(userId) {
      api.getAvailableSlots(userId)
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
                    slot.endTime = val.endTime;
                    slots.push(slot);
                })
                setAvailSlot(slots)
            }).catch((err) => console.log(err))
    }

    const onChange = (e) => {
      setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleSelect = (e) => {
      setTagIds(Array.isArray(e) ? e.map(x => x.value) : []);
      //console.log(tagIds)
    }

    function addCourse(){
      var newCourse = {}

      newCourse.topicName = course.title;
      newCourse.description = course.desc;
      newCourse.creditPerHr = course.price;
      newCourse.experienceLevel = course.exp;
      newCourse.user = `${api.api_url}users/${currentUser}`

      const topicURL = `${api.api_url}topics`
      const tagURL = `${api.api_url}v2/tags`
      axios.post(topicURL, newCourse)
      .then((response)=> {
        console.log("First post", response);
        var tags = {}

        tags.tagIds = tagIds;
        tags.topicId = response.data.topicId;
        axios.post(tagURL, tags)
        .then(json => {
          console.log(json);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(error => console.log(error))
      .finally(() => {toggleShow();
        window.location.reload();
      })
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
        const sDate = slotTime.getFullYear()+"-"+slotTime.getMonth()+"-"+slotTime.getDate()

        slots.map((slot) =>  {
          const mDate = slot.slotDate.slice(0,4)+"-"+(Number(slot.slotDate.slice(5,7))-1)+"-"+slot.slotDate.slice(8);
            if(sDate === mDate){
                //console.log(sDate, mDate, slot.startTime, (slotTime.getHours()+":00:00"))
                if(slot.startTime === (slotTime.getHours()+":00:00")) {
                    if(slot.isBooked === true) {
                        isBooked = true;
                    }
                }   
            }
        });
        //console.log(slotTime.getHours(), isBooked)
        return (isValid && !isBooked)
    }

    const handleScheduled = dateTime => {
        setIsScheduling(true);
        setScheduleErr('');

        let slotURL = `${api.api_url}userSlots`
        let userURL = `${api.api_url}users/${currentUser}`
        let userSlot = {}
        userSlot.slotDate = dateTime.getFullYear()+"-"+(Number(dateTime.getMonth())+1)+"-"+dateTime.getDate();
        userSlot.startTime = dateTime.getHours()+":00:00";
        userSlot.endTime = (Number(dateTime.getHours())+1)+":00:00";
        userSlot.isBooked = false;
        userSlot.user = userURL;

        axios.post(slotURL, userSlot)
          .then(response => {
            setScheduleErr('');
            setIsScheduled(true);
            //console.log(response);
          })
          .catch(err => {
            setScheduleErr(err);
          })
          .finally(() => {
            setIsScheduling(false);
            setActive(false);
            window.location.reload();
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
          {topics.map((topic) =>
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
                  <Select placeholder="Select Tags" isMulti options={tags} onChange={handleSelect}/> <br />
                  <MDBRow>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Price, $' id='form1' type='text'
                        value={course.price}
                        name='price'
                        onChange={onChange}
                        required/>
                    </MDBCol>
                    <MDBCol col='4'>
                      <MDBInput wrapperClass='mb-4' label='Experience, Years' id='form2' type='text'
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
            <MDBCardTitle className="MDBCardTitle">Set Up Your Work Schedule</MDBCardTitle>
            <hr style={{
                background: 'grey',
                color: 'grey',
                borderColor: 'grey',
                height: '2px',
                }}/>
            <MDBCardText className="MDBCardText">Set your availability on your own terms. Select a date and time when you will be available for your clients for booking appointments with you.</MDBCardText>
            <DayTimePicker timeSlotSizeMinutes={60} 
                onConfirm={handleScheduled}
                isLoading={isScheduling}
                isDone={isScheduled}
                err={scheduleErr}
                timeSlotValidator={timeSlotValidator}
                confirmText={"Add Availability"}
                loadingText={"Adding Slot"}
                doneText={"Your Slot has been added."} />
        </MDBCardBody>
        <MDBCardBody>
            <MDBCardTitle className="MDBCardTitle">My Availability</MDBCardTitle>
            <hr style={{
                background: 'grey',
                color: 'grey',
                borderColor: 'grey',
                height: '2px',
                }}/>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Slot ID</th>
                  <th>Slot Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
                        
              <tbody>
                {availSlots.map((slot) =>
                  <tr key={slot.slotId}>
                      <td>{slot.slotId}</td>
                      <td>{slot.slotDate}</td>
                      <td>{slot.startTime}</td>
                      <td>{slot.endTime}</td>
                  </tr>
                )}
              </tbody>
          </Table>
        </MDBCardBody>
        </MDBCard>
        </>
    )
}

export default TeachView;