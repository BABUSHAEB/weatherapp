import axios from 'axios';
import React, { useState } from 'react'
import styled from 'styled-components'
const HomeContainer = styled.div`
width:100%;
min-height:99vh;
// background: #eaf3ff4a;
text-align: center;


body{
    margin:0;
    padding:0;
}

.Container{
    display:grid;
    grid-template-columns:auto;
    justify-content: center;
}
.containe-box{
    width:fit-content;
    padding:0.5rem 5rem;
    border-radius:2rem;
    box-shadow: 3px 3px 1rem #f9c09b;
    margin-left:auto;
    margin-right:auto;
    margin-top:2rem;
    margin-bottom:2rem;

}


.search-input {
    margin:1rem;
    width:20rem;
    font-size:1rem;
    padding: 0.8rem 2rem;
    font-weight:500;
    // background-color: #fff;
    background-color: #eddedc9c;
    // opacity: 0.5;
    outline:none;
    border:none;
    border-radius: 1.5rem;
    box-shadow: 3px 3px 0.6rem #f9c09b,3px 3px 0.6rem blue;
}
.Container-bar {
    // background-color:#d3a78ba1;
    // background-color:#f9c09b;
    width:fit-content;
    border-radius:8px;
    padding:1rem 2rem;
    text-align:center;
    font-size:1.2rem;
    font-weight:600;
    margin-left:auto;
    margin-right:auto;
    color: white;
    // opacity:1;
    box-shadow: 3px 3px 1rem #f9c09b;
}
.Container-bar span{
    text-shadow: 3px 3px 1rem blue;
    margin: 0 1.5rem ;
    
}
.search-btn{
    outline:none;
    border:none;
    border-radius: 1.2rem;
    margin:1rem 0.3rem;
    font-size:1rem;
    padding: 0.8rem 1.5rem;
    font-weight:600;
    background-color:#db6112;
    color:white;
    cursor: pointer;
    box-shadow: 3px 3px 0.6rem #f9c09b ,3px 3px 0.6rem blue;
}
.heading{
    color:white;
    text-shadow: 3px 3px 0.8rem #db6112;
}


.nodataFound-container{
    box-shadow: 3px 3px 0.6rem black ,3px 3px 0.6rem blue;
    width:fit-content;
    padding:2rem 4rem;
    border-radius:5px;
    margin-top:2rem;
    margin-left: auto;
    margin-right:auto;
}
@media (min-width: 0px) and (max-width:680px){

    .search-input {
        margin:1rem;
        width:14rem;
    }

    .Container-bar {
        padding:0.6rem 0.8rem;
        font-size:1.1rem;
    }
    .Container-bar span{
        margin:0 0.8rem ;
        
    }
}


`;


const APIKey = "3d6d9c5a1f16f515fe163ef905714a70";
const Url = "https://api.openweathermap.org/data/2.5/weather";

export default function Home() {
    const [Weather, setWeather] = useState({});
    const [Timedata, setTimedata] = useState({});
    const [City, setCity] = useState('');

    const handleChange = (event)=> {
        const InputText = event.target.value;
        setCity(InputText);
      }

    const GetWeather = () => {
        axios({
            method: 'get',
            url: `${Url}?q=${City}&APPID=${APIKey}`,
            responseType: 'stream'
        })
            .then(function (response) {
                //   response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
                console.log(response);
                setWeather(response.data);
                console.log(response.data.main);

                // console.log(response.sys);
                // GetDateTime(weatherdata.data)

                let SR = new Date(response.data.sys.sunrise * 1000);
                const sunrise = SR.toTimeString().split(" ")[0];
        
                let SS = new Date(response.data.sys.sunset * 1000);
                const sunset = SS.toTimeString().split(" ")[0];
        
                const name = response.data.name;
                const country = response.data.sys.country;
                const CurrentDate = new Date(response.data.dt * 1000).toDateString();
        
        
             return   setTimedata({
                    Sunrise: { sunrise },
                    Sunset: { sunset },
                    City: { name },
                    Country: { country },
                    Current: { CurrentDate }
        
                });
            });
    }
    // const GetDateTime = (e) => {

      
    // }
    return (
        <>
            <div className="Container-bg">
                <HomeContainer>
                    <div className="Searchbox-field">
                        <input type="text" onChange={handleChange} value={City} placeholder='Search...' className='search-input' />
                        <button onClick={GetWeather} className='search-btn'>Search</button>
                    </div>
                    {(typeof Weather.main !== "undefined") ? (
                        <div>


                            <div>

                                <h2 className='heading'> {Weather.name} ,  {Weather.sys.country}</h2>
                                <h3 className='heading'> {Timedata.Current.CurrentDate}</h3>
                            </div>
                            <div className="Container">
                                <div className='Container-bar'>
                                   <span>Sunrise : {Timedata.Sunrise.sunrise}</span>
                                   <span>Sunset : {Timedata.Sunset.sunset}</span>
                                </div>
                                <div className='containe-box'>
                                    <h1 className='heading'> {Weather.weather[0].main}</h1>
                                    <h2 className='heading'> {Math.round((Weather.main.temp)-273.15)} <sup>0</sup> C</h2>
                                </div>
                            </div>
                            <div className='Container-bar'>
                                <span>Min: {Math.round((Weather.main.temp_min)-273.15)}<sup>o</sup>C</span>
                                <span>Max: {Math.round((Weather.main.temp_max)-273.15)}<sup>o</sup>C</span>
                                <span> Feel like: {Math.round((Weather.main.feels_like)-273.15)}<sup>o</sup>C</span>
                            </div>
                        </div>
                    ) : (
                        <div  className='nodataFound-container'>

                            <h2 className='heading'><i> Enter a City...</i> </h2>
                        </div>
                    )}
                </HomeContainer>
            </div>
        </>
    )
}
