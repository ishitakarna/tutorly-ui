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

function UserDetailView() {
  const navigate = useNavigate();
  useEffect(() => {
  const email = localStorage.getItem('email');
  if (!email) {
      navigate('/fp/login');
  }
  }, []);
  const api = new Api();
  const ref = useRef(null);
  const [formValue, setFormValue] = useState({
    fname: '',
    lname: '',
    email: '',
    number: '',
    uni: '',
    degree: '',
    checked: false
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const onBoxChange = (e) => {
    let isChecked = e.target.checked;
    setFormValue({ ...formValue, [e.target.name]: e.target.checked });
  };

  function validate(){

    if (!formValue.fname.trim() || !formValue.lname.trim()) {
      errors.username = '*Username required';
    } else if (!formValue.fname.match(/^[a-zA-Z ]*$/)) {
       errors.username = 'Enter a valid name';
    } else {
        errors.username ='';
    }

    if (!formValue.email) {
      errors.email = '*Email required';
    } else if (!/\S+@\S+\.\S+/.test(formValue.email)) {
      errors.email = '*Email address is invalid';
    } else {
        errors.email = '';
    }

    if (!formValue.number) {
      errors.number = '*Phone Number is required';
    } else if (formValue.number.length < 10 || !formValue.number.match(/^[0-9]{10}$/)) {
      errors.number = '*Please enter a Valid Mobile Number';
    } else {
        errors.number = '';
    }

    if (!formValue.uni) {
      errors.uni = '*University is required';
    } else {
        errors.uni = '';
    }

    if (!formValue.degree) {
      errors.degree = '*Qualification is required';
    } else {
        errors.degree = '';
    }

    if (!formValue.checked) {
      errors.terms = '*You must agree before submitting';
    } else {
        errors.terms = ''
    }
    //alert(errors.email)
    setErrors(errors);
  }

    const submitForm = event => {
        console.log('handleSubmit ran');
        event.preventDefault(); //prevent page refresh

        //alert(Object.keys(errors).length)
        validate();
        //alert(Object.keys(errors).length)
        var newUser = {};
        let userURL = `${api.api_url}users`

        // access input values here
        newUser.userName = formValue.fname+" "+formValue.lname;
        newUser.email = formValue.email;
        newUser.university = formValue.uni;
        newUser.userDegree = formValue.degree;
        newUser.phoneNumber = formValue.number;
        //alert("inside if")

        axios.post(userURL, newUser)
        .then((response)=> console.log(response))
        .catch(error => console.log(error))

        //clear all input values in the form
        setFormValue(formValue, {
        fname: '',
        lname: '',
        email: '',
        number: '',
        uni: '',
        degree: ''
        });
        alert("Taking you into the world of Learning and Teaching.")
        setErrors({});
        navigate("/fp/learn");
    }

    return (
        <MDBContainer fluid>
    
          <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>
    
          <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 text-center'>
    
              <h2 className="fw-bold mb-4">Let's Get Started!</h2>
              <p>Thanks for choosing us!<br/>Prior to scheduling, please take a moment to include a comprehensive description of yourself, your area of expertise, qualifications and your professional experience.<br/></p>
    
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='fname' type='text' name="fname"
                    value={formValue.fname}
                    onChange={onChange}
                    required/>
                  {errors.username && <p className="fm-error">{errors.username}</p>}
                </MDBCol>
    
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='lname' type='text' name="lname"
                    value={formValue.lname}
                    onChange={onChange}
                    required/>
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Email' id='typeEmail' type='email' required
                value={formValue.email}
                name='email'
                onChange={onChange}/>
              {errors.email && <p className="fm-error" wrapperClass='mb-4'>{errors.email}</p>}
              <MDBInput wrapperClass='mb-4' label='Phone number'
                value={formValue.number}
                name='number'
                onChange={onChange}
                id='typePhone'
                type='tel'
                required />
              {errors.number && <p className="fm-error" wrapperClass='mb-4'>{errors.number}</p>}
              <MDBInput wrapperClass='mb-4' label='University' id='uni'
                value={formValue.uni}
                name='uni'
                onChange={onChange}
                required />
              {errors.uni && <p className="fm-error" wrapperClass='mb-4'>{errors.uni}</p>}
              <MDBInput wrapperClass='mb-4' label='Degree' id='degree' 
                value={formValue.degree}
                name='degree'
                onChange={onChange}
                required/>
              {errors.degree && <p className="fm-error" wrapperClass='mb-4'>{errors.degree}</p>}
              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='checked' id='flexCheckDefault' label='I Agree to the terms and conditions' 
                 onChange={onBoxChange}/>
              </div>
              {errors.terms && <p className="fm-error" wrapperClass='mb-4'>{errors.terms}</p>}
              
              <MDBBtn className='w-100 mb-4' size='md' type="submit" onClick={submitForm}>Submit</MDBBtn>
            </MDBCardBody>
          </MDBCard>
    
        </MDBContainer>
      );
};

export default UserDetailView;
