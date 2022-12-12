import { React, useState, useEffect, useRef } from "react";
import Api from "../../api";
import axios from "axios";
import './Detail.scss'
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import mainLogo from "../../assets/Tutorly.png";

function UserDetailView() {
  
  const api = new Api();
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const [formValue, setFormValue] = useState({
  fname: '',
  lname: '',
  number: '',
  uni: '',
  degree: ''
  });
  
  useEffect(() => {
  if (!email) {
      navigate('/fp/login');
  }
  }, []);
  
  const onChange = (e) => {
  setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault(); //prevent page refresh
    var newUser = {};
    let userURL = `${api.api_url}users`

    // access input values here
    newUser.userName = formValue.fname+" "+formValue.lname;
    newUser.email = email;
    newUser.university = formValue.uni;
    newUser.userDegree = formValue.degree;
    newUser.phoneNumber = formValue.number;

    axios.post(userURL, newUser)
    .then((response)=> {
      console.log(response);
      //clear all input values in the form
      setFormValue(formValue, {
        fname: '',
        lname: '',
        number: '',
        uni: '',
        degree: ''
        });
      navigate("/fp/learn");
    })
    .catch(error => console.log(error))
  }

  return (
    <MDBContainer fluid>
      <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>

      <MDBCard className='mx-5 mb-5 p-1 shadow-5' style={{marginTop: '-270px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-3 text-center'>
                <img src={mainLogo} style={{width: '200px'}} alt="logo" />
          <h2 className="fw-bold mb-4" style={{marginTop: '-10px'}}>Let's get started by filling this registration form!</h2>
          <p>Thanks for choosing us!</p>
          <br/>
          
          <Form onSubmit={submitForm} name='login_form'>
            <MDBRow>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='First name' id='fname' type='text' name="fname"
                value={formValue.fname}
                onChange={onChange}
                required/>
              </MDBCol>
              <MDBCol col='6'>
                <MDBInput wrapperClass='mb-4' label='Last name' id='lname' type='text' name="lname"
                value={formValue.lname}
                onChange={onChange}
                required/>
                </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4' label='Email' id='typeEmail' type='email'
            value={email}
            disabled/>
            <MDBInput wrapperClass='mb-4' label='Phone number' id='typePhone' type='tel' name='number'
            value={formValue.number}
            onChange={onChange}
            required />
            <MDBInput wrapperClass='mb-4' label='University' id='uni' name='uni'
            value={formValue.uni}
            onChange={onChange}
            required />
            <MDBInput wrapperClass='mb-4' label='Degree' id='degree' name='degree'
            value={formValue.degree}
            onChange={onChange}
            required/>
            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='checked' id='flexCheckDefault' label='I Agree to the terms and conditions' required/>
            </div>
            <MDBBtn className='w-100 mb-4' size='md' type="submit">Submit</MDBBtn>
          </Form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default UserDetailView;
