import React from "react";
import { Container } from "reactstrap";

export default function About(props) {


  return (
  <div id="history" className="">
    <h2 className="h1 text-center text-danger pt-5 aos-init aos-animate" data-aos="fade-up">Our History</h2>
    <div className="timeline">
      <ul>
        <li data-aos="fade-up" className="has_thumbnail aos-init aos-animate">
          <div className="content">
            <h5 className="entry-title">2007</h5>
            <p>Ritual opens a kiosk in the Bayview, tucked inside the equally revolutionary Flora Grubb Gardens</p>
            <img width="600" height="400" src="" className="" alt="" loading="lazy" srcset="" sizes="(max-width: 600px) 100vw, 600px" />
          </div>
        </li>
        <li data-aos="fade-up" className="has_thumbnail aos-init">
          <div className="content">
            <p>Under coffee buyer Ryan Brown, Ritual begins its relationship-based sourcing model</p>
            <img width="441" height="590" src="" className="" alt="" loading="lazy" />
          </div>
        </li>
        <li data-aos="fade-up" className="has_thumbnail aos-init">
          <div className="content">
            <h5 className="entry-title">2006</h5>
            <p>We start roasting on a little 5 kilo Probat in the back of the Valencia Street café.</p>
            <img width="460" height="600" src=""/>
          </div>
        </li>
        <li data-aos="fade-up" className="has_thumbnail aos-init">
          <div className="content">
            <h5 className="entry-title">2005</h5>
            <p>We open our first café on Valencia Street and introduce San Francisco to the style of coffee that it’s now known for. By day 3, we already have a line to the corner.</p>
            <img width="600" height="400" src="" />
          </div>
        </li>
        <div style="clear:both;"></div>
      </ul>
    </div>
  </div>
  )
}

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = [
      {
        id: 1,
        date: "October 2018",
        description: "We started our journey by purchasing our very first roaster - a Genecafe CBR-101. Here we began experimenting on roast times and flavors. These early days helped spark our passion for roasting",
        pic: ""
      },
      {
        id: 2,
        date: "March 2019",
        description: "As we became more serious, we wanted more precision in a professional drum coffee roaster. We decided that the Aillio bullet was the best choice for reaching the next level of coffee roasting. ",
        pic: ""
      },
      {
        id: 3,
        date: "April 2019",
        description: "We moved to Escondido, CA where we set up our official roasting operations",
        pic: ""
      },
      {
        id: 4,
        date: "November 2019",
        description: "We created our Facebook group, Marlette's Coffee Lounge, where close friends and family can share their love of coffee, view our offerings, and place orders for our upcoming roasting dates.",
        pic: ""
      },
      {
        id: 5,
        date: "September 2020",
        description: "Our talented close friend helped us design our very first logo. We loved it!",
        pic: ""
      },
      {
        id: 6,
        date: "November 2021",
        description: "We created our first branded merchandise available to buy in the store.",
        pic: ""
      },
    ]

  }

  render() {

    return(
        <div id="history" className="">
          <h2 className="h1 text-center text-danger pt-5 aos-init aos-animate" data-aos="fade-up">Our History</h2>
          {/* <div className="timeline"> */}

        </div>
    )
  }
}

// create new timelines