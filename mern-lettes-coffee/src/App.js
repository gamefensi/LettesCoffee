import Home from "./Home"
import Footer from "./Footer"
import { Container, Nav, Navbar } from "react-bootstrap"
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import About from './pages/About';
import Contact from './pages/Contact';
import Offerings from './pages/Offerings';
import Schedule from './pages/Schedule';
import invLogo from './images/logo/logo_bw_inverted.png'

function App() {
  AOS.init();

  return (

    <Container fluid>
      <NavMenu />
      <Footer />
    </Container>

  )
}

function NavMenu() {

  return (

    <Router>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src={invLogo}
              width="50"
              height="50"
              className="d-inline-block align-middle me-3"
              alt="Lette's Coffee logo"
            />
            <span className="d-inline-block align-middle">Lette's Coffee</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/About">About</Nav.Link>
              <Nav.Link href="/Schedule">Roast Schedule</Nav.Link>
              <Nav.Link href="/Offerings">Offerings</Nav.Link>
              <Nav.Link href="/Contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                <FontAwesomeIcon icon={faShoppingCart} href="/Cart" className="me-1" />Cart
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
        <Route
          path="/"
          element={
            <Home />
          }
        />
      </Routes>

    </Router>
  )

}

export default App;
