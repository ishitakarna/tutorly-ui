import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";

function FeedbackModal({clickedSlot, onHide}) {
    return (
        <>
        <h1>How was your session?</h1>
        <Modal.Footer>
          <Button onClick={onHide}>{"Submit"}</Button>
        </Modal.Footer>
        </>
    )
}

export default FeedbackModal;