import Home from "./Home"
import Footer from "./Footer"
import About from './pages/About';
import Contact from './pages/Contact';
import Offerings from './pages/Offerings';
import Schedule from './pages/Schedule';
import Checkout from "./pages/Checkout";
import Cart from "./pages/Cart";
import { Coffee } from './data/coffeelist';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styles.scss';
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap"
import { ListGroupItem } from "reactstrap";
import { LinkContainer } from "react-router-bootstrap"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import invLogo from './images/logo/logo_bw_inverted.png'
import { UserContext } from "./context/UserContext";
import { LoginModal, RegisterModal } from "./utils/Modals";


export function App() {
  AOS.init();
  const [cart, setCart] = useState([])
  // const [data, setData] = useState(Coffee);
  const [value, onChange] = useState(new Date());
  const [selected, setSelected] = useState([])
  

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

    let newArray = [...selected]
    newArray[index].weight = e.target.value;
    newArray[index].selectedWeight = e.target.value

    setSelected(newArray);

  }

  const handleCartQty = (index, operator) => e => {

    let newArray = [...selected]

    newArray[index].cartQty = + e.target.value;

    setSelected(newArray);

  }
  useEffect(() => {
    
  })

  //pass to NavMenu > Schedule > CoffeeTable > CreateRows 
  //filter coffee by selected dates
  const selectedCoffee = () => {
    let itemArray = []
    const filteredCoffee = Coffee.filter(d => d.roast_dates.some(r => dates.compare(r, value) === 0))
    return setSelected(array => [...itemArray, ...filteredCoffee])

  }

      // Source: http://stackoverflow.com/questions/497790
      var dates = {
        convert: function (d) {
          // Converts the date in d to a date-object. The input can be:
          //   a date object: returned without modification
          //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
          //   a number     : Interpreted as number of milliseconds
          //                  since 1 Jan 1970 (a timestamp) 
          //   a string     : Any format supported by the javascript engine, like
          //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
          //  an object     : Interpreted as an object with year, month and date
          //                  attributes.  **NOTE** month is 0-11.
          return (
            d.constructor === Date ? d :
              d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                d.constructor === Number ? new Date(d) :
                  d.constructor === String ? new Date(d) :
                    typeof d === "object" ? new Date(d.year, d.month, d.date) :
                      NaN
          );
        },
        compare: function (a, b) {
          // Compare two dates (could be of any type supported by the convert
          // function above) and returns:
          //  -1 : if a < b
          //   0 : if a = b
          //   1 : if a > b
          // NaN : if a or b is an illegal date
          // NOTE: The code inside isFinite does an assignment (=).
          return (
            isFinite(a = this.convert(a).valueOf()) &&
              isFinite(b = this.convert(b).valueOf()) ?
              (a > b) - (a < b) :
              NaN
          );
        },
        inRange: function (d, start, end) {
          // Checks if date in d is between dates in start and end.
          // Returns a boolean or NaN:
          //    true  : if d is between start and end (inclusive)
          //    false : if d is before start or after end
          //    NaN   : if one or more of the dates is illegal.
          // NOTE: The code inside isFinite does an assignment (=).
          return (
            isFinite(d = this.convert(d).valueOf()) &&
              isFinite(start = this.convert(start).valueOf()) &&
              isFinite(end = this.convert(end).valueOf()) ?
              start <= d && d <= end :
              NaN
          );
        }
      }

  useEffect(() => {
    selectedCoffee()
  }, [value])


  
    // Disable Calendar
  
    const activeDates = Coffee
      .map(c => c.roast_dates)
      .reduce((elem1, elem2) => elem1.concat(elem2))
      .filter(onlyUnique)
      .map(d => dates.convert(d))
    console.log(activeDates)
  
  
    function tileDisabled({ date, view }) {
  
      // Add class to tiles in month view only
      if (view === 'month') {
        // Check if a date React-Calendar wants to check is within any of the ranges
        return !activeDates.find(dDate => dates.compare(dDate, date) === 0);
      }
    }
  
    function tileClassName({ date, view }) {
      // Add class to tiles in month view only
      if (view === 'month') {
        // Check if a date React-Calendar wants to check is on the list of dates to add class to
        if (activeDates.find(dDate => dates.compare(dDate, date) === 0)) {
          return 'active-dates';
        }
      }
    }
  


  return (

    <Container fluid>
      <NavMenu
        listItemsInCart={listItemsInCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        handleWeight={handleWeight}
        handleCartQty={handleCartQty}
        cartTotal={cartTotal}
        cart={cart}
        onChange={onChange}
        value={value}
        tileDisabled={tileDisabled}
        tileClassName={tileClassName}
        selected={selected}
        // onSort = {onSort}
      />
      <Footer />
    </Container>

  )
}

