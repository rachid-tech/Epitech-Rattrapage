import React, {useState} from 'react'
import MicrosoftLogin from "react-microsoft-login";
import axios from 'axios'


export default function Outlook() {
    const [lastMail, setLastMail] = useState("")
    const authHandlerOfficeAction = (err, data) => {
        axios({
            method: 'GET',
            url: 'https://graph.microsoft.com/v1.0/me/messages',
            headers: {
              Authorization: "Bearer " + data.accessToken
            }
          }).then(Response => {
    var rep = Response.data.value[0].bodyPreview
            setLastMail(rep)            
            //   console.log(lastMail)

        })
    };

  return (
    <section className="outlook">
    
        <MicrosoftLogin clientId="99073891-463a-48a9-b809-d72fb01dbb9a" authCallback={authHandlerOfficeAction} graphScopes={["Mail.ReadWrite Mail.Send Notes.ReadWrite.All"]}/>
        <div>

                      <h3 style={{color: 'red'}}>Dernier mail reçu: {lastMail}</h3>
                  </div>
    </section>
  );
}