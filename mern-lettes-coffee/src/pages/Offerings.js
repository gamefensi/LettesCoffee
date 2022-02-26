import { ListGroup, ListGroupItem } from 'reactstrap';
import { useState } from "react";
import { Modal } from 'react-bootstrap';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Coffee } from '../data/coffeelist';

export default function Offerings(props) {
  const [show, setShow] = useState(false);
  const [showImge, setShowImge] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setShowImge(product);
  }
  const cart = props.cart;


  return (
    <div className="m-5">
      <h1 className="">Coffee List</h1>
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
      <ListGroup>
        {Coffee.map((item) => (
          <ListGroupItem style={{ display: "block" }} key={item.id}>
            <div className="row" style={{ padding: "10px 0 10px 50px" }}>
              <div>
                {item.name}
                <span
                  style={{
                    color: "red",
                    marginLeft: "10px",
                  }}
                >
                  ${item.price12} <span style={{ color: "black" }}>(12oz)</span>
                </span>
              </div>
              <img onClick={() => handleShow(item)} style={{ margin: "10px 50px 10px 0", width: "150px", objectFit: "cover" }} className="img-fluid" src={item.pic} alt={item.name} />
              <div className="addSubBtns col-2 align-items-center d-flex ">
                <button
                  id="minusBtn"
                  type="button"
                  className="btn btn-light border"
                  style={{ marginRight: "10px" }}
                  onClick={() => props.removeFromCart(item)}
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="fas fa-sm"
                  />
                </button>

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
              </div>
              {/* <div style={{ display: "inline" }} className="col">
                                <p style={{ marginRight: "10px", width: "200px" }}>Quantity:</p>
                                <input style={{ marginRight: "10px", width: "50px", height: "50px", textAlign: "center" }} value={item.cartQty} disabled />
                            </div> */}
            </div>

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
    </div>
  )
}






