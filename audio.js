document.querySelector("body").addEventListener("click", function() {
    const audio = document.getElementById("song");

    audio.play().then(() => {
      console.log("Audio is playing.");
    }).catch(error => {
      console.log("Autoplay failed: ", error);
    });
  });