import { useState } from "react";
import React from 'react';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Upload = () => {
    const API_HOST = 'http://127.0.0.1:8000';

    const [title, setTitle] = useState('');

    const [imageChanged, setimageChanged] = useState(false);

    const [uploaded, setUploadedState] = useState(false);

    const [uploadingStatus, setUploadingStatus] = useState(false);

    const [imageSrc, setImageSrc] = useState('');

    const [file, setFile] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    async function checkUploadImage(e){
        const file = e.target.files[0]

        setFile(file)

        if(file){
            var file_chosen = file['type'].split('/')[0]
    
            if(file_chosen !== 'image'){
                alert('Please upload an image')

                setimageChanged(false);

                setImageSrc("");
            }else{
                if(file){
                    const reader = new FileReader();
    
                    reader.addEventListener("load", async function(){
                        setImageSrc(this.result);
                        setimageChanged(true);
                    })
            
                    reader.readAsDataURL(file);
    
                }else{
                    setimageChanged(false);
                    setImageSrc("");
                }
            }
    
        }else{
            setimageChanged(false);
            setImageSrc("");
        }
    }

    async function translateSentence(){
        setUploadingStatus(true)

        setUploadedState(false)

        setErrorMessage('')

        let h = new Headers();

        h.append('Accept', 'application/json');

        let fd = new FormData();

        fd.append("sentence", title)

        var response = await fetch(`${API_HOST}/search/translateSentence`, 
        {
            headers: h,
            method: 'POST',
            body:fd
        });

        var data = await response.json();

        return data["sentence"]
    }

    async function uploadPin(file){
        var newSentence = await translateSentence().catch(error=>{
            setErrorMessage("Failed, please check your internet connection and retry")
        })

        let h = new Headers();

        h.append('Accept', 'application/json');

        let fd = new FormData();

        fd.append('image', file);

        fd.append("name", newSentence)

        var response = await fetch(`${API_HOST}/pins/`, 
        {
            headers: h,
            method: 'POST',
            body:fd
        });

        var data = await response.json();

        if(data["status"] === "saved"){
            setUploadingStatus(false)
            setUploadedState(true)
        }
    }

    return ( 
        <div className="formContainer">
            <h1>Please upload your image</h1>
            <form action={`${API_HOST}/pins`} method="post" encType="multipart/form-data">
                <p>Name</p>
                <input placeholder="Title" type="text" name="name" required value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                <input type="file" name="image" id="uploadFile" required onChange={(e)=>{checkUploadImage(e)}}/>
                <p>Image</p>
                <label htmlFor="uploadFile">
                    {
                        imageChanged === false ?
                        <FontAwesomeIcon icon={faImage} style={{padding: "5px", color: "#009579", height: "150px", width: "150px"}}/>
                        :
                        <img style={{padding: "5px", color: "#009579", height: "150px", width: "150px", borderRadius: "20px", objectFit: "cover"}} src={imageSrc} alt="ALternative"/>
                    }
                </label>
                {
                    uploadingStatus === false ?
                    <button type="submit" onClick={(e)=>{e.preventDefault(); uploadPin(file)}}>Upload</button>
                    :
                    <div className="loading"></div>
                }
                {
                    uploaded === false ?
                    <p></p>
                    :
                    <p>Pin has successfully been uploaded</p>
                }
                {
                    errorMessage === "" ?
                    <p></p>
                    :
                    <p>{errorMessage}</p>
                }
            </form>
        </div>
    );
}
 
export default Upload;