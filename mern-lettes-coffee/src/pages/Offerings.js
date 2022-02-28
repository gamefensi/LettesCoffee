import { Input, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useState} from "react";
import { Button, Form, Modal, Row, Col, FormGroup } from 'react-bootstrap';
// import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Coffee } from '../data/coffeelist';
import { UncontrolledTooltip } from 'reactstrap';

export default function Offerings(props) {
  const [show, setShow] = useState(false);
  const [showDesc, setShowDesc] = useState(false)
  const [showImge, setShowImge] = useState({});


  const handleClose = () => setShow(false);
  const handleClose2 = () => setShowDesc(false);
  const handleShow = (product) => {
    setShow(true);
    setShowImge(product);
  }
  const handleShow2 = (product) => {
    setShowDesc(true);
    setShowImge(product);
  }



  return (
    <div className="my-5 py-5" id="offerings">
      <h1 className="pb-lg-5">Roast Menu Offerings</h1>
      {/* <div className="my-5 d-flex justify-content-center align-items-start">
        <p style={{ display: "inline", marginRight: "10px", fontWeight: "bold" }}>Sort Price By: </p>
        <select
          className="align-top"
          onChange={(e) => props.onSort(Coffee, e.target.value)}
          name="sorter"
          id="sorter">
          <option value="normal" >Normal</option>
          <option value="lowest" >Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div> */}
      <ListGroup >
        {Coffee.map((item,index) => (
          <ListGroupItem key={item.id}>
            <Row style={{
              margin: 'auto'
            }}>
              <Col xs="12" xl="4" id="coffeeInfoSX">
                <ul>
                  <li><h3>{item.name}</h3></li>
                  <li><strong>Price: </strong><span id={'itemWeight'+item.id}>
                    ${
                      item.weight === "0" ? 0 :
                        item.weight === "12" ? item.price12 :
                          item.price24
                    }</span>

                  </li>
                  <li><strong>Country of Origin:</strong> {item.country}</li>
                </ul>
              </Col>
              <Col xs="12" xl="3" id="productWrapper"
              >
                <img
                  onClick={() => handleShow(item)}
                  className="img-fluid"
                  src={item.pic}
                  alt={item.name}
                />
              </Col>
              <Col xs="12" xl="2" id="flavorProfile">
                <span>Flavor Profile:</span>
                <img
                  onClick={() => handleShow2(item)}
                  className="img-fluid"
                  alt={item.name + ' profile'}
                  src={item.flavor_profile}
                  id="flavorPic"
                />
                <UncontrolledTooltip placement="bottom" target="flavorPic">
                  View Flavor Profile
                </UncontrolledTooltip>
              </Col>
              <Col xs="12" xl="4" id="coffeeInfoXL">
                <ul>
                  <li><h3>{item.name}</h3></li>
                  <li><strong>Price: </strong><span id={'itemPrice'+item.id}>
                    ${
                      item.weight === "0" ? 0 :
                        item.weight === "12" ? item.price12 :
                          item.price24
                    }</span>
                  </li>
                  <li><strong>Country of Origin:</strong> {item.country}</li>
                </ul>
              </Col>
              <Col className="addSubBtns" xs="12" xl="3">
                <Form>
                  <FormGroup>
                    <Label for="weight" style={{ color: '#f5deb3' }} className="pt-4">Weight:</Label>
                    <Form.Select name="weight" aria-label="select weight" onChange={props.handleWeight(index)}>
                      <option value="0">Select an option</option>
                      <option value="12">12oz</option>
                      <option value="24">24oz</option>
                    </Form.Select>
                  </FormGroup>
                  <Row className="mt-4">
                    <Col xl="6">
                      <Label for="qty" style={{ color: '#f5deb3' }} >Quantity:</Label>
                      <Input 
                        name="qty" 
                        type="number"
                        defaultValue={item.cartQty} 
                        style={{ marginBottom: "20px" }} 
                        onChange={props.handleCartQty(index)}/>
                    </Col>
                    <Col xl="6">
                      <Button
                        variant="outline-light"
                        className="mt-4"
                        type="button"
                        onClick={() => props.addToCart(item,item.cartQty,item.selectedWeight,0)}
                      >
                        Add to Cart
                      </Button>{' '}
                    </Col>
                  </Row>
                </Form>


                {/* <ButtonGroup>
                  <Button
                    id="addBtn"
                    type="button"
                    variant="light"
                    // className="btn btn-light border"
                    onClick={() => handleUpdateQty(item.cartQty, 1)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="fas fa-sm"
                    />
                  </Button>
                  <Button
                    id="minusBtn"
                    type="button"
                    // className="btn btn-light border"
                    variant="light"
                    onClick={() => handleUpdateQty(item.cartQty, -1)}
                  >
                    <FontAwesomeIcon
                      icon={faMinus}
                      className="fas fa-sm"
                    />
                  </Button>
                </ButtonGroup> */}
              </Col>
            </Row>
          </ListGroupItem >
        ))
        }
      </ListGroup >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{showImge.country} {showImge.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={showImge.pic}
            width="350"
            alt={showImge.name}
            className="mx-5"
          />
          <p>{showImge.info}</p>
          <p style={{ fontWeight: "bold" }}><span className="text-dark">Ratings:</span> {showImge.rating}/5</p>
        </Modal.Body>
      </Modal>
      <Modal show={showDesc} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>{showImge.country} {showImge.name} Flavor Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={showImge.flavor_profile}
            width="350"
            alt={showImge.country + showImge.name + " profile"}
            className="mx-5 mb-4"
          />
          <p><strong className="text-dark">Roast Levels:</strong> {showImge.roast_level}</p>
          <p><strong className="text-dark">Cupping Score:</strong> {showImge.cupping_score}</p>
          <p><strong className="text-dark">Tasting notes:</strong> {showImge.tasting_notes}</p>
        </Modal.Body>
      </Modal>
    </div >
  )
}






