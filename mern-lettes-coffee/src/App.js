import Home from "./Home"
import Footer from "./Footer"
import About from './pages/About';
import Contact from './pages/Contact';
import Offerings from './pages/Offerings';
import Schedule from './pages/Schedule';
import Cart from "./pages/Cart";
import {Coffee} from './data/coffeelist';
import { Container, Nav, Navbar } from "react-bootstrap"
import { Button, ListGroupItem } from "reactstrap";
import {LinkContainer} from "react-router-bootstrap"
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState} from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import invLogo from './images/logo/logo_bw_inverted.png'


function App() {
  AOS.init();
  const [cart, setCart] = useState([])
  const [inventory, setInventory] = useState({Coffee})
  const [sortType, setSortType] = useState("normal")

  const cartTotal = cart.reduce((total, { price12 = 0 }) => total + price12, 0);

  const addToCart = (item) => {

    setCart((currentCart) => [...currentCart, item]);
  }

  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === item.id);

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return [
        ...currentCart.slice(0, indexOfItemToRemove),
        ...currentCart.slice(indexOfItemToRemove + 1),
      ];

    });
  };

  const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

  const onSort = (items, sortType) => {
    console.log(items);
    console.log(sortType);

    const copy = [...inventory]// need new array each time fn is called to re-render
    switch (sortType) {
      case 'lowest':
        copy.sort(function (a, b) {
          return a.price12 - b.price12
        });
        break;
      case 'highest':
        copy.sort(function (a, b) {
          return b.price12 - a.price12
        });
        break;
      default:
        copy.sort(function (a, b) {
          return a.id - b.id;
        });
    }
    setInventory(copy);
  }


  const listItemsInCart = () => Coffee.map((item) => (
    <div key={item.id}>
      <ListGroupItem>
      <span className="me-2">({amountOfItems(item.id)} x ${item.price12}) {`${item.name}`}</span>
      <Button type="submit" onClick={() => removeFromCart(item)}>Remove</Button>
      </ListGroupItem>
    </div>
  ));

  return (

    <Container fluid>
      <NavMenu 
        listItemsInCart = {listItemsInCart}
        addToCart = {addToCart}
        removeFromCart = {removeFromCart}
        onSort = {onSort}
        cartTotal = {cartTotal}
        cart = {cart}
      />
      <Footer />
    </Container>

  )
}

function NavMenu(props) {

  return (

    <Router>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src={invLogo}
              width="50"
              height="50"
              className="d-inline-block align-middle me-3"
              alt="Lette's Coffee logo"
            />
            <span className="d-inline-block align-middle">Lette's Coffee</span>
          </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/About">
              <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Schedule">
              <Nav.Link>Roast Schedule</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Offerings">
              <Nav.Link>Offerings</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Contact">
              <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              <LinkContainer to="/">
              <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Cart">
              <Nav.Link eventKey={2} id="cartLink">
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" /> ${props.cartTotal}
              </Nav.Link>
              </LinkContainer>
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
            <Schedule 
              listItemsInCart = {props.listItemsInCart}
              addToCart = {props.addToCart}
              removeFromCart = {props.removeFromCart}
              cartTotal = {props.cartTotal}
            />
          }
        />
        <Route
          path="/Offerings"
          element={
            <Offerings 
              cart = {props.cart}
              onSort = {props.onSort}
              removeFromCart = {props.removeFromCart}
              addToCart = {props.addToCart}
              />
          }
        />
        <Route
          path="/Contact"
          element={
            <Contact />
          }
        />
        <Route
          path="/Cart"
          element={
            <Cart 
              cartTotal = {props.cartTotal}
              cart = {props.cart}
              listItemsInCart = {props.listItemsInCart}
            />
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
