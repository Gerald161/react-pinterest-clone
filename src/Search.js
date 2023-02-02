import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import {useLocation} from 'react-router-dom';

const Search = (props) => {
    const [images, setAllImages] = useState([]);

    const location = useLocation();

    useEffect(()=>{
        setAllImages(location.state.data)
    }, [])

    return ( 
        <div className="search_page_queries">
            <h2 style={{textAlign: 'center', margin: '20px'}}>Top images similar to query</h2>
            <div className="grid_images">
            {
                props.changeScreen === false ? 
                    images.map((image, index)=>
                        <div key={index} 
                            className={
                                index+1 === 2 ? "image_container featured_horizontal": 
                                index+1 === 3 ? "image_container featured_vertical":
                                index+1 === 4 ? "image_container featured_big":
                                index+1 === 5 ? "image_container featured_small":
                                "image_container"
                            }
                        >
                            <a href={`http://127.0.0.1:8000/media/${image["image"]}`} rel="noopener noreferrer" target="_blank">
                                <img src={`http://127.0.0.1:8000/media/${image["image"]}`} alt="" />
                            </a>
                            <div className="download_options_container"></div>
                        </div>
                    )
                : <div className="loading"></div>
            }
            </div> 
        </div>
    );
}
 
export default Search;