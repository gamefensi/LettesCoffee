
import { Row, Container, Col } from "reactstrap"


export default function Footer(props) {
  return (
    <footer className="footer">
      <Container className="footer-inner-container">
        <Row>
          <Col className="col">
            <h3 className="title">Customer Service Support:</h3>
            <p>1-877-GET-CAFE<br />info@lettescoffee.com</p>
            <div className="icons">
              <a href="https://www.facebook.com/groups/marlettescoffee" target="_blank">
                <img src="images/social media icons/fb.svg" />
              </a>
              <a href="https://twitter.com/EVFY_inc" target="_blank">
                <img src="images/social media icons/twitter.svg" />
              </a>
              <a href="https://www.linkedin.com/company/evfy" target="_blank">
                <img src="images/social media icons/linkedIn.svg" />
              </a>
              <a href="https://www.instagram.com/evfy_inc/" target="_blank">
                <img src="images/social media icons/IG.svg" />
              </a>
            </div>
          </Col>
          <Col className="col">
            <h3 className="title">Where to Find Us:</h3>
            <p>Marlette's Coffee<br />1142 Via Valle Vista<br />Escondido, CA 92029</p>
          </Col>
          <Col className="col logo">
            <a href="/">
              <img src="images/logo/logo_bw.png" width="150" />
            </a>
          </Col>
        </Row>
      </Container>

      <div className="disclaimer">
        <p>&copy; 2022 Marlette's Coffee All rights reserved. <a href="#" target="_blank">Privacy Policy</a> and <a href="#" target="_blank">Terms of Use</a></p>
      </div>
    </footer>
  )
}