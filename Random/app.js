let btn = document.querySelector(".btn");
let quote_text = document.getElementById("quotes-txt");
let author = document.querySelector(".author");
let is_fetch = 1;

btn.addEventListener("click", () => {
  is_fetch = 2;
  btn.innerText = "Loading Quotes";
  btn.classList.add("load");
  fetch("https://api.quotable.io/random")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      btn.classList.remove("load");
      btn.innerText = "Get New Quote";
      //   console.log(data);
      quote_text.innerText = `${data.content}`;
      author.innerText = ` By ${data.author}`;
    })
    .catch((reject) => {
      console.log(reject);
    });

  if (is_fetch == 2) {
    let apeech = document.getElementById("speech");
    speech.addEventListener("click", (_) => {
      let txtToSpeech = new SpeechSynthesisUtterance(
        `${quote_text.innerText} by ${author.innerText}`
      );
      speechSynthesis.speak(txtToSpeech);
    });

    let copy = document.getElementById("copy");
    copy.addEventListener("click", (_) => {
      navigator.clipboard.writeText(`${quote_text.innerText} `);
    });

    let twitter_share = document.getElementById("twitter_share");
    twitter_share.addEventListener("click", (_) => {
      let tweet = `https://twitter.com/intent/tweet?url=${quote_text.innerText}`;
      window.open(tweet, "_blank");
    });
  } else {
    alert("Please generate a quote first.");
  }
});
