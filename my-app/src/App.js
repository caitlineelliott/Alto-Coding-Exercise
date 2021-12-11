import './App.css';
import mission from '../src/assets/data/mission.json'
import React from 'react';

// states: summary, driver, vehicle, trip

function HeaderImg(props) {
  return (
    <img src='my-app/src/assets/images/Driver_photo.png' alt="driver"></img>
  )
}

function Subtitle(props) {
  return (
    <h1>
      hi
    </h1>
  )
}

function Title(props) {
  return (
    <h1>test</h1>
  )
}

function Description(props) {
  return (
    <p>test</p>
  )
}

function Button(props) {
  return (
    <button>test</button>
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
            <div class="Trip-information">
              <h2>Your Trip</h2>
              <p>5:39PM</p>
              <p>Estimated Arrival at DFW...</p>
              <div class="Trip-details-container">
                <div class="Trip-details" id="trip-fare">
                  <p id="fare-label">Fare</p>
                  <p id="fare-amount">Dollars</p>
                </div>
                <div class="Trip-details" id="trip-passengers">
                  <p id="passenger-label">Passengers</p>
                  <p id="passenger-amount">Count</p>
                </div>
                <div class="Trip-details" id="trip-payment">
                  <p id="payment-label">Payment</p>
                  <p id="payment-type">Type</p>
                </div>
              </div>
            </div>
          </div>
          <div className="Container-Row2">
            <div class="Trip-info">
              <div className="trip-start">
                <p>Address</p>
                <p>Address</p>
              </div>
              <div className="trip-end">
                <p>Address</p>
                <p>Address</p>
              </div>
              <div className="trip-comments">
                <p>Here is some special info about my trip pls</p>
              </div>
            </div>
            <div class="Trip-actions">
              <button>Cancel Trip</button>
            </div>
          </div>
          {/* View 1 END END */}

          {/* View 2-4 */}
          <div className="Container-Row1">
            <HeaderImg src={'/Users/ceelliott/Documents/GitHub/Alto-Coding-Exercise/my-app/src/assets/images/Driver_photo.png'} />
          </div>
          <div className="Container-Row2">
            <Subtitle />
            <Title title={'Sarah'} />
            <Description description={'hello'} />
            <Button />
          </div>

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
