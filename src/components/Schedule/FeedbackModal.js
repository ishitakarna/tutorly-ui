import React, { useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";
import ReactStars from "react-stars";
import './FeedbackModal.css'

function FeedbackModal({slot, onHide}) {
  return (
      <>
      <div className = "modal-container">
        <p>How was your session with {slot.tutorName}?</p>
        <h2>We appreciate feedback about your experience!</h2>
        <hr></hr>
        <h1>How likely are you to recommend {slot.tutorName} to others?</h1>
        <div className="stars">
          <ReactStars
                count={5}
                value={0}
                size={30}
                edit={true}
                color2={'#FFB81C'}/>
        </div>
        <hr></hr>
        <h1>Anything else?</h1>
        <h2>Your feedback will be shared anonymously with other students</h2>
        <textarea 
          rows="4" cols="50"
          placeholder="Share your experience or offer suggestions"
          ></textarea>
      </div>
      <Modal.Footer>
        <Button onClick={onHide}>{"Submit"}</Button>
      </Modal.Footer>
      </>
  )
}

export default FeedbackModal;