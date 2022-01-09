import '../../css/app.css';
import night from '../../images/night.png';
import morning from '../../images/morning.png';
import evening from '../../images/sunset.svg';

function Forecast({forecast}) {
    return(<>
        <h2 className='mx-5 mt-4'>Forecast</h2>
        <div className='mx-5 hourlyMainPanel d-flex'>
           {forecast.map(item => (
               <div className="hourlySubPanel">
                    <div>
                        <span>{item.dt_txt.slice(5, 7)}</span>.
                        <span>{item.dt_txt.slice(8, 10)}</span>
                    </div>
                    <div>{item.dt_txt.slice(11, 13) * 1}:00</div>
                    <div>{item.dt_txt.slice(11, 13) * 1 <= '6' ? <img src={night} height='19px' width='21px'/> : ''}</div>
                    <div>{item.dt_txt.slice(11, 13) * 1 <= '15' && item.dt_txt.slice(11, 13) * 1 > '6' ? <img src={morning} height='19px' width='21px'/> : ''}</div>
                    <div>{item.dt_txt.slice(11, 13) * 1 <= '22' && item.dt_txt.slice(11, 13) * 1 > '15' ? <img src={evening} height='23px' width='25px'/> : ''}</div>
                    <div>{Math.floor(item.main.temp * 1) / 1}&#176;</div>
               </div>
            ))}
        </div>
    </>)
}

export default Forecast;