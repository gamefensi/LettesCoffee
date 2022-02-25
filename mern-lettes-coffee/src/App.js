import Home from "./Home"
import Footer from "./Footer"
import { Container, Nav, Navbar } from "react-bootstrap"
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import About from './pages/About';
import Contact from './pages/Contact';
import Offerings from './pages/Offerings';
import Schedule from './pages/Schedule';
import Cart from "./pages/Cart";
import invLogo from './images/logo/logo_bw_inverted.png'
import {Coffee} from './data/coffeelist';

function App() {
  AOS.init();
  const coffeeList = {Coffee}
  const [cart, setCart] = useState([])
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    total();
  }, [cart]);

  const total = () => {
    let totalVal = 0;
    for (let i = 0; i < cart.length; i++) {
      totalVal += cart[i].price12;
    }
    setCartTotal(totalVal);
  };

  const addToCart = (item) => {

    setCart((currentCart) => [...currentCart, item]);
    console.log(`
    Cart total is ${cartTotal}
    Items in Cart : ${cart}
    `)
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

  // const listItemsToBuy = () => items.map((item) => (
  //   <div key={item.id}>
  //     {`${item.name}: $${item.price}`}
      
  //   </div>
  // ));

  const listItemsInCart = () => coffeeList.map((item) => (
    <div key={item.id}>
      ({amountOfItems(item.id)} x ${item.price}) {`${item.name}`}
      <button type="submit" onClick={() => removeFromCart(item)}>Remove</button>
    </div>
  ));

  return (

    <Container fluid>
      <NavMenu 
        listItemsInCart = {listItemsInCart}
        addToCart = {addToCart}
        removeFromCart = {removeFromCart}
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
              <Nav.Link eventKey={2} href="/Cart" id="cartLink">
                <FontAwesomeIcon icon={faShoppingCart} href="/Cart" className="me-1" /> ${props.cartTotal}
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
          path="/Cart"
          element={
            <Cart 
              cartTotal = {props.cartTotal}
              cart = {props.cart} 
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
