import './App.css';
import mission from '../src/assets/data/mission.json'
import React from 'react';

// states: summary, driver, vehicle, trip

function TripInformation(props) {
  return (
    <div className='container'>
      <div className="Container-Row1">
        <img src={mission.driver.image} alt="Your Driver"></img>
      </div >
      <div className="Container-Row2">
        <p>{props.subtitleText}</p>
        <h1>{props.titleText}</h1>
        <p>{props.descriptionText}</p>
        <button>{props.buttonText}</button>
      </div>
    </div>

  )
}

function App() {
  return (
    <main>
      <div className="App">
        <div className="Container">
          <header className="App-header">
            <h1>Alto</h1>
          </header>
          <nav className="App-nav">
            <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>

          <div className="Container-Row1">
            <div class="trip-info">
              <h2>Your Trip</h2>
              <p>5:39PM</p>
              <p>Estimated Arrival at {mission.trip.dropoff_location.name}</p>
              <div class="Trip-details-container">
                <div class="Trip-details" id="trip-fare">
                  <p id="fare-label">Fare</p>
                  <p id="fare-amount">${mission.trip.estimated_fare_min.toString().slice(0, 2)} - ${mission.trip.estimated_fare_max.toString().slice(0, 2)}</p>
                </div>
                <div class="Trip-details" id="trip-passengers">
                  <p id="passenger-label">Passengers</p>
                  <p id="passenger-amount">{mission.trip.passengers_min} - {mission.trip.passengers_max}</p>
                </div>
                <div class="Trip-details" id="trip-payment">
                  <p id="payment-label">Payment</p>
                  <p id="payment-type">{mission.trip.payment}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Container-Row2">
            <div class="Trip-info">
              <div className="trip-start">
                <p>{mission.trip.pickup_location.street_line1}</p>
                <p>{mission.trip.pickup_location.street_line2}</p>
                <p>{mission.trip.pickup_location.city}, {mission.trip.pickup_location.state} {mission.trip.pickup_location.zipcode}</p>
              </div>
              <div className="trip-end">
                <p>{mission.trip.dropoff_location.name}</p>
                <p>{mission.trip.dropoff_location.street_line1}</p>
                <p>{mission.trip.dropoff_location.street_line2}</p>
                <p>{mission.trip.dropoff_location.city}, {mission.trip.dropoff_location.state} {mission.trip.dropoff_location.zipcode}</p>
              </div>
              <div className="trip-comments">
                <p>{mission.trip.notes}</p>
              </div>
            </div>
            <div class="Trip-actions">
              <button>Cancel Trip</button>
            </div>
          </div>
          {/* View 1 END END */}

          <TripInformation type={'driver'} subtitleText='Your Driver' titleText={mission.driver.name} descriptionText={mission.driver.bio} buttonText='Contact Driver' />
          <TripInformation type={'vehicle'} subtitleText='Your Vehicle' titleText={mission.vehicle.license} descriptionText={mission.vehicle.make} buttonText='Identify Vehicle' />
          <TripInformation type={'trip'} subtitleText='Your Trip' titleText={mission.trip.estimated_arrival} descriptionText={mission.vibe.name} buttonText='Change Vehicle Vibe' />

          <footer className="App-footer">
            <div className="user-icon">Icon</div>
            <div className="trip-address">Trip Address</div>
            <div className="other-icon">Icon</div>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default App;
