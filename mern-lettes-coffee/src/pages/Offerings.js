import { Input, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { useState } from "react";
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Coffee } from '../data/coffeelist';
import { UncontrolledTooltip } from 'reactstrap';

export default function Offerings(props) {
  const [show, setShow] = useState(false);
  const [showDesc, setShowDesc] = useState(false)
  const [showImge, setShowImge] = useState({});
  const [qty, setQty] = useState(0)

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

  const handleUpdateQty = (operator) => {
    if (operator === -1) {
      setQty(qty--)
    }

  }



  return (
    <div className="my-5 py-5" id="offerings">
      <h1 className="">Roast Menu Offerings</h1>
      <div className="my-5 d-flex justify-content-center align-items-start">
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
      </div>
      <ListGroup style={{
        width: '80%',
        margin: 'auto'
      }} >
        {Coffee.map((item) => (
          <ListGroupItem style={{ display: "block" }} key={item.id}>
            <Row style={{
              padding: "10p auto 10px auto",
              margin: 'auto'
            }}>
              <div>
                <h2>{item.name}</h2>
                <span
                  style={{
                    color: "rgb(255, 255, 255)",
                    fontSize: "16pt",
                    marginLeft: "10px",
                  }}
                >

                </span>
              </div>
              <div className="col-xs-12 col-xl-3" id="productWrapper"
              >
                <img
                  onClick={() => handleShow(item)}
                  className="img-fluid"
                  src={item.pic}
                  alt={item.name}
                />
              </div>
              <div className="col-xs-12 col-xl-3" id="flavorProfile">
                <h4>Flavor Profile</h4>
                <img
                  onClick={() => handleShow2(item)}
                  className="img-fluid"
                  alt={item.name + ' profile'}
                  src={item.flavor_profile}
                  width="100%"
                  id="flavorPic"
                />
                <UncontrolledTooltip placement="bottom" target="flavorPic">
                  View Flavor Profile
                </UncontrolledTooltip>
              </div>
              <div className="col-xs-12 col-xl-4">
                <ul>
                  <li><strong>Price:</strong> ${item.price12} (12oz)</li>
                  <li><strong>Country of Origin:</strong> {item.country}</li>
                  <li>
                    Weight: 
                    <Form.Select aria-label="select weight">
                      <option>Select an option</option>
                      <option value="12">12oz</option>
                      <option value="24">24oz</option>
                    </Form.Select>
                  </li>
                </ul>
              </div>
              <div className="addSubBtns col-xs-12 col-xl-2 my-2 ">
                <Label style={{color:  '#f5deb3'}}>Quantity:</Label>
                <Input name="qty" value={item.cartQty} disabled style={{width:"35px", marginLeft: "auto", marginRight: "auto", marginBottom: "20px"}}> </Input>
                <button
                  id="addBtn"
                  type="button"
                  className="btn btn-light border"
                  onClick={() => props.addToCart(item)}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fas fa-sm"
                  />
                </button>
                <button
                  id="minusBtn"
                  type="button"
                  className="btn btn-light border"
                  style={{ marginLeft: "10px" }}
                  onClick={() => props.removeFromCart(item)}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="fas fa-sm"
                  />
                </button>
                <Button
                  onClick={() => props.addToCart(item, item.cartQty)}
                  variant="outline-light"
                  className="my-4"
                >
                  Add to Cart
                </Button>{' '}
              </div>
            </Row>

          </ListGroupItem>
        ))}
      </ListGroup>
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
    </div>
  )
}






