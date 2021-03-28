import React, {useState} from 'react'
import MicrosoftLogin from "react-microsoft-login";
import axios from 'axios'
import {TextField} from '@material-ui/core'

export default function Outlook() {
    const [token, setToken] = useState("")
    const [content, setContent] = useState("")
    const [receiver, setReceiver] = useState("")
    const authHandlerOfficeAction = (err, data) => {
        setToken(data.accessToken)       
        console.log(data.account.userName)
    };

    const sendmsg = () => 
    {
        axios({
            method: 'POST',
            url: 'https://graph.microsoft.com/v1.0/me/sendMail',
            headers: {
            Authorization: "Bearer " + token,
            contentType: 'application/json',
         
            },
            data:{
                message: {
                    subject: "Dashboard",
                    body: {
                        contentType: "Text",
                        content: content
                    },
                    toRecipients: [
                        {
                            emailAddress: {
                            address: receiver
                        }
                    }
                ]
            }          
          }
      }).then(Response => {
        console.log("ok")
        })
    }

  return (
    <section className="outlook">
    
    {token === "" ?
            <MicrosoftLogin clientId="99073891-463a-48a9-b809-d72fb01dbb9a" authCallback={authHandlerOfficeAction} graphScopes={["Mail.ReadWrite Mail.Send Notes.ReadWrite.All"]}/>
            :
            <></>
            
            }
       
        <div>
        <TextField placeholder="Receiver" onChange={(e) => {
              const selectedOption = e.target.value;
              setReceiver(selectedOption)
            }}></TextField>
            <br/>
            <TextField placeholder="content" onChange={(e) => {
              const selectedOption = e.target.value;
              setContent(selectedOption)
            }}></TextField>

            {token === "" ?
            <></>:
            
            <button onClick={sendmsg}>SEND</button>
            }

        </div>
    </section>
  );
}