import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
// import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import { TiShoppingCart,  } from 'react-icons/ti'
import {  GiCarKey } from 'react-icons/gi'
import { logout } from '../actions/userActions'

const Header = () => { 	
	const dispatch = useDispatch()

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin  
	
	const logoutHandler = () =>{
		dispatch(logout())		
	}
    return (
      <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
          <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand className='logo' >geekshop</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <LinkContainer to='/cart'>
                        <Nav.Link > <TiShoppingCart size={30}/> Cart</Nav.Link>
                    </LinkContainer>
										{userInfo ? (
											<NavDropdown title={userInfo.name} id ='username'>
												<LinkContainer to='/profile'>
													<NavDropdown.Item>Profile</NavDropdown.Item>													
												</LinkContainer>
												<NavDropdown.Item onClick = {logoutHandler}>
													Logout
												</NavDropdown.Item>
											</NavDropdown>
											): 
                    <LinkContainer to ='/login'>
                        <Nav.Link > <GiCarKey size={30}/> Sign In</Nav.Link> 
										</LinkContainer>
										}
                    </Nav>  
                </Navbar.Collapse>
            </Container> 
        </Navbar>
    )
}

export default Header
