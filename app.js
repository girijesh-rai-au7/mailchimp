//create 3 html files failures.html,success.html,signup.html
//create app.js file and install express,request and body-parse module
//use bootstrap examples to get signup page


const express = require("express");
const app= express();
const https = require('https')
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended:true}));

const request = require("request");
app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})
app.post("/",(req,res)=>{
    const firstName = req.body.fName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    


    
    const data = {
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                
            }
        }
        ]
    }
                

    const jsonData = JSON.stringify(data);
    const url =   "https://us20.api.mailchimp.com/3.0/lists/806ff034c2"
    const options = {
        method:"POST",
        auth:"Pintu:df9df570cdaf50dd486f3092ec1d4418-us20"
        //in auth,use "any user name:password, api key is passwprd"
    }

    const request = https.request(url,options,(response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")

        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
        
        response.on("data",(data)=>{
            console.log(JSON.parse(data))
        })

    })
request.write(jsonData);
request.end();


});
app.post('/failure',(req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})



app.listen(process.env.PORT || 3000,()=>{
    console.log("server is running on port 3000");
})


//df9df570cdaf50dd486f3092ec1d4418-us20 api key of mailchimp 

//audience id: 806ff034c2
