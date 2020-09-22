module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    function printTime() {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        hour = updateTime(hour);
        min = updateTime(min);
        sec = updateTime(sec);
        if (hour < 12) {
            tday = "AM";
        }
        else {
            tday = "PM"
            if (hour != 12) {
            hour -= 12
            }
        }

        var clock = hour + " : " + min + " : " + sec + " " + tday

        function updateTime(time) {
        if (time < 10) {
            return "0" + time;
        }
        else {
            return time;
        }
        }
        return clock;
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