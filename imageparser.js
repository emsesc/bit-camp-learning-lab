var multipart = require("parse-multipart");
var fetch = require("node-fetch");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var boundary = multipart.getBoundary(req.headers['content-type']);
    // get boundary for multipart data 
    var body = req.body;
    // get raw body
    var parts = multipart.Parse(body, boundary);
    // parse body

    var result = await analyzeImage(parts[0].data);
    // call image function to analyze image

    context.res = {
            body: {
                    result
            }
    };

    console.log(result)
    context.done();
}

async function analyzeImage(img){
    const subscriptionKey = process.env['subscriptionkey'];
    const uriBase = process.env['endpoint'] + '/face/v1.0/detect';
	// env variables (similar to .gitignore/.env file) to not expose personal info

    let params = new URLSearchParams({
	'returnFaceId': 'true',
	'returnFaceAttributes': 'emotion'
    })

    // making the post request
    let resp = await fetch(uriBase + '?' + params.toString(),{
        /*The await expression causes async function execution to pause until a Promise is settled 
        (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. 
        When resumed, the value of the await expression is that of the fulfilled Promise*/
        method: 'POST',
        body: img,
        // we want to send the image
        headers: {
            'Content-Type' : 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : process.env['subscriptionkey']
        }
    })

    // receive the response
    let data = await resp.json();

    return data;
}

