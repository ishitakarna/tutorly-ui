import {auth} from './firebase'
import {useState, useEffect} from 'react'
import {signInWithGoogle} from './firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {useNavigate,Link} from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Form from 'react-bootstrap/Form';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }from 'mdb-react-ui-kit';
import "../Login/LoginView.scss";
import mainLogo from "../../assets/Tutorly.png";

export default function RegisterView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const clientId = '395638822106-cb794ss3le52s150a2j0er5u45d1um6t.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''});};
      gapi.load('client:auth2', initClient);});

  const onSuccess = (res) => {
    localStorage.setItem("email", res.profileObj.email);
    navigate('/fp/userDetails')};

  const onFailure = (err) => {
    alert("User Sign Up Failed!")};

  const validatePassword = () => {
    let isValid = true
    if (password !== '' && confirmPassword !== ''){
      if (password !== confirmPassword) {
        isValid = false
        alert("Passwords don't match")
      }}
    return isValid} 
  const register = e => {
    e.preventDefault()
    setError('')
    if(validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password).then((res) => {
      localStorage.setItem("email",email);
      console.log(res.user);
      setEmail('')
      setPassword('')
      setConfirmPassword('');
      navigate("/fp/userDetails")
    }).catch(err => alert("User email is already in use. Try logging in instead!"))}}

  const loginPage = () => {
    navigate("/fp/login")}
    
  return(
    <div className='auth' style={{ 
        height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden',
        transform: [{ rotate: '180deg'}]}}>
    
     <div className='register-container'>
     <MDBContainer className="my-5 gradient-form" >
     <MDBRow>

      <MDBCol col='6' className="mb-5">
        <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
          <div className="text-white text-center px-3 py-4 p-md-5 mx-md-4">
            <p></p>
            <h2 className="mb-4">Hello There!</h2>
            <p className="small mb-0"><h2>Welcome back into a world of teaching and learning!</h2></p>
            <br/>
            <br/><br/><br/><br/>
            <MDBBtn className="mb-4 w-100 gradient-custom-3" onClick={loginPage}>Sign In</MDBBtn>
          </div>
        </div>
      </MDBCol>
      
      <MDBCol col='6' className="mb-5" >
        <div className="d-flex flex-column ms-5">
        {error && <div className='auth__error'>{error}</div>}
        <Form name='registration_form' onSubmit={register}>
          <div className="text-center">
            <img src={mainLogo} style={{width: '150px'}} alt="logo" />
             <h4 className="mt-1 mb-5 pb-1">Create Account</h4>
          </div>
          <MDBInput wrapperClass='mb-4' label='Email address' name='email' type='email' value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)} required/>
          <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' value={password} placeholder='Enter your password' onChange={e => setPassword(e.target.value)} required/>
          <MDBInput wrapperClass='mb-4' label='Confirm Password' name='confirmPassword' type='password' value={confirmPassword} placeholder='Enter your password again' onChange={e => setConfirmPassword(e.target.value)} required/>
          <div className="text-center pt-1 mb-5 pb-1">
            <MDBBtn className="mb-4 w-100 gradient-custom-3" type='submit'>Sign Up</MDBBtn>
              <p>OR</p>
              <GoogleLogin
                 clientId={clientId}
                 buttonText="Sign Up with Google"
                 onClick={signInWithGoogle}
                 onAutoLoadFinished={true}
                 onSuccess={onSuccess}
                 onFailure={onFailure}
                 cookiePolicy={'single_host_origin'}
                 isSignedIn={true}/>
          </div> 
        </Form>    
        </div>
      </MDBCol>
      </MDBRow>
      </MDBContainer>
      </div>
    </div>
    );
}