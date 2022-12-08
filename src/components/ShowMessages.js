import React from 'react';
import axios from 'axios';

const getMessagesUrl = "https://eh7peg4c0e.execute-api.eu-west-1.amazonaws.com/prod-shadow-api/messages";
export const token =  new URLSearchParams(window.location.hash).get('access_token');
console.log(token);

var messages = '';

const ShowMessages = () => {
    var result = '';
    const requestConfig = {
        headers: {
          Authorization : `Bearer ${token}`
        }          
    }  

    axios.get(getMessagesUrl, requestConfig).then(response => {
    
        messages = response.data.Messages;

        Object.values(messages).forEach(element => {
            result+='<p><span style="color: #02b829; font-size:14px;">' + element.username + ' : </span><span style="color: #c1c1c1;">' + element.message + '</span><span style="color: #c1c1c1; font-size:10px; margin-left: 3%;">' + element.timestamp_utc_iso8601 + '</span></p>';
        
        });
        var elemDiv = document.createElement('div');
        elemDiv.setAttribute("id","affichage");
        elemDiv.innerHTML = result;
        document.body.appendChild(elemDiv);

        
    }).catch(error => {
        console.log(error);
    });


}


export default ShowMessages;
