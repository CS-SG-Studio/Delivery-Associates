import React from 'react';
import './NavBar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, RedditShareButton, 
         TwitterShareButton,EmailIcon,FacebookIcon, LinkedinIcon, RedditIcon, TwitterIcon,} from "react-share";


const shareUrl = 'https://github.com/CS-SG-Studio/Delivery-Associates';
const title = 'COVID Vaccine Equity Tracker';


class Footer extends React.Component{
  constructor() {
    super();
    this.state = {s1: "secondary", s2: "secondary", s3: "secondary", s4: "danger"}
  }

  changeColor(num) {
    this.setState({s1: (num === 0) ? "danger" : "secondary", s2: (num === 1) ? "danger" : "secondary", 
                   s3: (num === 2) ? "danger" : "secondary" , s4: (num === 3) ? "danger" : "secondary"})
  }

  render() {
      return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand href="#home">
            Stanford CS + Social Good Studio
          </Navbar.Brand>
        </Nav>
        <div className="mr-auto">
        {/* <FacebookShareButton url={shareUrl} quote={title}><FacebookIcon size={32} round/></FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}> <TwitterIcon size={32} round/></TwitterShareButton>
        <LinkedinShareButton url={shareUrl}><LinkedinIcon size={32} round/></LinkedinShareButton>
        <RedditShareButton url={shareUrl} title={title} windowWidth={660} windowHeight={460}><RedditIcon size={32} round/></RedditShareButton>
        <EmailShareButton url={shareUrl} subject={title} body=""><EmailIcon size={32} round/></EmailShareButton> */}
        </div>
        <ButtonGroup aria-label="Basic example" className="mr-sm-2">
            <Button variant={this.state.s4} onClick={() => {this.props.parentCallback(3); this.changeColor(3);}}>Percent Vaccinated</Button>
            <Button variant={this.state.s1} onClick={() => {this.props.parentCallback(0); this.changeColor(0);}}>Cases per Million</Button>
            <Button variant={this.state.s2} onClick={() => {this.props.parentCallback(1); this.changeColor(1);}}>GDP per Capita</Button>
            <Button variant={this.state.s3} onClick={() => {this.props.parentCallback(2); this.changeColor(2);}}>Life Expectancy</Button>
        </ButtonGroup>
      </Navbar>
    );
  }
}

export default Footer;
