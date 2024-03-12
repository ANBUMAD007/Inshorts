import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState();
  const [singlecountry, setSinglecountry] = useState();
  const [cities,setCities] = useState(null);
  const [singlecity,setSinglecity] = useState();
  const [submit,setSubmit] = useState();

const submithandler=()=>{
      console.log("submit",singlecity,singlecountry)

  if(singlecountry && singlecity){
    console.log("submit",singlecity,singlecountry)
    setSubmit(true)
  }
}
  const fetchCountries = async () => {
    try {
      const country = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      console.log("contries", country.data.data);
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchCountries();
  }, []);


  const  fetchCities=(country)=>{
    setSubmit(false)
    setSinglecity(null)
  setSinglecountry(country)
  const findCities = countries.find((c)=>c.country=== country);
  console.log(findCities);
  setCities(findCities.cities)
  }
  return (
    <div className="App">
      <div className="App-header">
        <h1>select yout hometown</h1>
        <div>
         {countries && <select onChange={(e)=>fetchCities(e.target.value)} value={singlecountry}>
            <option disabled selected hidden>
              select country
            </option>
                      {countries.map((country)=>(
              <option key={`${country.country} - ${Date.now()}`} value={country.country}>{country.country}</option>

            ))}
          </select>}
          {cities && <select onChange={(e)=>setSinglecity(e.target.value)} value={singlecity}> 
            <option disabled selected hidden>
              select city
            </option>
            {cities.map((city)=>(<option key={`${city} - ${Date.now()}`} value={city}>{city}</option>)) }
          </select> }
          
          <button onClick={submithandler}>Go</button>
        </div>
        {submit &&( <h3>Your country is {singlecountry} and your city is {singlecity}</h3>)}
       
      </div>
    </div>
  );
}

export default App;
