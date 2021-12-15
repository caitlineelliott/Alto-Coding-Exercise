import React from 'react';
import { mission, editIcon, logo, FontAwesomeIcon, faCircle, faCircleRegular, driverImg, vehicleImg, userProfileIcon, vibesIcon, mapImg } from '../src/assets/js/imports';

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
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var carETA = hours + ':' + minutes + ampm;

  return (
    <div className="eta">
      {/* <div className="etaTime">{carETA.slice(0, -2)}<span class="ampm">{carETA.slice(-2)}</span></div>
      <div className="carETAtext">{`Estimated arrival at ${mission.trip.dropoff_location.name}`}</div> */}

      <div className="etaTime">5:39<span class="ampm">PM</span></div>
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

      {props.type !== 'summary' &&
        <div className="row1">
          <p className="subtitle">{props.subtitleText}</p>
          <h1 className="title">{props.titleText}</h1>
          {props.type === 'trip' && <CarETA />}
        </div>
      }

      {props.type !== 'summary' &&
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

      }

      {props.type === 'summary' &&
        <div className="dropoffPickup">
          <div id="pickup-location">
            <p>{mission.trip.pickup_location.street_line1}</p>
            <p>{mission.trip.pickup_location.street_line2}</p>
            <p>{mission.trip.pickup_location.city}, {mission.trip.pickup_location.state} {mission.trip.pickup_location.zipcode}</p>
          </div>

          <div id="dropoff-location">
            {mission.trip.dropoff_location.name.slice(0, 3) === "DFW" &&
              <p>DFW International Airport</p>
            }

            {/* <p>{mission.trip.dropoff_location.street_line1}</p> */}
            {/* <p>{mission.trip.dropoff_location.street_line2}</p>
            <p>{mission.trip.dropoff_location.city}, {mission.trip.dropoff_location.state} {mission.trip.dropoff_location.zipcode}</p> */}
            <p>American Airlines Terminal E</p>
            <p>Irving, {mission.trip.dropoff_location.state} {mission.trip.dropoff_location.zipcode}</p>
          </div>

          <div id="trip-notes">
            <div id="notes-text">
              <span>{mission.trip.notes}</span>
              <span id="edit-icon"><img src={editIcon} alt="edit icon" className="edit-icon" /></span>
            </div>
            {/* <div id="edit-icon"><img src={editIcon} alt="edit icon" className="edit-icon" /></div> */}
          </div>
        </div>}

      {props.type === 'summary' &&
        <button className="button" id={`${props.type}-btn`}>{props.buttonText}</button>}

    </div>
  )
}

function TripSections(props) {
  return (
    <div className='container' id={`${props.type}-container`}>
      <div className="Container-Row1 section-header-img" id={props.type} style={{ backgroundImage: `url(${props.headerImg})` }}>

        {props.type === 'summary' && <div className="header-subtitle">{props.subtitleText}</div>}
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

      {props.type === 'summary' &&
        <SectionRows
          type={'summary'}
          buttonText='Cancel Trip'
        />
      }

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
              {/* <p className="trip-address-bold">{mission.trip.dropoff_location.name}</p>
              <p>{mission.trip.estimated_arrival}</p> */}
              <p className="trip-address-bold">DFW Int'l Airport</p>
              <p>ETA: 5:39 PM</p>
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
