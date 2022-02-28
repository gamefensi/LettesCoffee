
import { Row, Container, Col,Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from './images/logo/logo_bw.png';


export default function Footer(props) {
  return (
    <footer className="footer">
      <Container fluid className="footer-inner-container">
        <Row>
          <Col className="col-sm-3 logo">
            <a href="/">
              <img src={logo} width="150" alt='lettes coffee logo'/>
            </a>
          </Col>
          <Col className="page-links col-sm-3 d-flex align-items-end">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/About">About</a></li>
              <li><a href="/Schedule">Roast Schedule</a></li>
              <li><a href="/Offerings">Offerings</a></li>
              <li><a href="/Contact">Contact</a></li>
            </ul>
          </Col>
          <Col className="col-sm-3">
            <h3 className="title">Questions?</h3>
            <p>1-877-GET-CAFE<br />info@lettescoffee.com</p>
            <div className="icons">
              <a href="https://www.facebook.com/groups/marlettescoffee" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </div>
          </Col>


        </Row>
      </Container>

      <div className="disclaimer">
        <p>&copy; 2022 Marlette's Coffee. All rights reserved. <Button color="link" target="_blank">Privacy Policy</Button>and<Button color="link" target="_blank">Terms of Use</Button></p>
      </div>
    </footer>
  )
}