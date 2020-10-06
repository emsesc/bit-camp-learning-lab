function loadFile(event){
    console.log("Got picture!");
    var image = document.getElementById("output");
    // Get image from output 
    image.src = URL.createObjectURL(event.target.files[0])
    // load inputted image into the image src and display
}

// main function for interacting with face api
async function handle(event) {
    console.log("Loading picture");
    document.getElementById("output").src = "img/loading.gif";
    //$ did not work?
    // target the output element ID and change content
    event.preventDefault();
    // stop the page from reloading

    var myform = document.getElementById("image-form");
        var payload = new FormData(myform);
        console.log(payload);
        console.log(myform);
        console.log("Posting data...");
        const resp = await fetch("https://spotifyfaceapp.azurewebsites.net/api/imageparser?code=HPEACydXT9FLjCQwejBqYYerVU5rJCjUayUz4i8tK6s9ahY55XnCKw==", {
            method: 'POST',
            body: payload
        });

        let data = await resp.json();
        var emotion = data.result[0].faceAttributes.emotion;
        //sets emotion to the first result of the request
        console.log(emotion);
        console.log(payload);
        var resultString = `
        <h3> Emotions in your image: </h3><br />
        <p> Anger: $(emotion.anger)</p>
        <p> Happiness: $(emotion.happiness)</p>
        <p> Surprise: $(emotion.surprise)</p>
        <p> Contempt: $(emotion.contempt)</p>
        <p> Disgust: $(emotion.disgust)</p>
        <p> Fear: $(emotion.fear)</p>
        <p> Sadness: $(emotion.sadness)</p>
        <p> Neutral: $(emotion.neutral)</p>
        `;

        var valence = emotion.happiness + emotion.surprise - emotion.anger - emotion.contempt - emotion.disgust - emotion.fear - emotion.sadness;

        if (valence < emotion.neutral) {
            valence = 0.5
        } else if (valence > 1) {
            valence = 1
        } else if (valence < 0) {
            valence = 0
        }
        console.log("Putting emotions in!");
        $('#emotion').html(resultString);
        $('#hidden-emotion').html(valence);
}