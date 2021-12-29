const button = document.getElementById("btn");
const audio = document.getElementById("audio");

const toggoleBtn = () => {
  button.disabled = !button.disabled;
};

const tellMeJoke = (joke) => {
  VoiceRSS.speech({
    key: "fb3595e6038240ffacc724bb5ce3adaa",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
};

const getJokes = () => {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.setup) {
        joke = `${data.setup} ... ${data.delivery}`;
      } else {
        joke = data.joke;
      }
      tellMeJoke(joke);
      toggoleBtn();
    })
    .catch((err) => console.log("failed to fetch ", err));
};

button.addEventListener("click", getJokes);
audio.addEventListener("ended", toggoleBtn);
