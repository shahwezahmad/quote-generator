const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')


function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}


let apiQuotes =[];

function newQuotes(){
    loading();
    const quotes = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quotes);
    // if quote author name is null change with unknown author
    if(!quotes.author)  authorText.textContent = 'Unknown';
    else authorText.textContent = quotes.author;

    // if quote length is larger it should be reduce font size
    if(quotes.text.length >50) quoteText.classList.add('long-quote');
    else quoteText.classList.remove('long-quote');
   
     quoteText.textContent = quotes.text;

    complete();
}
// get api now...
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const respons = await fetch(apiUrl);
        apiQuotes = await respons.json();
        // console.log(apiQuotes);
        newQuotes();
        
    } catch (error) {
        
    }
}

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click',newQuotes);

// On load

getQuotes();

