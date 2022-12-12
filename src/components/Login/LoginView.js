import {useState, useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from './firebase'
import {signInWithGoogle} from './firebase'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import Form from 'react-bootstrap/Form';
import Api from "../../api";
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBInput
  }from 'mdb-react-ui-kit';
  import "../Login/LoginView.scss";
  import mainLogo from "../../assets/Tutorly.png";
  import { Typewriter } from 'react-simple-typewriter'

function LoginView() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const api = new Api();
  const clientId = '395638822106-cb794ss3le52s150a2j0er5u45d1um6t.apps.googleusercontent.com';
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''});};
      gapi.load('client:auth2', initClient);});

  const onSuccess = (res) => {
    localStorage.setItem("email", res.profileObj.email);
    const email = res.profileObj.email;
    let userId;
    api.getUserByEmail(email)
    .then(result => {
        navigate('/fp/learn')
    }).catch(err => {
      alert('Looks like you a new here! Please proceed to fill a registration form...')
      navigate('/fp/userDetails')
      console.log(err);
    })
  }

  const onFailure = (err) => {
    alert("Login Failed")};

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then(() => {
    localStorage.setItem("email", email);
    let userId;
    api.getUserByEmail(email)
    .then(result => {
        navigate('/fp/learn')
    }).catch(err => {
      alert('Looks like you a new here! Please proceed to fill a registration form...')
      navigate('/fp/userDetails')
      console.log(err);
    })
    }).catch((err) => {alert('Invalid credentials. Please try again!')})}

    const registerpage = () => {
      navigate("/fp/register")
    }

    return(
      <div style={{ 
        height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden', // eslint-disable-next-line
        backgroundImage: "url(" + "https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg?auto=compress" + ")"}}>

      <Form onSubmit={login} name='login_form'>
        <MDBContainer className="my-5 gradient-form" >
        <MDBRow>
          <MDBCol col='6' className="mb-5" >
            <div className="d-flex flex-column ms-5">

              <div className="text-center">
                <img src={mainLogo} style={{width: '200px'}} alt="logo" />
                <h4 className="mt-1 mb-5 pb-1">LOGIN</h4>
               </div>

              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} placeholder='Enter your email' onChange={e => setEmail(e.target.value)} required/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} placeholder='Enter your password' onChange={e => setPassword(e.target.value)} required/>
              
              <div className="text-center pt-1 mb-5 pb-1">
                <MDBBtn className="mb-4 w-100 gradient-custom-3" type='submit'>Sign in</MDBBtn>
                <p>OR CONTINUE WITH GOOGLE</p>
                 
                 <GoogleLogin
                 clientId={clientId}
                 buttonText="Sign in with Google"
                 onClick={signInWithGoogle}
                 onAutoLoadFinished={true}
                 onSuccess={onSuccess}
                 onFailure={onFailure}
                 cookiePolicy={'single_host_origin'}
                 isSignedIn={true}/>
               
               </div>  
            </div>
           </MDBCol>

           <MDBCol col='6' className="mb-5">
            <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">
            <div className="text-white px-3 text-center py-4 p-md-5 mx-md-4">
              <h2 className="mb-4">New Here?</h2>

              <h2 style={{ paddingTop: '1rem', margin: 'auto 0', fontWeight: 'normal' }}>Join us to{' '}
              <span style={{ color: 'lavender', fontWeight: 'bold' }}>
                <Typewriter
                  words={['Teach', 'Learn', 'Collab', 'Repeat!']}
                  loop={100}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  onLoopDone={0}/>
              </span>
              </h2>
              <br/>
              <br/>
              <br/>
              <p className="small mb-3"><h3>Sign up and step into the world of teaching and learning!</h3></p>
              <MDBBtn className="mb-4 w-100 gradient-custom-3" onClick={registerpage}>Sign Up</MDBBtn>
              </div>
            </div>

          </MDBCol>
        </MDBRow>
        </MDBContainer>
      </Form>
    </div>
    );}
export default LoginView;