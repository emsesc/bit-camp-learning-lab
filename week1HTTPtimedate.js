module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    function printTime() {
        var currentTime = new Date();
        var dateandtime = (currentTime.getMonth()+1) + "/" 
        + currentTime.getDate() + "/" 
        + currentTime.getFullYear() + " @ " 
        + (currentTime.getHours()+20) + ":" 
        + currentTime.getMinutes() + ":"
        + currentTime.getSeconds();
        return dateandtime;
    }
 
    const name = (req.query.name || (req.body && req.body.name));
    const responseMessage = name
        ? "Hello, " + name + "! The current date is: " + printTime() + ". Your flag is: cUrl1ng_is_c00l"
        : "Hello! This is an HTTP Trigger Function. Please pass a name in the query string (?name=[your name]) or in the request body for a personalized response and the date and time!";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}

/*curl -X POST "https://cybercatamounts.azurewebsites.net/api/timedate" --data '{"name":"emily"}'-->*/