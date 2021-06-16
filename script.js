const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById("new-quote");
const tweetBtn = document.getElementById("twitter");

let apiData = [];

const newQuote = () => {
  const quote = apiData[Math.floor(Math.random() * apiData.length)];
  // checking if author is there
  if (!quote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }
//styling the length of quote
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
};

const getQuotes = async () => {
  const urlToQuotes = 'https://type.fit/api/quotes';
  try {
    const res = await fetch(urlToQuotes);
    apiData = await res.json();
    newQuote();
  } catch (error) {
    console.log('ERROR: ', `${error}`);
  }
};


const tweeting = () => {
	const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor}`;
	window.open(tweeterUrl, '_blank');
}

//event listeners to call functions above
newQuoteBtn.addEventListener("click", newQuote);
tweetBtn.addEventListener("click", tweeting);

getQuotes();
