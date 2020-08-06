const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let countError = 0;

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function stopLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

async function fetchQuote(e) {
  showLoadingSpinner();
  try {
    const response = await fetch(proxyUrl + apiUrl, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    authorText.innerText = data.quoteAuthor ? data.quoteAuthor : 'Unknown';
    quoteText.innerText = data.quoteText;
    quoteText.innerText.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    stopLoadingSpinner();
  } catch (err) {
    if (countError > 10) {
      countError = 0;
      console.log(err);
      window.alert('Something went wrong... fetch canceled');
      return;
    }
    countError += 1;
    fetchQuote();
    console.log(err);
  }
}

fetchQuote();

// Event Listeners
newQuoteBtn.addEventListener('click', fetchQuote);

document.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    fetchQuote();
  }
});
