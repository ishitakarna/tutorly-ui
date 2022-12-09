import React, { useState } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBInputGroup
} from 'mdb-react-ui-kit';

function NavBar() {
  const [showBasic, setShowBasic] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch(e) {
    console.log(searchValue);
  }

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <MDBNavbar expand='lg' light bgColor='light' className='nav-font'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#' className='d-flex justify-content-start'>
            <img
              src='https://cdn-icons-png.flaticon.com/512/4334/4334807.png'
              height='50'
              alt=''
              loading='lazy'
            />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 nav-custom'>
              <div className='nav-custom-links'>
                <MDBNavbarItem>
                    <Link to="/fp/learn" className='nav-item-decor'>Learn</Link>
                </MDBNavbarItem>

                <MDBNavbarItem>
                    <Link to="/fp/teach" className='nav-item-decor'>Teach</Link>
                </MDBNavbarItem>
              </div>

            <MDBNavbarItem id="nav-form">
              <MDBInputGroup tag="form" className='w-100' onSubmit={(e) => {e.preventDefault()}}>
                    <input className='form-control' placeholder="Search Topic" aria-label="Search Topic" type='Search' 
                            value = {searchValue} onChange={(e) => setSearchValue(e.target.value)}/>
                    <MDBBtn outline color="primary" onClick={handleSearch}>Search</MDBBtn>
              </MDBInputGroup>
            </MDBNavbarItem>

            <MDBNavbarItem>
                  <MDBDropdown>
                    <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                      <MDBIcon fas icon='user-graduate' size='lg' id="user-icon"></MDBIcon>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem><Link to="/fp/profile" className='nav-item-decor'>Profile</Link></MDBDropdownItem>
                      <MDBDropdownItem><Link to="/fp/schedule" className='nav-item-decor'>Schedule</Link></MDBDropdownItem>
                      <hr></hr>
                      <MDBDropdownItem><Link to="/fp/login" onClick = {logout} className='nav-item-decor'>Logout</Link></MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;