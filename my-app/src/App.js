import './App.css';
import React from 'react';
// import { useEffect } from 'react';

// Trip Data
import mission from '../src/assets/data/mission.json'

// Images
import logo from '../src/assets/images/Alto_logo.png';
import userProfileIcon from '../src/assets/images/Profile_icon.png';
import vibesIcon from '../src/assets/images/Vibes_icon.png';
import driverImg from '../src/assets/images/Driver_photo.png';
import vehicleImg from '../src/assets/images/Vehicle_photo.png';
import mapImg from '../src/assets/images/Map_overview.png';

// FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as faCircleRegular } from '@fortawesome/free-regular-svg-icons';


// Active Nav Styling
const handleActiveNav = (e) => {

  for (let i = 2; i < e.target.children.length - 1; i++) {
    let sections = e.target.children[i].firstChild.id;
    let top = e.target.children[i].getBoundingClientRect().top;
    let activeNav = document.querySelector(`#${sections}-nav`);

    if (top < 1 && top > -1) { activeNav.style.color = 'black'; }
    else { activeNav.style.color = 'rgb(221,218,214)'; }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let parentContainer = document.querySelector('.Container');
  parentContainer.addEventListener('scroll', handleActiveNav);
});



function TripSections(props) {


  // let position = sections[i].getBoundingClientRect();

  // let activeNav = document.querySelector(`#${sections[i].firstChild.id}-nav`);
  // // let vhTwoThirds = ((window.innerHeight / 3)) * 2;

  // // If current info top is < 2/3 of the window height
  // // And ALSO current info bottom is > 2/3 of the window height
  // if (position.top < window.innerHeight && position.top > 0) {
  //   activeNav.style.color = 'black'
  // } else {
  //   activeNav.style.color = 'rgb(221,218,214)';
  // }

  // useEffect(() => {
  //   window.addEventListener('scroll', handleActiveNav, { passive: true });

  //   return () => { window.removeEventListener('scroll', handleActiveNav); };
  // }, []);

  return (
    <div className='container'>
      <div className="Container-Row1 section-header-img" id={props.type} style={{ backgroundImage: `url(${props.headerImg})` }}>

        {props.type === 'summary' && <div>{props.subtitleText}</div>}
        {props.type === 'summary' && <h1>{props.titleText}</h1>}
        {props.type === 'summary' && <div>{props.etaText}</div>}

      </div>

      <div className="Container-Row2">
        <p id="subtitle">{props.subtitleText}</p>
        <h1 id="title">{props.titleText}</h1>
        {props.type === 'driver' && <hr />}
        <p id="description">{props.descriptionText}</p>
        <button id="button">{props.buttonText}</button>

        {props.type === 'summary' && <div>{props.etaText}</div>}
      </div>
    </div>

  )
}

function App() {
  // ETA Date & Time
  let date = new Date(mission.trip.estimated_arrival);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;

  return (
    <main>
      <div className="App">
        <div className="Container">
          <header className="App-header">
            <img src={logo} alt="Alto logo" />
          </header>
          <nav className="App-nav">
            <FontAwesomeIcon icon={faCircle} id='summary-nav' />
            <FontAwesomeIcon icon={faCircle} id='driver-nav' />
            <FontAwesomeIcon icon={faCircle} id='vehicle-nav' />
            <FontAwesomeIcon icon={faCircle} id='trip-nav' />
            <FontAwesomeIcon icon={faCircleRegular} />
          </nav>

          <TripSections
            type={'summary'}
            subtitleText={'Your Trip'}
            etaText={`Estimated arrival at ${mission.trip.dropoff_location.name}`}
            titleText={strTime}
            buttonText='Cancel Trip'
          />

          <TripSections
            type={'driver'}
            headerImg={driverImg}
            imgAltText='A photo of your driver'
            subtitleText='Your Driver'
            titleText={mission.driver.name}
            descriptionText={mission.driver.bio}
            buttonText='Contact Driver' />

          <TripSections
            type={'vehicle'}
            headerImg={vehicleImg}
            imgAltText='A photo of your vehicle'
            subtitleText='Your Vehicle'
            titleText={mission.vehicle.license}
            descriptionText={mission.vehicle.make}
            buttonText='Identify Vehicle' />

          <TripSections
            type={'trip'}
            headerImg={mapImg}
            imgAltText='A photo of your destination map'
            subtitleText='Your Trip'
            titleText={mission.trip.estimated_arrival}
            descriptionText={mission.vibe.name}
            buttonText='Change Vehicle Vibe' />

          <footer className="App-footer">
            <div className="user-icon"><img src={userProfileIcon} alt="Profile icon" /></div>
            <div className="trip-address">
              <p className="trip-address-bold">{mission.trip.dropoff_location.name}</p>
              <p>{mission.trip.estimated_arrival}</p>
            </div>
            <div className="other-icon"><img src={vibesIcon} alt="Change Vibes Icon" /></div>
          </footer>

        </div>
      </div >
    </main >
  );
}

export default App;
