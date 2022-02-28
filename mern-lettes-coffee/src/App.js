import Home from "./Home"
import Footer from "./Footer"
import About from './pages/About';
import Contact from './pages/Contact';
import Offerings from './pages/Offerings';
import Schedule from './pages/Schedule';
import Cart from "./pages/Cart";
import { LoginModal } from "./utils/Modals";
import { Coffee } from './data/coffeelist';
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap"
import { ListGroupItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap"
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useState } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import invLogo from './images/logo/logo_bw_inverted.png'
import { UserContext } from "./context/UserContext";


export function App() {
  AOS.init();
  const [cart, setCart] = useState([])
  const [data, setData] = useState(Coffee);

  const cartTotal1 =
    cart.filter(onlyUnique)
      .map((item) => item.price12 * item.qty12)
      .reduce((total, price) => total + price, 0);
  const cartTotal2 =
    cart.filter(onlyUnique)
      .map((item) => item.price24 * item.qty24)
      .reduce((total, price) => total + price, 0);

  const cartTotal = cartTotal1 + cartTotal2

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


  const addToCart = (newItem, qty, weight, i) => {
    let itemArray = []
    for (i = 0; i < qty; i++) {
      if (weight === "12") {
        newItem.qty12 += 1;
        itemArray.push(newItem)
      } if (weight === "24") {
        newItem.qty24 += 1;
        itemArray.push(newItem)
      }

    }

    setCart(currentCart => [...currentCart, ...itemArray]);
  }
  console.log(cart)

  const removeFromCart = (item) => {
    setCart((currentCart) => {
      const indexOfItemToRemove = currentCart.findIndex((cartItem) => cartItem.id === item.id);
      const newCart = currentCart.filter(a => a.id !== item.id)

      if (indexOfItemToRemove === -1) {
        return currentCart;
      }

      return (
        // ...currentCart.slice(0, indexOfItemToRemove),
        // ...currentCart.slice(indexOfItemToRemove + 1),  
        newCart
      );

    });
  };

  // const amountOfItems = (id) => cart.filter((item) => item.id === id).length;

  // const onSort = (items, sortType) => {
  //   console.log(items);
  //   console.log(sortType);

  //   const copy = [...inventory]// need new array each time fn is called to re-render
  //   switch (sortType) {
  //     case 'lowest':
  //       copy.sort(function (a, b) {
  //         return a.price12 - b.price12
  //       });
  //       break;
  //     case 'highest':
  //       copy.sort(function (a, b) {
  //         return b.price12 - a.price12
  //       });
  //       break;
  //     default:
  //       copy.sort(function (a, b) {
  //         return a.id - b.id;
  //       });
  //   }
  //   setInventory(copy);
  // }


  const listItemsInCart = () => cart.filter(onlyUnique).map((item) => (
    <div key={item.id}>
      <ListGroupItem style={{ width: "70%", padding: "15px 15px" }}>
        <Row>
          <Col sm="10">
            <span className="me-2">
              ({item.qty12} x ${item.price12}), ({item.qty24} x ${item.price24}) {`${item.country} ${item.name}`}
            </span>
          </Col>
          <Col sm="2">
            <Button type="submit" variant="danger" onClick={() => removeFromCart(item)}>Remove</Button>
          </Col>
        </Row>

      </ListGroupItem>
    </div>
  ));

  const handleWeight = index => e => {

    let newArray = [...data]
    newArray[index].weight = e.target.value;
    newArray[index].selectedWeight = e.target.value

    setData(newArray);

  }

  const handleCartQty = index => e => {

    let newArray = [...data]
    newArray[index].cartQty = + e.target.value;

    setData(newArray);
    console.log(newArray[index].cartQty)

  }
  return (

    <Container fluid>
      <NavMenu
        listItemsInCart={listItemsInCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        handleWeight={handleWeight}
        handleCartQty={handleCartQty}
        // onSort = {onSort}
        cartTotal={cartTotal}
        cart={cart}
      />
      <Footer />
    </Container>

  )
}

function NavMenu(props) {
  const [show, setShow] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  const handleShow = () => setShow(true)

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async response => {
      //set token to null to remove from db & cookie to display login page 
      setUserContext(oldValues => {
        return { ...oldValues, details: undefined, token: null }
      })
      //save time of logout so we can logout user from all tabs
      window.localStorage.setItem("logout", Date.now())
    })
  }

  return (
    <div>
      <Router>
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ display: "block" }} className="px-lg-2 px-xs-1">
          <Row>
            <Col xs="8" lg="3" xxl="2">
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
            </Col>
            <Col xs="3" id="otherNavLinksSM">
              <Nav style={{ display: "inline-block" }}>
                <Row>
                  <Col>
                {!userContext.details ? (
                  <Nav.Link href="#" style={{ display: "inline-block",width:"50px" }} onClick={handleShow}>Login</Nav.Link>
                ) : (
                  <Nav.Link href="#" onClick={logoutHandler} style={{ display: "inline-block" }}>Logout</Nav.Link>
                )}
                </Col>
                <Col>
                <LinkContainer to="/Cart" >
                  <Nav.Link eventKey={2} id="cartLink" style={{display: "inline-block" }}>
                    <FontAwesomeIcon icon={faShoppingCart} className="me-lg-1" /> ${props.cartTotal}
                  </Nav.Link>
                </LinkContainer>
                </Col>
                </Row>
              </Nav>
            </Col>
            <Col className="ps-xs-2 mt-xs-4" lg="7" xxl="7">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav >
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
              </Navbar.Collapse>
            </Col>
            <Col lg="3" id="otherNavLinksLG">
              <Nav style={{ display: "inline-block" }}>
                <Row>
                <Col lg="5">
              {!userContext.details ? (
                <Nav.Link href="#" style={{ display: "inline-block",width:"50px"}} onClick={handleShow}>Login</Nav.Link>
              ) : (
                <Nav.Link href="#" onClick={logoutHandler} style={{ display: "inline-block" }}>Logout</Nav.Link>
              )}
              </Col>
              <Col lg="7">
              <LinkContainer to="/Cart" >
                <Nav.Link eventKey={2} id="cartLink" style={{display: "inline-block", }}>
                  <FontAwesomeIcon icon={faShoppingCart} /> ${props.cartTotal}
                </Nav.Link>
              </LinkContainer>
              </Col>
              </Row>
              </Nav>
            </Col>
          </Row>
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
                listItemsInCart={props.listItemsInCart}
                addToCart={props.addToCart}
                removeFromCart={props.removeFromCart}
                cartTotal={props.cartTotal}
                handleWeight={props.handleWeight}
                handleCartQty={props.handleCartQty}
              />
            }
          />
          <Route
            path="/Offerings"
            element={
              <Offerings
                cart={props.cart}
                // onSort = {props.onSort}
                removeFromCart={props.removeFromCart}
                addToCart={props.addToCart}
                handleWeight={props.handleWeight}
                handleCartQty={props.handleCartQty}
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
                cartTotal={props.cartTotal}
                cart={props.cart}
                listItemsInCart={props.listItemsInCart}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                show={show}
                setShow={setShow}
              />
            }
          />
        </Routes>

      </Router>
      <LoginModal setShow={setShow} show={show} />
    </div >
  )

}

export default App;
