const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req , res){
    
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
            }
        }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url =" https://us12.api.mailchimp.com/3.0/lists/e59740fd8e";

    const options = {
        method: "POST",
        auth: "swatanta:8be413ab8816cbf2aee9dd910daa4b89-us12",
    };

    const request = https.request(url, options, function(response){
       if( response.statusCode ===200){
        res.sendFile(__dirname + "/success.html");
       }
       else{
        res.sendFile(__dirname + "/failure.html");
       }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    
    request.write(jsonData);
    request.end();
   
});

app.post("/failure", function(req, res){
    res.redirect("/");
})


















app.listen(process.env.PORT || "3000", function(){
    console.log("Server started on 3000")
})


// 8be413ab8816cbf2aee9dd910daa4b89-us12
// e59740fd8e