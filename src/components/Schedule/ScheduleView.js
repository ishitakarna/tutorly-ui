import React from "react";
import { Table } from "react-bootstrap";
import './ScheduleView.css'
import { useState, useEffect } from "react";
import Api from "../../api";
import { useNavigate } from 'react-router-dom';

function ScheduleView() {

    const navigate = useNavigate();
    useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
        navigate('/fp/login');
    }
    }, []);
    
    const [activeBookings, setActiveBookings] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const api = new Api();
    const temp = [1, 2, 3, 4, 5]
    
    useEffect(() => {
        getBookedSlots();
    }, []);

    function getBookedSlots() {
        let active = []
        let past = []
        api.getBookedSlots().then((result) => {
            let data = result.data._embedded.userSlots
            Object.keys(data).forEach(function(key) {
                let val = data[key]
                if(val.isBooked == true) {
                    let slot = {}
                    slot.slotId = val.slotId
                    slot.slotDate = val.slotDate
                    slot.startTime = val.startTime
                    slot.endTime = val.endTime
                    slot._links = val._links
                    if(isPast(slot.slotDate))
                        past.push(slot)
                    else
                        active.push(slot)
                }
            })
            setActiveBookings(active)
            setPastBookings(past)
            setLoading(false)
        })
    }

    function isPast(date) {
        const today = new Date()
        if(date < today)
            return true
        return false
    }

    if(isLoading) {
        return (
            <div style={{textAlign: "center", padding: "10px" ,fontFamily: "Solway"}}>
                <h1>Loading..</h1>
            </div>
        ) 
    }
    return (
        <>
        <div className = "schedule-container">
            <h1>Active Bookings</h1>
            <hr></hr>
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
                    {activeBookings.map(slot =>
                            <tr key={slot.slotId}>
                                <td>{slot.slotId}</td>
                                <td>{slot.slotDate}</td>
                                <td>{slot.startTime}</td>
                                <td>{slot.endTime}</td>
                            </tr>
                    )}
                </tbody>
            </Table>

            <h1>Past Bookings</h1>
            <hr></hr>
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
                    {pastBookings.map(slot =>
                            <tr key={slot.slotId}>
                                <td>{slot.slotId}</td>
                                <td>{slot.slotDate}</td>
                                <td>{slot.startTime}</td>
                                <td>{slot.endTime}</td>
                            </tr>
                    )}
                </tbody>
            </Table>
        </div>
        </>
    )
}

export default ScheduleView;