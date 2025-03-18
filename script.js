// initialize the html selectors
const quoteAuthor = document.querySelector(".quote-author");
const quoteParagraph = document.querySelector(".quote-full");
const quoteButton = document.querySelector(".new-quote-btn");
const copyToClipboardButton = document.querySelector(".copy-btn");
const twitterShareButton = document.querySelector(".twitter-share-btn");
// Define the API URL
const apiUrl = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

// Make a GET request
function fetchRandomQuote() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display data in an HTML element
            // remove the double quote from the text for author information
            quoteAuthor.textContent = JSON.stringify(data.data.author, null, 2).replace(/['"]+/g, '');
            quoteParagraph.textContent = JSON.stringify(data.data.content, null, 2);
            twitterShareButton.setAttribute("href", `https://twitter.com/intent/tweet?text=Here is a quote from ${quoteAuthor.textContent} - ${quoteParagraph.textContent}`);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function copyToClipboard() {
    // Copy the generated quote
    navigator.clipboard.writeText(quoteParagraph.textContent);

    // Alert the copied text
    alert("Quote has been copied to your clipboard.");
}

// random quote is fetched when the page is loaded
fetchRandomQuote()

// code to pull a random quote from the api response whenever someone clicks on 'new quote' button
quoteButton.addEventListener("click", fetchRandomQuote)
// code to copy the generated quote
copyToClipboardButton.addEventListener("click", copyToClipboard)
