let qouteArray = [];

const newQuoteElement = document.getElementById('new-quote');
const newText = document.getElementById('text');
const authorElement = document.getElementById('author');
const tweeElement = document.getElementById('tweet');
const loaderElement = document.getElementById('loader');
const container = document.getElementById('quote-containers');

function loading() {
    loaderElement.hidden = false;
    container.hidden = true;
}

function reverseLodaing() {
    loaderElement.hidden = true;
    container.hidden = false;
}

function newQuote() {
    loading();
    const quote = qouteArray[Math.floor(Math.random() * qouteArray.length)];
   
    if (!quote.author) {
        authorElement.textContent = 'Unknown';
    } else {
        authorElement.textContent = quote.author;
    }
   
    if (quote.text.length > 120) {
       newText.classList.add('long-text');
    } else {
        newText.classList.remove('long-text');
    }

    newText.textContent = quote.text;
    reverseLodaing();
}

async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const respose = await fetch(apiUrl);
         qouteArray = await respose.json();
         newQuote();

    } catch (error) {

    }
}

function tweet() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${newText.textContent} - ${authorElement.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteElement.addEventListener('click',newQuote);
tweeElement.addEventListener('click', tweet);
getQuote();