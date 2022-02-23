import React, {Component} from "react";
import { Container } from "reactstrap";
import { Milestones } from "../data/milestones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo/logo_bw.png"

export default function About(props) {

  return (
    <Container fluid id="aboutUs">
      <h1 className="h1 text-center py-5">Our Story</h1>
      <div className="desc-box">
      <img src={logo} alt="logo-bw" width="100px" className="pb-5"></img>
        <p><strong>Lette's Coffee</strong> is a micro-roastery based out of Escondido, CA. The hobby-turned-business all started on a stove top skillet in the hands of the husband and wife duo: Marlette and Jesse Vater. As they advanced their skills and machinery, they decided that everyone deserves an Effortless, Fresh, and Divine coffee experience. That's why <strong>Lette's Coffee</strong> only offers a roast-to-order menu with recently harvested selections from across the world.</p>
        
      </div>
      <Timeline />
    </Container>
  )
}

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Milestones: Milestones
    }
  }

  render() {

    return (
      <Container fluid id="history" className="">
        <h2 className="h1 text-center pt-5 aos-init aos-animate" data-aos="fade-up">Our History</h2>
        <div className="timeline d-flex" style={{margin:"auto",width:"100%"}}>
          <ul>
            <CreateTimeline events={this.state.Milestones} />
            <div style={{clear:"both"}}></div>
            <FontAwesomeIcon icon={faSeedling} />
          </ul>
        </div>
      </Container>
    )
  }
}

// create new timelines
const CreateTimeline = (props) => {
  return (
    props.events.map(event => (
      <li data-aos="fade-up" className="has_thumbnail aos-init" key={event.id}>
        <div className="content ">
          <h5 className="entry-title">{event.date}</h5>
          <p>{event.description}</p>
          <img style={{width:"400px", height:"300px"}} src={event.pic} alt={event.alt} loading="lazy"/>
        </div>
      </li>
    ))
  )
}