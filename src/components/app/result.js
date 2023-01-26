import React from 'react';
import clouds from '../../images/Clouds.png';
import clear from '../../images/clear.png';
import drizzle from '../../images/drizzle.png';
import rain from '../../images/drizzle.png';
import snow from '../../images/snow.png';
import Thunderstorm from '../../images/thunder.png'
import Fog from '../../images/fog.svg'
import Forecast from './forecast';
import '../../css/app.css'

const Result = ({ weather, loader }) => {
  const {
    city,
    country,
    date,
    description,
    main,
    temp,
    sunset,
    sunrise,
    humidity,
    wind,
    highestTemp,
    lowestTemp,
    forecast,
  } = weather;

  let weatherIcon = null;

  if (main === 'Thunderstorm') {
    weatherIcon = <img src={Thunderstorm} height='220px' width='220px'/> ;
  } else if (main === 'Drizzle') {
    weatherIcon = <img src={drizzle} height='220px' width='220px'/>;
  } else if (main === 'Rain') {
    weatherIcon = <img src={snow} height='220px' width='220px'/>;
  } else if (main === 'Snow') {
    weatherIcon = <img src={snow} height='220px' width='220px'/>;
  } else if (main === 'Clear') {
    weatherIcon = <img src={clear} height='220px' width='220px'/>;
  } else if (main === 'Clouds') {
    weatherIcon = <img src={clouds} height='220px' width='220px'/>;
  } else {
    weatherIcon = <img src={Fog} height='220px' width='220px'/>;
  }

  return (<>
    <div className='row'>
      <div className='col-md-6 col-sm-12'>
        <div className='col-md-12 col-sm-12 mt-4 ms-5'>
          <h2>{city},{country}</h2>
          <div>{date}</div>
        </div>
      </div>
    </div>
    <div className='row mx-5'>
      <div className='col-md-6 col-sm-12 pe-5 pb-5'>
        <div className='col-md-12 col-sm-12 d-flex justify-content-end'>
          <div className='d-flex '>
            {weatherIcon}
          </div>
          <div className='d-flex flex-column align-items-end mt-5'>
            <div className='CurrentCond'>{Math.floor(temp)}&#176;</div>
            <div className='weatherDiscription'>{description}</div>
          </div>
        </div>
      </div>
      <div className='MainWeatherPanel col-md-6 col-sm-12'>
        <div className='subWeatherPanel col-md-12 d-flex me-2 justify-content-center'>
          <div className='col-md-4 d-flex flex-column align-items-center justify-content-center'>
            <div className='me-2'>{Math.floor(highestTemp)}&#176;</div>
            <div>High</div>
          </div>
          <div className='col-md-4 d-flex flex-column align-items-center justify-content-center'>
          <div className='me-2'>{wind}mph</div>
            <div>Wind</div>
          </div>
          <div className='col-md-4 d-flex flex-column align-items-center justify-content-center'>
          <div className='me-2'>{sunrise}</div>
            <div>Sunrise</div>
          </div>
        </div>
        <div className='subWeatherPanel col-md-12 d-flex me-2 justify-content-center'>
          <div className='col-md-4 d-flex flex-column align-items-center justify-content-center'>
          <div className='me-2'>{Math.floor(lowestTemp)}&#176;</div>
            <div>Low</div>
          </div>
          <div className='col-md-4 d-flex flex-column align-items-center justify-content-center'>
          <div className='me-2'>{humidity}%</div>
            <div>Rain</div>
          </div>
          <div className='col-md-4 d-flex flex-column align-items-center justify-content-center'>
          <div className='me-2'> {sunset}</div>
            <div>Sunset</div>
          </div>
        </div>
      </div>
    </div>
    <Forecast forecast={forecast} />
  </>);
};

export default Result;