import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap'
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './pages/About';
import Contact from './pages/Contact';
import Offerings from './pages/Offerings';
import Schedule from './pages/Schedule';


export default function NavMenu(props) {

  return (
    <div>
      <Router>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            src="images/logo/logo_bw_inverted.png"
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Lette's Coffee logo"
          /> Lette's Coffee
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route
        path="/About"
        element={
          <About />
        }
      />
      <Route
        path="/Schedule"
        element={
          <Schedule />
        }
      />
      <Route
        path="/Offerings"
        element={
          <Offerings />
        }
      />
      <Route
        path="/Contact"
        element={
          <Contact />
        }
      />
    </Routes>
  
      </Router>
    </div>


  );
}

