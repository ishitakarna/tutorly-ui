import React from "react";
import { Tabs, Tab, Table, Button, Spinner } from "react-bootstrap";
import './ScheduleView.css'
import { useState, useEffect } from "react";
import Api from "../../api";
import { useNavigate } from 'react-router-dom';
import FeedbackModal from "./FeedbackModal";
import ModalView from "./ModalView"

function ScheduleView() {
    const navigate = useNavigate();
    const api = new Api();
    
    const email = localStorage.getItem('email');

    const [activeTeachBookings, setActiveTeachBookings] = useState([]);
    const [pastTeachBookings, setPastTeachBookings] = useState([]);
    const [activeLearnBookings, setActiveLearnBookings] = useState([]);
    const [pastLearnBookings, setPastLearnBookings] = useState([]);

    const [isLoading, setLoading] = useState(true);

    const [feedbackModalShow, setFeedbackModalShow] = useState(false);
    const [clickedInstance, setClickedInstance] = useState({})

    useEffect(() => {
        console.log(email)
        if (!email) {
            navigate('/fp/login');
        }
        else {
            getUserSlots()    
        }
    }, []);

    async function getUserSlots() {
        const userDetails = await api.getUserByEmail(email)
        let userId = userDetails.data.userId
        let teachSlotsActive = [], teachSlotsPast = []
        let learnSlotsActive = [], learnSlotsPast = []

        // Slots for teaching
        const tSlots = await api.getUserSlots(userId)
        Object.keys(tSlots.data).forEach(function(key) {
            let val = tSlots.data[key]
            // Booked slots
            if(val.isBooked === true) {
                let slot = {}
                slot.slotId = val.slotId
                slot.slotDate = val.slotDate
                slot.startTime = val.startTime
                slot.endTime = val.endTime
                slot.topic = val.topic.topicName
                slot.bookedBy = val.bookedByUser.userName
                if(isPast(slot.slotDate))
                    teachSlotsPast.push(slot)
                else
                    teachSlotsActive.push(slot)
            }
        })

        setActiveTeachBookings(teachSlotsActive)
        setPastTeachBookings(teachSlotsPast)

        // Slots booked for learning
        const lSlots = await api.getUserBookedLearnSlots(userId)
        Object.keys(lSlots.data).forEach(function(key) {
            let val = lSlots.data[key]
            let slot = {}
            slot.slotId = val.slotId
            slot.slotDate = val.slotDate
            slot.startTime = val.startTime
            slot.endTime = val.endTime
            slot.topic = val.topic.topicName
            slot.topicId = val.topic.topicId
            slot.tutorName = val.user.userName
            slot.tutorId = val.user.userId
            slot.userId = val.bookedByUser.userId
            if(isPast(slot.slotDate))
                learnSlotsPast.push(slot)
            else {
                learnSlotsActive.push(slot)
            }
        })

        setActiveLearnBookings(learnSlotsActive)
        setPastLearnBookings(learnSlotsPast)
        setLoading(false)
    }

    function isPast(date) {
        const today = new Date()
        if(new Date(date) < today)
            return true
        return false
    }

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
        <>
        <div className = "schedule-container">
            <h1>Teach Bookings</h1>
            <Tabs
            defaultActiveKey="upcoming"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
                <Tab eventKey="upcoming" title="Upcoming">
                    <div className="schedule-tab-container">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Slot ID</th>
                            <th>Topic</th>
                            <th>Slot Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Booked By</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {activeTeachBookings.map(slot =>
                                    <tr key={slot.slotId}>
                                        <td>{slot.slotId}</td>
                                        <td>{slot.topic}</td>
                                        <td>{slot.slotDate}</td>
                                        <td>{slot.startTime}</td>
                                        <td>{slot.endTime}</td>
                                        <td>{slot.bookedBy}</td>
                                    </tr>
                            )}
                        </tbody>
                    </Table>
                    </div>
                </Tab>
                <Tab eventKey="past" title="Past">
                    <div className="schedule-tab-container">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Slot ID</th>
                            <th>Topic</th>
                            <th>Slot Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Booked By</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {pastTeachBookings.map(slot =>
                                    <tr key={slot.slotId}>
                                        <td>{slot.slotId}</td>
                                        <td>{slot.topic}</td>
                                        <td>{slot.slotDate}</td>
                                        <td>{slot.startTime}</td>
                                        <td>{slot.endTime}</td>
                                        <td>{slot.bookedBy}</td>
                                    </tr>
                            )}
                        </tbody>
                    </Table>
                    </div>
                </Tab>
            </Tabs>

            <h1>Learn Bookings</h1>
            <Tabs
            defaultActiveKey="past"
            id="uncontrolled-tab-example"
            className="mb-3"
            >
                <Tab eventKey="upcoming" title="Upcoming">
                    <div className="schedule-tab-container">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Slot ID</th>
                            <th>Topic</th>
                            <th>Slot Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {activeLearnBookings.map(slot =>
                                    <tr key={slot.slotId}>
                                        <td>{slot.slotId}</td>
                                        <td>{slot.topic}</td>
                                        <td>{slot.slotDate}</td>
                                        <td>{slot.startTime}</td>
                                        <td>{slot.endTime}</td>
                                    </tr>
                            )}
                        </tbody>
                    </Table>
                    </div>
                </Tab>
                <Tab eventKey="past" title="Past">
                    <div className="schedule-tab-container">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Slot ID</th>
                            <th>Topic</th>
                            <th>Slot Date</th>
                            <th>Taught By</th>
                            <th>Feedback</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                            {pastLearnBookings.map(slot =>
                                    <tr key={slot.slotId} onClick={() => setClickedInstance(slot)}>
                                        <td>{slot.slotId}</td>
                                        <td>{slot.topic}</td>
                                        <td>{slot.slotDate}</td>
                                        <td>{slot.tutorName}</td>
                                        <td><Button className="feedback-button"
                                                    onClick={() => setFeedbackModalShow(true)}>Click Here</Button></td>
                                    </tr>
                            )}
                        </tbody>
                    </Table>
                    </div>
                </Tab>
            </Tabs>
            <ModalView
                show={feedbackModalShow}
                onHide={() => setFeedbackModalShow(false)}
                modalheading = "Feedback"
                modaldata = {<FeedbackModal 
                    slot = {clickedInstance} 
                    onHide={() => setFeedbackModalShow(false)}/>}
            />
        </div>
        </>
    )
}

export default ScheduleView;