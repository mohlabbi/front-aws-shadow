import React, { Components } from 'react';
import './App.css';
import PublishMessage,  {username} from './components/PublishMessage';
import ShowMessages, {token} from './components/ShowMessages';


const App = () => {
  if (token === null){
    window.location.replace("https://appshadow.auth.eu-west-1.amazoncognito.com/");
  }
  return (
    <div id="entete">
      <p>#Messagerie Shadow <span></span><span style={{color: "#02b829", fontSize:"12px", display: "block", textAlign: "right"}}>Vous êtes connecté en tant que {username}</span><span><a style={{color: "#D90906", fontSize:"12px", display: "block", textAlign: "right"}} href="https://appshadow.auth.eu-west-1.amazoncognito.com/logout?client_id=7mgnr5k2v06cktu5ssl5ltu5b9&logout_uri=https://s3-shadow-messagerie.s3.eu-west-1.amazonaws.com/deconnexion.html">Se déconnecter</a></span></p>
        <PublishMessage></PublishMessage>
        <ShowMessages></ShowMessages>

    </div>

    
  );

} ;
export default App;