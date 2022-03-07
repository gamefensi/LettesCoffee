import { Input, Label, ListGroup, ListGroupItem } from 'reactstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from "react";
import { Button, Form, Modal, Row, Col, FormGroup, Card, Container, Accordion } from 'react-bootstrap';
import { Coffee } from '../data/coffeelist';
// import { UncontrolledTooltip } from 'reactstrap';

export default function Offerings(props) {
  const [show, setShow] = useState(false);
  const [showImge, setShowImge] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setShowImge(product);
  }

  // const showAlert = () => alert("You must select a weight first!")

  // const [showDesc, setShowDesc] = useState(false)
  // const handleClose2 = () => setShowDesc(false);
  // const handleShow2 = (product) => {
  //   setShowDesc(true);
  //   setShowImge(product);
  // }

  ///////////////////////////////////////////  
  // For <=== Popover Option ===>
  ///////////////////////////////////////////
  //
  // const Example = (props) => {

  //   const item = props.item;
  //   return (
  //     <OverlayTrigger
  //       trigger="click"
  //       placement="bottom"
  //       rootClose
  //       overlay=
  //       {
  //         <Popover id="popover-basic">
  //           <Popover.Header as="h3">{item.country + " " + item.name}</Popover.Header>
  //           <Popover.Body>
  //             <strong className="text-dark">Roast Levels:</strong> {item.roast_level} <br />
  //             <strong className="text-dark">Cupping Score:</strong> {item.cupping_score} <br />
  //             <strong className="text-dark">Tasting notes:</strong> {item.tasting_notes}
  //           </Popover.Body>
  //         </Popover>
  //       }
  //     >
  //       <Button variant="outline-light" style={{margin:"auto"}}>Flavor Profile</Button>
  //     </OverlayTrigger>
  //   )
  // }

  return (
    <div className="my-5 py-5" id="offerings">
      <h1 className="pb-5">Roast Menu Offerings</h1>
      <ListGroup className="lgScrnContent">
        {Coffee.map((item, index) => (
          <ListGroupItem key={item.id}>
            <Row style={{
              margin: 'auto',
            }} >
              <Col xs="4" lg="5" className="product-wrapper">
                <img
                  onClick={() => handleShow(item)}
                  className="img-fluid"
                  src={item.pic}
                  alt={item.name}
                />
              </Col>
              <Col xs="12" lg="4" className="coffee-info-xl my-xs-3 my-xl-1">
                <ul>
                  <li className='mb-4'><h3>{item.name}</h3></li>
                  {/* <li><strong>Price: </strong><span className="item-price">
                    {
                      item.weight === "0" ? 'select a weight' :
                        item.weight === "12" ? '$'+item.price12 :
                          '$'+item.price24
                    }</span>
                  </li> */}
                  <li className='mb-4'><strong>Country of Origin:</strong> {item.country}</li>
                  {/* // 1.) Modal Option:
                  <li><Button className="my-lg-4 my-xs-2" variant="outline-light" onClick={() => handleShow2(item)}><strong>flavor profile</strong></Button></li> */}
                  {/* // 2.) Popover option */}
                  {/* <li className="d-flex justify-content-center"><Example item={item} /></li> */}
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Flavor Profile</Accordion.Header>
                      <Accordion.Body style={{fontSize:".9rem"}}>
                        <strong className="text-dark">Roast Levels:</strong> {item.roast_level} <br />
                        <strong className="text-dark">Cupping Score:</strong> {item.cupping_score} <br />
                        <strong className="text-dark">Tasting Notes:</strong> {item.tasting_notes}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </ul>
              </Col>
              <Col className="orderForm" xs="12" lg="3">
                <Form>
                  {/* <FormGroup>
                    <Label for="weight" style={{ color: '#f5deb3' }} className="pt-4">Weight:</Label>
                    <Form.Select name="weight" aria-label="select weight" onChange={props.handleWeight(index)}>
                      <option value="0">Select an option</option>
                      <option value="12">12oz</option>
                      <option value="24">24oz</option>
                    </Form.Select>
                  </FormGroup> */}
                  <Row className="mt-4">
                    {/* <Col xl="6">
                      <Label for="qty" style={{ color: '#f5deb3' }} >Quantity:</Label>
                      <Input
                        name="qty"
                        type="number"
                        defaultValue={item.cartQty}
                        style={{ marginBottom: "20px" }}
                        onChange={props.handleCartQty(index,'+')} />
                    </Col> */}
                    <strong style={{color:"#fff",textTransform:"uppercase",fontSize:"larger",display:"inline"}}>Price: </strong>
                    <span className="item-price" style={{display:"inline",color:"#fff"}}>${item.price12} (12oz) / ${item.price24} (24oz)</span>
                      <LinkContainer to="/Schedule" >
                      <Button
                        variant="outline-light"
                        className="addToCart"
                        type="button"
                        size="lg"
                        // onClick={() =>
                        //   (item.weight === "0") 
                        //   ? showAlert() : props.addToCart(item, item.cartQty, item.selectedWeight, 0)}
                      >
                        View Roast Schedule
                      </Button>
                      </LinkContainer>
                  </Row>
                </Form>
              </Col>
            </Row>
          </ListGroupItem >
        ))
        }
      </ListGroup >
      <Container>
        <Row xs={1} md={2} className="g-4 smScrnContent">
          {Coffee.map((item, index) => (
            <Card key={item.id}>
              <Card.Img variant="top" src={item.pic} alt={item.name} style={{ width: "60%", margin: "auto", marginTop: "20px", marginBottom: "20px" }} />
              <Card.Body>
                <Card.Title>{item.country + " " + item.name}</Card.Title>
                <Card.Text style={{fontSize:".9rem"}}>
                  <p className="cardDesc">{item.info}</p>
                  <p><strong className="text-dark">Roast Levels:</strong> {item.roast_level}</p>
                  <p><strong className="text-dark">Cupping Score:</strong> {item.cupping_score}</p>
                  <p><strong className="text-dark">Tasting Notes:</strong> {item.tasting_notes}</p>
                  <p><strong className="text-dark">Rating:</strong> {item.rating}</p>
                </Card.Text>
              </Card.Body>
              <ListGroup variant="flush">
                {/* <ListGroupItem><h3>{item.name}</h3></ListGroupItem> */}
                <ListGroupItem><strong>Price: </strong><span className="item-price">
                    {/* {
                      item.weight === "0" ? 'select a weight' :
                        item.weight === "12" ? '$'+item.price12 :
                          item.price24
                    } */}
                    ${item.price12} (12oz) / ${item.price24} (24oz)
                    </span></ListGroupItem>
                <ListGroupItem><strong>Country of Origin:</strong> {item.country}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                {/* <FormGroup>
                  <Label for="weight" className="pt-4"><strong>Weight:</strong></Label>
                  <Form.Select name="weight" aria-label="select weight" onChange={props.handleWeight(index)}>
                    <option value="0">Select an option</option>
                    <option value="12">12oz</option>
                    <option value="24">24oz</option>
                  </Form.Select>
                </FormGroup> */}
                <Row className="mt-4">
                  {/* <Col xs="12" md="5">
                    <Label for="qty" ><strong>Quantity:</strong></Label>
                    <Input
                      name="qty"
                      type="number"
                      defaultValue={item.cartQty}
                      onChange={props.handleCartQty(index,'+')} />
                  </Col> */}
                  <Col xs="12">
                    <LinkContainer to="/Schedule">
                    <Button
                      variant="outline-dark"
                      style={{ margin: "23px 0 0 0" }}
                      type="button"
                      size="lg"
                      // onClick={() =>
                      //   (item.weight === "0") 
                      //   ? showAlert() : props.addToCart(item, item.cartQty, item.selectedWeight, 0)}
                    >
                      View Roast Schedule
                    </Button>
                    </LinkContainer>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
          }
        </Row>
      </Container>


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

      {/* 
      // UNUSED MODAL

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
      </Modal> */}
    </div >
  )
}







