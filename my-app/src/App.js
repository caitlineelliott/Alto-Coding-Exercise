import React from 'react';
import { mission, editIcon, logo, FontAwesomeIcon, faCircle, faCircleRegular, driverImg, vehicleImg, userProfileIcon, vibesIcon, mapImg } from '../src/assets/js/imports';

// Function for Active Nav Styling
const handleActiveNav = (e) => {
  for (let i = 0; i < e.target.children.length; i++) {
    let sections = e.target.children[i].id;
    let top = e.target.children[i].getBoundingClientRect().top;
    let activeNav = document.querySelector(`#${sections}-nav`);

    if (top < 1 && top > -1) { activeNav.style.color = 'black'; }
    else { activeNav.style.color = 'rgb(221,218,214)'; }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  let parentContainer = document.querySelector('#trip-views-container');
  parentContainer.addEventListener('scroll', handleActiveNav);
});

// Component Defines: Display view of car ETA from trip data
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
    <div className="eta" id={props.type}>
      {/* <div className="etaTime">{carETA.slice(0, -2)}<span class="ampm">{carETA.slice(-2)}</span></div>
      <div className="carETAtext">{`Estimated arrival at ${mission.trip.dropoff_location.name}`}</div> */}

      <div className="etaTime">5:39<span class="ampm">PM</span></div>
      <div className="carETAtext">{`Estimated arrival at ${mission.trip.dropoff_location.name}`}</div>
    </div>
  )
}

// Component Defines: Structure of table view for individual trip details
function DetailsTable(props) {
  return (
    <div class="details-table" id={`${props.id}-table`}>
      <p id={props.label} class="label">{props.displayLabel}</p>
      <p id={props.detail} class="trip-num">{props.displayDetail}</p>
    </div>
  )
}

// Component Defines: Details relevant to each trip view
function ViewDetails(props) {
  return (
    <div className="view-row2" id={`${props.type}-view-row2`}>

      {/* summary view, row 2 (not divided into A & B sections because there are 3 pieces of information) */}
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
          </div>
        </div>}

      {/* driver, vehicle, and trip view - row 2 - A*/}
      {props.type !== 'summary' &&
        <div className="row2A">
          <p className="subtitle">{props.subtitleText}</p>
          {props.type === 'driver' && <h1 className="title" id={`${props.type}-title`}>{props.titleText}</h1>}
          {props.type === 'vehicle' && <h1 className="title" id={`${props.type}-title`}>{props.titleText}</h1>}
          {props.type === 'trip' && <CarETA type="trip-eta" />}
        </div>
      }

      {/* driver, vehicle, and trip view - row2 - B*/}
      {props.type !== 'summary' &&
        <div className="row2B" id={`${props.type}-row2B`}>

          {props.type === 'driver' && <div className="driver-bio">{props.driverBio}</div>}

          {/* .view-row2B's content is handled by the DetailsTable component */}
          <div class="view-details-container" id={`${props.type}-details`}>
            {props.type === 'vehicle' &&
              <DetailsTable id="make-model" label="make-model-label" displayLabel="Make / Model" detail="make-model-type" displayDetail={mission.vehicle.make} />}

            {props.type === 'vehicle' &&
              <DetailsTable id="vehicle-color" label="vehicle-color-label" displayLabel="Color" detail="color-type" displayDetail={mission.vehicle.color} />}

            {props.type === 'trip' &&
              <DetailsTable id="vehicle-vibe" label="vibe-label" displayLabel="Vehicle Vibe:" detail="vibe-name" displayDetail={mission.vibe.name} />}
          </div>
        </div>
      }

      <button className="button" id={`${props.type}-btn`}>{props.buttonText}</button>
    </div>
  )
}

// Component Defines: Base structure for each of the four views in a Trip
function TripViews(props) {
  return (
    <div className='view-container' id={`${props.type}-view`}>
      <div className="view-row1" id={props.type} style={{ backgroundImage: `url(${props.headerImg})` }}>

        {/* In Summary View only, show Your Trip heading, ETA, and trip details in .view-row1 */}
        {props.type === 'summary' && <div className="header-subtitle">Your Trip</div>}
        {props.type === 'summary' && <CarETA type='summary-eta' />}
        {props.type === 'summary' &&
          <div class="view-details-container" id={`${props.type}-details`}>
            <DetailsTable id="fare" label="fare-label" displayLabel="Estimated Fare:" detail="fare-num" displayDetail={`$${mission.trip.estimated_fare_min.toString().slice(0, 2)} - $${mission.trip.estimated_fare_max.toString().slice(0, 2)}`} />
            <DetailsTable id="passengers" label="passengers-label" displayLabel="Passengers:" detail="passengers-num" displayDetail={`${mission.trip.passengers_min} - ${mission.trip.passengers_max}`} />
            <DetailsTable id="payment" label="payment-label" displayLabel="Payment:" detail="payment-type" displayDetail={mission.trip.payment} />
          </div>}

      </div>

      {/* .view-row2 is further divided into .view-row2A and .view-row2B, handled by the ViewDetails component */}
      {props.type === 'summary' &&
        <ViewDetails type={'summary'} buttonText='Cancel Trip' />}

      {props.type === 'driver' &&
        <ViewDetails type={'driver'} subtitleText='Your Driver' titleText={mission.driver.name} driverBio={mission.driver.bio} buttonText='Contact Driver' />}

      {props.type === 'vehicle' &&
        <ViewDetails type={'vehicle'} subtitleText='Your Vehicle' titleText={mission.vehicle.license} buttonText='Identify Vehicle' />}

      {props.type === 'trip' &&
        <ViewDetails type={'trip'} subtitleText='Your Trip' buttonText='Change Vehicle Vibe' />}
    </div>
  )
}

// Component Defines: Base app stucture
function App() {
  return (
    <main>
      <div className="App">
        <header className="App-header"> <img src={logo} alt="Alto logo" /> </header>

        <nav className="App-nav">
          <FontAwesomeIcon icon={faCircle} id='summary-view-nav' />
          <FontAwesomeIcon icon={faCircle} id='driver-view-nav' />
          <FontAwesomeIcon icon={faCircle} id='vehicle-view-nav' />
          <FontAwesomeIcon icon={faCircle} id='trip-view-nav' />
          <FontAwesomeIcon icon={faCircleRegular} />
        </nav>

        <div id="trip-views-container">
          <TripViews type={'summary'} />
          <TripViews type={'driver'} headerImg={driverImg} imgAltText='A photo of your driver' />
          <TripViews type={'vehicle'} headerImg={vehicleImg} imgAltText='A photo of your vehicle' />
          <TripViews type={'trip'} headerImg={mapImg} imgAltText='A photo of your destination map' />
        </div>

        <footer className="App-footer">
          <div className="user-icon"><img src={userProfileIcon} alt="Profile icon" /></div>
          <div className="trip-address">
            {/* <p className="trip-address-bold">{mission.trip.dropoff_location.name}</p>
              <p>{mission.trip.estimated_arrival}</p> */}
            <p className="trip-address-bold">DFW Int'l Airport</p>
            <p>ETA: 5:39 PM</p>
          </div>
          <div className="vibes-icon"><img src={vibesIcon} alt="Change Vibes Icon" /></div>
        </footer>
      </div>
    </main>
  );
}

export default App;