function NavMenu(props) {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  const [logout, setLogout] = useState(false);

  const handleShow = () => setShow(true)
  const handleShow1 = () => setShow1(true);

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
      setLogout(true)
    })
  }


  return (
      <Router>
        <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-lg-2 px-xs-4">
          <Row className="px-xs-5" >
            <Col sm="3" id="brandLogoWrapper">
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    src={invLogo}
                    width="50"
                    height="50"
                    className="d-inline-block align-middle me-3"
                    alt="Marlette's Coffee logo"
                    id="brandLogo"
                  />
                  <span className="d-inline-block align-middle">Marlette's Coffee</span>
                </Navbar.Brand>
              </LinkContainer>
            </Col>
            <Col className="mt-xs-4" xs="4" sm="3" lg="6" style={{fontSize:"14pt"}}>
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
                  {!userContext.details ? (
                      <div className="hideAboveLg">
                      <Nav.Link href="#" onClick={handleShow}>Login</Nav.Link>
                       <Nav.Link href="#" onClick={handleShow1}>Register</Nav.Link>
                      </div>
                      
                    ) : (
                      <Nav.Link href="#" className="hideAboveLg"onClick={logoutHandler}>Logout</Nav.Link>
                    )}
                </Nav>
              </Navbar.Collapse>
            </Col>
            <Col id="collapsedLogo">
            <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    src={invLogo}
                    width="50"
                    height="50"
                    className="d-inline-block align-middle me-3"
                    alt="Marlette's Coffee logo"
                    id="brandLogo"
                  />
                  <span className="d-inline-block align-middle">Marlette's Coffee</span>
                </Navbar.Brand>
              </LinkContainer>
              </Col>
            <Col xs="12" sm="3" lg="3"id="otherNavLinksLG">
              <Nav>
                <Row style={{ fontSize: "14pt"}} >
                  <Col sm="2" className="hideBelowLg ">
                    {!userContext.details ? (
                      <div className="d-flex align-items-bottom " style={{verticalAlign:"bottom"}}>
                      <Nav.Link href="#"  onClick={handleShow} className="align-bottom" style={{display:"inline"}}>Login</Nav.Link>
                      <span style={{verticalAlign:"middle", margin: "auto 0 auto 0"}}> | </span>
                       <Nav.Link href="#" onClick={handleShow1}  style={{display:"inline"}}>Register</Nav.Link>
                      </div>
                    ) : (
                      <Nav.Link href="#" onClick={logoutHandler}>Logout</Nav.Link>
                    )}
                  </Col>
                  <Col xs="12" sm="3">
                    <LinkContainer to="/Cart" >
                      <Nav.Link eventKey={2} id="cartLink" style={{ display: "inline-block", }}>
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
                onChange={props.onChange}
                value={props.value}
                tileDisabled={props.tileDisabled}
                tileClassName={props.tileClassName}
                selected={props.selected}
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
            path="/Checkout"
            element={<Checkout />}
          />
          <Route
            path="/"
            element={
              <Home
                show={show}
                setShow={setShow}
                logout={logout}
              />
            }
          />
        </Routes>
        <LoginModal setShow={setShow} show={show} />
        <RegisterModal setShow1={setShow1} show1={show1} />
      </Router>
  )

}

export default App;
