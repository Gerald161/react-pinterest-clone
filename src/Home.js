import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';


const Home = (props) => {
    var all_popular_searches = [
        "Anime", "Nature", "Fashion", "Wallpapers", "Bags", "Gifts", "Shoes", "watches",
        "Aesthetic", "Houses", "Furniture"
    ]

    const [allHomeImages, setAllHomeImages] = useState([]);

    const [isRefreshing, setIsRefreshing] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(()=>{
        getHomeImages().catch(error=>{
            setErrorMessage("Failed to retrieve information, please check your internet connection")
            setAllHomeImages([])
        })
    }, [])

    const API_HOST = 'http://127.0.0.1:8000';

    async function getHomeImages(){
        var response = await fetch(
            `${API_HOST}/pins/`,
            {
                headers: {
                    'Accept': 'application/json',
                },
            }
        );

        if(!response.ok){
            setErrorMessage("Error occurred at url, please check url connection")
            
            setAllHomeImages([])
        }else{
            var data = await response.json();

            setAllHomeImages(data)

            setIsRefreshing(false)

            props.resetScreenState()
        }
    }

    function reloadPage(){
        setErrorMessage("")

        setIsRefreshing(true)

        getHomeImages().catch(error=>{
            setErrorMessage("Failed to retrieve information, please check your internet connection")
            setAllHomeImages([])
            setIsRefreshing(false)
        })
    }

    return ( 
        <div>
            {props.changeScreen === false ? <div className="popular_searches">
                <h3>Popular Searches</h3>
                <div className="popular_links">
                    {all_popular_searches.map((search, index)=>
                        <Link to="#" key={index}>{search}</Link>
                    )}
                </div>
            </div> : <div></div>}

            {props.changeScreen === false ? <div className="landing_screen">
                <div className="dark_cover">
                    <h1>Welcome to Pinterest Clone, browse, upload and share pictures</h1>
                </div>
            </div> : <div></div>}
            
            {props.changeScreen === false ? <div className="home_tabs">
                <Link to="/" className="selected">Home</Link>
                <Link to="/">Popular</Link>
                <Link to="/">Discover</Link>
                <Link to="/">Videos</Link>
                <Link to="/">Leaderboard</Link>
            </div> : <div></div>}

            {
                errorMessage === '' ? props.changeScreen === false ? <div className="grid_images">
                    {
                        allHomeImages.length !== 0 ?
                        allHomeImages.map((image, index)=>
                            <div key={image["image"]} className={
                                index+1 === 2 ? "image_container featured_horizontal": 
                                index+1 === 3 ? "image_container featured_vertical":
                                index+1 === 4 ? "image_container featured_big":
                                index+1 === 5 ? "image_container featured_small":
                                "image_container"
                            }>
                                <a href={`http://127.0.0.1:8000/media/${image["image"]}`} rel="noopener noreferrer" target="_blank"><img src={`http://127.0.0.1:8000/media/${image["image"]}`} alt="" /></a>
                                <div className="download_options_container"></div>
                            </div>
                        )
                        : <div style={{position: "relative", marginTop: "70px"}} className="loading"></div>
                    }
                </div> : <div></div>
                : 
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "20px 0"}}>
                    <h3>{props.changeScreen === false ? errorMessage : errorMessage}</h3>
                </div>
            }
            {props.changeScreen === false ? <div></div> : <div className="loading"></div> }

            <div className="reloadImages" onClick={()=>{ reloadPage() }}>
                <div>
                    { isRefreshing === false ? <FontAwesomeIcon 
                        icon={faRefresh} 
                        style={{padding: "5px", color: "white", height: "30px", width: "30px"}}
                        // onClick={(e)=>{
                        //     reloadPage(e) 
                        // }}
                        />
                        :
                        <div className="loading"></div>
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Home;