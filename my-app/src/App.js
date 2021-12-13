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
import phoneFrame from '../src/assets/images/Phone_frame.png';

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

function CarETA(props) {
  // ETA Date & Time
  let date = new Date(mission.trip.estimated_arrival);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var carETA = hours + ':' + minutes + ampm;

  return (
    <div className="eta">
      <h1 class="title carETA">{carETA.slice(0, -2)}<span class="ampm">{carETA.slice(-2)}</span></h1>
      <div className="carETAtext">{`Estimated arrival at ${mission.trip.dropoff_location.name}`}</div>
    </div>
  )
}

function SectionDetails(props) {
  return (
    <div class="Trip-details" id={props.id}>
      <p id={props.label} class="label">{props.displayLabel}</p>
      <p id={props.detail} class="trip-num">{props.displayDetail}</p>
    </div>
  )
}

function SectionRows(props) {
  return (
    <div className="Container-Row2" id={`${props.type}-containerRow2`}>
      <div className="row1">
        <p className="subtitle">{props.subtitleText}</p>
        <h1 className="title">{props.titleText}</h1>
        {props.type === 'trip' && <CarETA />}
      </div>
      <div className="row2" id={`${props.type}-row2`}>
        {props.type === 'driver' &&
          <div className="description">{props.descriptionText}</div>}

        <div class="Trip-details-container" id={`${props.type}-details`}>
          {
            props.type === 'vehicle' &&
            <SectionDetails
              id="make-model"
              label="make-model-label"
              displayLabel="Make / Model"
              detail="make-model-type"
              displayDetail={mission.vehicle.make}
            />
          }

          {
            props.type === 'vehicle' &&
            <SectionDetails
              id="vehicle-color"
              label="vehicle-color-label"
              displayLabel="Color"
              detail="color-type"
              displayDetail={mission.vehicle.color}
            />
          }

          {
            props.type === 'trip' &&
            <SectionDetails
              id="vehicle-vibe"
              label="vibe-label"
              displayLabel="Vehicle Vibe:"
              detail="vibe-name"
              displayDetail={mission.vibe.name}
            />
          }

        </div>

        <button className="button" id={`${props.type}-btn`}>{props.buttonText}</button>
      </div>

      {props.type === 'summary' && <div id="pickup-location">
        <p>{mission.trip.pickup_location.street_line1}</p>
        <p>{mission.trip.pickup_location.street_line2}</p>
        <p>{mission.trip.pickup_location.city}, {mission.trip.pickup_location.state} {mission.trip.pickup_location.zipcode}</p>
      </div>}

      {props.type === 'summary' && <div id="dropoff-location">
        <p>{mission.trip.dropoff_location.name}</p>
        <p>{mission.trip.dropoff_location.street_line1}</p>
        <p>{mission.trip.dropoff_location.street_line2}</p>
        <p>{mission.trip.dropoff_location.city}, {mission.trip.dropoff_location.state} {mission.trip.dropoff_location.zipcode}</p>
      </div>}

      {props.type === 'summary' && <div id="trip-notes">
        <p>{mission.trip.notes}</p>
      </div>}
    </div>
  )
}

function TripSections(props) {
  return (
    <div className='container'>
      <div className="Container-Row1 section-header-img" id={props.type} style={{ backgroundImage: `url(${props.headerImg})` }}>

        {props.type === 'summary' && <div>{props.subtitleText}</div>}
        {props.type === 'summary' && <CarETA />}

        {/* Trip Details for View 1 #summary Only */}
        <div class="Trip-details-container" id={`${props.type}-details`}>
          {
            props.type === 'summary' &&
            <SectionDetails
              id="fare"
              label="fare-label"
              displayLabel="Estimated Fare:"
              detail="fare-num"
              displayDetail={`$${mission.trip.estimated_fare_min.toString().slice(0, 2)} - $${mission.trip.estimated_fare_max.toString().slice(0, 2)}`}
            />
          }

          {
            props.type === 'summary' &&
            <SectionDetails
              id="passengers"
              label="passengers-label"
              displayLabel="Passengers:"
              detail="passengers-num"
              displayDetail={`${mission.trip.passengers_min} - ${mission.trip.passengers_max}`}
            />
          }

          {
            props.type === 'summary' &&
            <SectionDetails
              id="payment"
              label="payment-label"
              displayLabel="Payment:"
              detail="payment-type"
              displayDetail={mission.trip.payment}
            />
          }
        </div>

      </div>

      {props.type === 'driver' &&
        <SectionRows
          type={'driver'}
          subtitleText='Your Driver'
          titleText={mission.driver.name}
          descriptionText={mission.driver.bio}
          buttonText='Contact Driver'
        />
      }

      {props.type === 'vehicle' &&
        <SectionRows
          type={'vehicle'}
          subtitleText='Your Vehicle'
          titleText={mission.vehicle.license}
          buttonText='Identify Vehicle'
        />
      }

      {props.type === 'trip' &&
        <SectionRows
          type={'trip'}
          subtitleText='Your Trip'
          buttonText='Change Vehicle Vibe'
        />
      }
    </div >

  )
}

function App() {
  return (
    <main>
      <div className="App">
        {/* <div className="phone-frame" style={{ backgroundImage: `url(${phoneFrame})` }}> */}
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
          />

          <TripSections
            type={'driver'}
            headerImg={driverImg}
            imgAltText='A photo of your driver' />

          <TripSections
            type={'vehicle'}
            headerImg={vehicleImg}
            imgAltText='A photo of your vehicle'
            buttonText='Identify Vehicle' />

          <TripSections
            type={'trip'}
            headerImg={mapImg}
            imgAltText='A photo of your destination map'
          />

          <footer className="App-footer">
            <div className="user-icon"><img src={userProfileIcon} alt="Profile icon" /></div>
            <div className="trip-address">
              <p className="trip-address-bold">{mission.trip.dropoff_location.name}</p>
              <p>{mission.trip.estimated_arrival}</p>
            </div>
            <div className="other-icon"><img src={vibesIcon} alt="Change Vibes Icon" /></div>
          </footer>

        </div>
        {/* </div> */}
      </div >
    </main >
  );
}

export default App;
