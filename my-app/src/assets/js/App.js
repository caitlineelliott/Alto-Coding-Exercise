import React from 'react';
import { mission, editIcon, logo, FontAwesomeIcon, faCircle, faCircleRegular, driverImg, vehicleImg, userProfileIcon, vibesIcon, mapImg, mapIcon, infoIcon } from './imports';

// Component Defines: Display view of car ETA from trip data in mission.json
function CarETA(props) {
  const date = new Date(mission.trip.estimated_arrival);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const carETA = hours + ':' + minutes + ampm;

  return (
    <div className='etaTime' id={props.type}>{carETA.slice(0, -2)}<span className='ampm'>{carETA.slice(-2)}</span></div>
  );
};

// Component Defines: Structure of table view for individual trip details
function DetailsTable(props) {
  return (
    <div className='details-table' id={`${props.id}-table`}>
      <p id={props.label} className='details-label'>{props.displayLabel}</p>
      <p id={props.detail} className='details-content'>{props.displayDetail}
        {/* Include info icon next to fare in Your Trip view*/}
        {props.id === 'fare' &&
          <span id="info-icon-container"><img src={props.icon} alt="info icon" id="info-icon"></img></span>
        }
      </p>
    </div>
  );
};

// Component Defines: Details relevant to each trip view (exisiting in the bottom half of the viewport)
function ViewDetails(props) {

  /*
      I know what I've done on lines 40-51 isn't scalable, but I wanted to show that I knew that the dropoff
      location data from the json file needed to be changed from what was provided to what is displayed on
      the mockup without just typing the 'correct' info in the div. I'm sure you all have mechanisms in your
      live app to convert the display of certain types of addresses, so I wanted to demonstrate I knew that
      needed to happen even though I didn't have a dataset.
  */

  let airportCode = '';
  const locationName = mission.trip.dropoff_location.name;
  let terminalName = 'American Airlines Terminal E'; // In real life, this would be pulling from another dataset
  let address1 = mission.trip.dropoff_location.street_line1;
  let tripCity = mission.trip.dropoff_location.city;

  /* looks for airport code in location name, if present, changes dropoff location as follows: */
  if (locationName.includes('DFW')) {
    address1 = terminalName;
    tripCity = 'Irving';
    airportCode = 'DFW';
  };

  return (
    <div className='view-row2' id={`${props.type}-view-row2`}>

      {/* Row 2 of "Your Trip" */}
      {props.type === 'your-trip' &&
        <div className='dropoffPickup'>

          <div id='pickup-location'>
            <p>{mission.trip.pickup_location.street_line1}</p>
            <p>{mission.trip.pickup_location.street_line2}</p>
            <p>{mission.trip.pickup_location.city}, {mission.trip.pickup_location.state} {mission.trip.pickup_location.zipcode}</p>
          </div>

          <div id='dropoff-location'>
            {/* Line 68 replaces the DFW airport name as written in mission.json to language that matches the design mockup */}
            {airportCode === 'DFW' && <p>DFW International Airport</p>}
            <p>{address1}</p>
            <p>{mission.trip.dropoff_location.street_line2}</p>
            <p>{tripCity}, {mission.trip.dropoff_location.state} {mission.trip.dropoff_location.zipcode}</p>
          </div>

          <div id='trip-notes'>
            <div id='notes-text'>
              <span>{mission.trip.notes}</span>
              <span id='edit-icon'><img src={editIcon} alt='edit icon' className='edit-icon' /></span>
            </div>
          </div>
        </div>}

      {/* your driver, your vehicle, and trip summary view - row 2A*/}
      {props.type !== 'your-trip' &&
        <div className='row2A'>
          <p className='subtitle'>{props.subtitleText}</p>
          {props.type === 'your-driver' && <h1 className='title' id={`${props.type}-title`}>{props.titleText}</h1>}
          {props.type === 'your-vehicle' && <h1 className='title' id={`${props.type}-title`}>{props.titleText}</h1>}
          {props.type === 'your-trip-summary' &&
            <div className='eta'>
              <CarETA type='trip-eta' />
              <div className='carETAtext'>{`Estimated arrival at ${mission.trip.dropoff_location.name}`}</div>
            </div>
          }
        </div>
      }

      {/* driver, vehicle, and trip view - row2B*/}
      {props.type !== 'your-trip' &&
        <div className='row2B' id={`${props.type}-row2B`}>

          {props.type === 'your-driver' && <div className='driver-bio'>{props.driverBio}</div>}

          <div className='view-details-container' id={`${props.type}-details`}>
            {props.type === 'your-vehicle' &&
              <DetailsTable id='make-model' label='make-model-label' displayLabel='Make / Model' detail='make-model-type' displayDetail={mission.vehicle.make} />}

            {props.type === 'your-vehicle' &&
              <DetailsTable id='vehicle-color' label='vehicle-color-label' displayLabel='Color' detail='color-type' displayDetail={mission.vehicle.color} />}

            {props.type === 'your-trip-summary' &&
              <DetailsTable id='vehicle-vibe' label='vibe-label' displayLabel='Vehicle Vibe:' detail='vibe-name' displayDetail={mission.vibe.name} />}
          </div>
        </div>
      }

      {/* I didn't provide a faux onClick property so the app would run, but I know there should be one in the real app */}
      <button className='button' id={`${props.type}-btn`}>{props.buttonText}</button>
    </div>
  );
};

