import React from 'react'
import { originalFlights } from '../Home/Home';

let searchParam = "flightNumber";
function Search({setFlights,allFlights}) {

    function changeSearchParam(param){
        searchParam = param.target.value;
        document.getElementById("searchInput").value = "";
    }

    const searchFunc = (searchVal)=>{
        let searchResult;

        if(searchVal.target.value == '')
        searchResult = originalFlights;

        else if(searchParam == "flightNumber" || searchParam == "airport")
        searchResult = originalFlights.filter(flight => JSON.stringify(flight[searchParam]).toLowerCase().includes(searchVal.target.value.toLowerCase()));

        

        setFlights(searchResult);
    };

    return (
        <div>
            <select name="searchOption" id="searchDropMenu" onChange ={changeSearchParam}>
                <option value="flightNumber">Flight Number</option>
                <option value="airport">Airport</option>
                <option value="economySeats">Economoy Seats</option>
                <option value="businessSeats">Business Seats</option>
            </select>

            <input type="text" id="searchInput" onChange = {searchFunc} />
        </div>
    )
}

export default Search
