import { Link, useNavigate } from "react-router-dom";
import logo from './logo.png';
import React from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';

const Navbar = (props) => {
    const navigate = useNavigate();

    const [word_to_search, SetWordToSearchState] = useState('');

    async function handleImageChange(e){
        const file = e.target.files[0];

        props.updateScreenState()
    
        await imageSearch(file).catch(error =>{
            props.resetScreenState()
            alert("Please check internet connection")
        });
    }

    const API_HOST = 'http://127.0.0.1:8000';

    async function imageSearch(file){
        let fd = new FormData();
    
        fd.append('image', file);
    
        var response = await fetch(`${API_HOST}/search/`, 
        {
            headers: {
                'Accept': 'application/json',
            },
            method: 'POST',
            body:fd,
        });

        if(!response.ok){
            alert("Please check url")
        }else{
            var data = await response.json();

            props.updateScreenState();

            navigate(
                '/search',
                {state: {data: data}}
            );
        }
    }

    return ( 
        <nav>
            <Link to="/">
                <h3>PinClone</h3>
                <div className="logo_container">
                    <img src={logo} alt="" />
                </div>
            </Link>
            <form className="picture_search_form" method="GET" action={`http://localhost:3000/search/${word_to_search.replaceAll(' ', "-")}`}>
                <div id="search_box">
                    <input onChange={(e)=>{SetWordToSearchState(e.target.value)}} type="text" placeholder="Search for image" id="search"></input>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <input type="file" name="file" id="file" onChange={(e)=>{handleImageChange(e)}}/>

                        <label htmlFor="file">
                            <FontAwesomeIcon icon={faCamera} style={{padding: "5px"}}/>
                        </label>
                    </div>
                </div>
            </form>
            <div className="navigation_links">
                <Link to="/">Explore</Link>
                <Link to="/">License</Link>
                <Link to="/upload">Upload</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;