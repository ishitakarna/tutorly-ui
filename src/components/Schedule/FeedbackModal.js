import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import ReactStars from "react-stars";
import './FeedbackModal.css'
import Api from "../../api";

function FeedbackModal({slot, onHide}) {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const api = new Api();

  function handleSubmit() {
    if(rating === 0 && feedback === "") {
      alert("Please provide some feedback to submit!")
    }
    else {
      let body = {}

      body.rating = rating
      body.description = feedback
      body.topic = `${api.api_url}topics/${slot.topicId}`
      body.user = `${api.api_url}users/${slot.userId}`
      body.tutor = `${api.api_url}users/${slot.tutorId}`

      api.postUserFeedback(body).then((response) => {
          console.log(response.data)
      })
      onHide()
    }
  }

  return (
      <>
      <div className = "modal-container">
        <p>How was your session with <span>{slot.tutorName}?</span></p>
        <h2>We appreciate feedback about your experience!</h2>
        <hr></hr>
        <h1>How likely are you to recommend <span>{slot.tutorName}</span> to others?</h1>
        <div className="stars">
          <ReactStars
                count={5}
                value={rating}
                onChange={(e) => setRating(e)}
                size={30}
                color1={'#3B71CA'}
                color2={'#FFB81C'}
                />
        </div>
        <hr></hr>
        <h1>Anything else?</h1>
        <h2>Your feedback will be shared anonymously with other students</h2>
        <textarea 
          rows="4" cols="50"
          placeholder="Share your experience or offer suggestions"
          onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
      </div>
      <Modal.Footer>
        <Button onClick={handleSubmit}>{"Submit"}</Button>
      </Modal.Footer>
      </>
  )
}

export default FeedbackModal;