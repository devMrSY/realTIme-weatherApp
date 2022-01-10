import { useEffect, useState } from 'react';
import searchIcon from '../../images/searchIcon.png';
import '../../css/app.css';
import NotFound from './notFound';
import Result from './result';

function App() {

  const [value, setValue] = useState('Russia');
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false)
  
  useEffect(() => {
    handleSearchCity();
  }, []);

  const handleInputChange = e => {
    setValue(e.target.value);
  };
  
  const handleSearchCity = () => {
    const APIkey = '8616d21efde309796b1bfc4e9fbc9743';
    const weatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=${APIkey}&units=metric`;
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=${APIkey}&units=metric`;
    setLoader(true)
    Promise.all([fetch(weatherApi), fetch(forecastApi)])
      .then(([res1, res2]) => {
        if (res1.ok && res2.ok) {
          return Promise.all([res1.json(), res2.json()]);
        }
        throw Error(res1.statusText, res2.statusText);
      })
      .then(([data1, data2]) => {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'Nocvember',
          'December',
        ];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const currentDate = new Date();
        const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
          months[currentDate.getMonth()]
        }`;
        const sunset = new Date(data1.sys.sunset * 1000).toLocaleTimeString().slice(0, 5);
        const sunrise = new Date(data1.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5);
  
        const weatherInfo = {
          city: data1.name,
          country: data1.sys.country,
          date,
          description: data1.weather[0].description,
          main: data1.weather[0].main,
          temp: data1.main.temp,
          highestTemp: data1.main.temp_max,
          lowestTemp: data1.main.temp_min,
          sunrise,
          sunset,
          clouds: data1.clouds.all,
          humidity: data1.main.humidity,
          wind: data1.wind.speed,
          forecast: data2.list,
        };
  
        setWeatherInfo(weatherInfo)
        setError(false)
        setLoader(false)
      })
      .catch(error => {
        console.log(error);
  
        setError(true)
        setValue('')
        setLoader(false)
        setWeatherInfo(null)
      });
  };
    return (
      <div className="Container">
        <div className={`opacity-${loader ? '50' : '100'}`}>
          <h5 class="heading position-absolute">Weather Forecasting App</h5>
          <div className='row d-flex justify-content-center mt-5'>
            <div class="col-md-5 col-sm-6 position-relative">
              <input type="text" class="searchInput" placeholder="Enter City Name" onChange={handleInputChange} value={value}/>
              <img class="searchImg cursor-pointer" src={searchIcon} onClick={handleSearchCity}/>
            </div>
          </div>
          {weatherInfo && <Result weather={weatherInfo} loader={loader} />}
          {error && <NotFound error={error} />}
        </div>
        {/* {!loader && 
          <div className='position-absolute'>
            <div className="spinner-border" role="status">
              <span class="sr-only"></span>
            </div>
          </div>
        } */}
      </div>
    );
  }
  
  export default App;