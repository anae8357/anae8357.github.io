const fetchButton = document.getElementById('fetch-quote-button'); 
// Loading Bar
function showLoadingIndicator() {
    document.getElementById('loading-bar').style.display = 'block';
}

function hideLoadingIndicator() {
    document.getElementById('loading-bar').style.display = 'none';
}

// Fetch API Functions
async function fetchRandomQuote() {
    fetchButton.style.display = 'none';
    showLoadingIndicator();

    try {
        // Fetch Quote
        const response = await fetch('https://type.fit/api/quotes');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const quotes = await response.json();
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        // Artificial delay
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay

        // Fetch random image 
        const imageResponse = await fetch('https://source.unsplash.com/random');
        const imageUrl = imageResponse.url; // Unsplash random image URL

        updatePageWithQuote(randomQuote.text, randomQuote.author, imageUrl);

    } catch (error) {
        console.error('Error fetching quote:', error);
    } finally {
        fetchButton.style.display = 'block';
        hideLoadingIndicator();
    }
}

// Update Container
function updatePageWithQuote(quote, author, imageUrl) {
    const quoteContainer = document.getElementById('quote-container');
    quoteContainer.innerHTML = `
        <p>"${quote}"</p>
        <p>— ${author || 'Unknown'}</p>
        <img src="${imageUrl}" alt="Random Image" style="width:100%; height:auto;">
    `;
}

// Event listener for document load
document.addEventListener('DOMContentLoaded', () => {
    fetchRandomQuote();
});