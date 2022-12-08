import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const postUrl = "https://eh7peg4c0e.execute-api.eu-west-1.amazonaws.com/prod-shadow-api/message";
const token = new URLSearchParams(window.location.hash).get('access_token');
if (token !== null){
    var decoded = jwt_decode(token);
}

else {
    window.location.replace("https://appshadow.auth.eu-west-1.amazoncognito.com/login?client_id=7mgnr5k2v06cktu5ssl5ltu5b9&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://s3-shadow-messagerie.s3.eu-west-1.amazonaws.com/index.html");
}
export const username = decoded.username;

const PublishMessage = () => {
    const [message, setMessage] = useState("");
    const [info, setInfo] = useState(null);

    const submitHandler = (event) => {
        event.preventDefault();
        if (message.trim() === '' ) {
            setInfo('[ERROR] Impossible de publier un message vide !');
            return;
          }
        setMessage(null);
        const requestConfig = {
        headers: {
          Authorization : `Bearer ${token}`
        }
            
        }  
        const requestBody = {
        message: message,
        username: username,
        timestamp_utc_iso8601: new Date().toISOString(),
        likes: 0,
        channel_id: "shadow"
    }

        axios.post(postUrl, JSON.stringify(requestBody), requestConfig).then(response => {
            setMessage('');
            const result='<p><span style="color: #02b829; font-size:14px;">' + username + ' : </span><span style="color: #c1c1c1;">' + message + '</span><span style="color: #c1c1c1; font-size:10px; margin-left: 3%;">' + requestBody.timestamp_utc_iso8601 + '</span></p>';
            document.getElementById('affichage').innerHTML = result + document.getElementById('affichage').innerHTML;
            
        }).catch(error => {
        if (error.response.status === 401) {
            window.location.replace("https://appshadow.auth.eu-west-1.amazoncognito.com/login?client_id=7mgnr5k2v06cktu5ssl5ltu5b9&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://s3-shadow-messagerie.s3.eu-west-1.amazonaws.com/index.html");
        } else {
            setInfo('[ERROR] Désolé ! Le serveur est DOWN !');
        }
 
        })
    };

    if (info !=="Message ajouté !"){
        var color = "#4CAF50";
    }


    return (
        <div id="#saisie">
            <form onSubmit={submitHandler}>

            {info && <p className="info" style ={{fontSize: "14px", color:color, marginLeft: "50px"}}>{info}</p>}
            <h5 style={{padding:"12px", marginLeft:"70px", color: "#33C4FF"}}>Message :</h5>
						<div style={{marginLeft:"70px"}}><input type="text" id="publie" style={{color: "#ffffff"}} value={message} onChange={event => setMessage(event.target.value)} /> <br/>
						<input className="button" type="submit" value="Publish"/>
                        </div>
            </form>
        </div>
    )
}

export default PublishMessage;