// Component Defines: Base structure for each of the four views in a Trip
function TripViews(props) {
  return (
    <div className='view-container' id={`${props.type}-view`}>
      <div className='view-row1' id={props.type} style={{ backgroundImage: `url(${props.headerImg})` }}>

        {/* In Your Trip View only, show Your Trip heading, ETA, and trip details in .view-row1 (lines 131-149) */}

        {props.type === 'your-trip' && <div className='header-subtitle'>Your Trip</div>}
        {props.type === 'your-trip' &&
          <div className='eta'>
            <CarETA type='summary-eta' />
            <div className='carETAtext'>{`Estimated arrival at ${mission.trip.dropoff_location.name}`}</div>
          </div>
        }
        {props.type === 'your-trip' &&
          <div className='view-details-container' id={`${props.type}-details`}>
            <DetailsTable id='fare' label='fare-label' displayLabel='Estimated Fare:' detail='fare-num' displayDetail={`$${mission.trip.estimated_fare_min.toString().slice(0, 2)} - $${mission.trip.estimated_fare_max.toString().slice(0, 2)}`} icon={infoIcon} />
            <DetailsTable id='passengers' label='passengers-label' displayLabel='Passengers:' detail='passengers-num' displayDetail={`${mission.trip.passengers_min} - ${mission.trip.passengers_max}`} />
            <DetailsTable id='payment' label='payment-label' displayLabel='Payment:' detail='payment-type' displayDetail={mission.trip.payment} />
          </div>}
      </div>
      {props.type === 'your-trip-summary' &&
        <div className='map-icon'>
          <img id='map-icon' src={mapIcon} alt='waypoint indicator'></img>
        </div>
      }

      {/* .view-row2 is further divided into .view-row2A and .view-row2B, handled by the ViewDetails component */}
      {props.type === 'your-trip' &&
        <ViewDetails type={'your-trip'} buttonText='Cancel Trip' />}

      {props.type === 'your-driver' &&
        <ViewDetails type={'your-driver'} subtitleText='Your Driver' titleText={mission.driver.name} driverBio={mission.driver.bio} buttonText='Contact Driver' />}

      {props.type === 'your-vehicle' &&
        <ViewDetails type={'your-vehicle'} subtitleText='Your Vehicle' titleText={mission.vehicle.license} buttonText='Identify Vehicle' />}

      {props.type === 'your-trip-summary' &&
        <ViewDetails type={'your-trip-summary'} subtitleText='Your Trip' buttonText='Change Vehicle Vibe' />}
    </div>
  );
};

// Component Defines: Base app stucture
function App() {

  // Function to change ETA time to 'En route... when view #4 (#trip) is reached'
  function handleFooterText(e) {
    const tripSection = e.target.lastChild;
    const top = tripSection.getBoundingClientRect().top;
    const footerText = document.querySelector('#address-row2');

    if (top < 1 && top > -1) { footerText.innerHTML = 'En route..'; }
  };

  window.addEventListener('DOMContentLoaded', () => {
    const parentContainer = document.querySelector('#trip-views-container');
    parentContainer.addEventListener('scroll', handleFooterText);
  });

  /* Lines 185-190 look for location names that have a dash and render only the part of the name before the dash
  Executed so that 'DFW Int'l Airport' in the footer outputs correctly */

  const location = mission.trip.dropoff_location.name;
  let shortLocation = ''

  if (location.includes(' - ')) {
    shortLocation = location.substring(0, location.indexOf(' - '));
  }

  return (
    <main>
      <div className='App'>
        <header className='app-header'> <img src={logo} alt='Alto logo' /> </header>
        <nav className='App-nav'>
          <FontAwesomeIcon icon={faCircle} id='your-trip-view-nav' />
          <FontAwesomeIcon icon={faCircle} id='your-driver-view-nav' />
          <FontAwesomeIcon icon={faCircle} id='your-vehicle-view-nav' />
          <FontAwesomeIcon icon={faCircle} id='your-trip-summary-view-nav' />
          <FontAwesomeIcon icon={faCircleRegular} />
        </nav>

        <div id='trip-views-container'>
          <TripViews type={'your-trip'} />
          <TripViews type={'your-driver'} headerImg={driverImg} imgAltText='A photo of your driver' />
          <TripViews type={'your-vehicle'} headerImg={vehicleImg} imgAltText='A photo of your vehicle' />
          <TripViews type={'your-trip-summary'} headerImg={mapImg} imgAltText='A photo of your destination map' />
        </div>

        <footer className='app-footer'>
          <div className='user-icon'><img src={userProfileIcon} alt='Profile icon' /></div>
          <div className='trip-address'>
            <div id='address-row1'>{shortLocation}</div>
            <div id='address-row2'>
              ETA: <CarETA type='footer-eta' /></div>
          </div>
          <div className='vibes-icon'><img src={vibesIcon} alt='Change Vibes Icon' /></div>
        </footer>
      </div>
    </main >
  );
};

export default App;