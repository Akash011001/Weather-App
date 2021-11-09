import React,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
import './card.css';
import {drizzle, cloud, clear, mist, rain, snow, storm} from './Source.js'

const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function getIcon(code){
    if(code>=200 && code<300){
        return storm
    }else if(code>=300 && code<400){
        return drizzle;
    }else if(code>=500 && code<600){
        return rain
    }else if(code>=600 && code<700){
        return snow
    }else if(code>700 && code<800){
        return mist
    }else if(code === 800){
        return clear
    }else if(code>800){
        return cloud
    }
}

function Card(props){
    const input = useRef()
    const [weather, setWeather] = useState({loc:'City, Country',icon:cloud, temp:32 , weather:'cloud' });

    useEffect(()=>{
        getData('Ayodhya')
    },[])

    const d = new Date();
    

    const getData = function(city){
        
        axios.get(`api`).then((res)=>{
            let tem = (res.data.main.temp-273.15+"").split('.')
            setWeather({loc:res.data.name+', '+res.data.sys.country, icon: getIcon(res.data.weather[0].id), temp: tem[0], weather:res.data.weather[0].main});
        }).catch((err)=>{
            console.log('not found')
        })
        
    }
   return (
       <div   className="card">
           <input className="input" onChange={()=>{getData(input.current.value)}} ref={input}/>
           <h1><i  class="fas fa-map-marker-alt"></i>{weather.loc}</h1>
           <img  className="icons" alt="icon" src={weather.icon}/>
           <h1><i class="fas fa-temperature-low"></i> {weather.temp}&#xb0; C <br/> {weather.weather}</h1>
           <br/>
           <h1>{d.getDate()+' '+month[d.getMonth()] }<br/>{week[d.getDay()]}</h1>
           
       </div>
   )
}

export default Card;

 
