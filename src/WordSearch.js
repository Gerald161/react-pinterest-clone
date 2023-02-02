import { useParams } from "react-router";
import React from 'react';
import { useEffect, useState } from 'react';

const WordSearch = (props) => {
    const [image_urls, setImageUrls] = useState([]);

    const {word} = useParams();

    useEffect(()=>{
        getRelevantQueries()
    }, [])

    async function getRelevantQueries(){
        props.updateScreenState()

        const API_HOST = 'http://127.0.0.1:8000';

        let fd = new FormData();

        fd.append("word", word)

        var response = await fetch(
            `${API_HOST}/search/wordSearch`,
            {
                headers: {
                    'Accept': 'application/json',
                },
                body:fd,
                method: 'POST',
            }
        ) 

        var data = await response.json();

        setImageUrls(data)

        props.resetScreenState()
    }

    return ( 
        <div className="search_page_queries">
            {
                props.changeScreen === false?
                <h2 style={{textAlign: 'center', margin: '20px'}}>Top images similar to {word.replaceAll('-', " ")}</h2>
                :
                <p></p>
            }
            <div className="grid_images">
            {
                props.changeScreen === false?
                image_urls.map((image, index)=>
                    <div key={image["image"]} className={
                        index+1 === 2 ? "image_container featured_horizontal": 
                        index+1 === 3 ? "image_container featured_vertical":
                        index+1 === 4 ? "image_container featured_big":
                        index+1 === 5 ? "image_container featured_small":
                        "image_container"
                    }>
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
 
export default WordSearch;