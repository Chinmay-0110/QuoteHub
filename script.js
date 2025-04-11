const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const quoteInput = document.getElementById('quote-input');
const authorInput = document.getElementById('author-input');
const addBtn = document.getElementById('add-quote');
const addMsg = document.getElementById('add-msg');

const API = 'http://localhost:3000';

async function fetchRandomQuote() {
  quoteText.textContent = "Loading...";
  try {
    const res = await fetch(`${API}/random`);
    const data = await res.json();
    quoteText.textContent = `"${data.quote}"`;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (err) {
    quoteText.textContent = "Error loading quote.";
    quoteAuthor.textContent = "";
  }
}

newQuoteBtn.addEventListener('click', fetchRandomQuote);
window.onload = fetchRandomQuote;

addBtn.addEventListener('click', async () => {
  const quote = quoteInput.value.trim();
  const author = authorInput.value.trim();

  if (!quote || !author) {
    addMsg.textContent = "Both fields are required.";
    return;
  }

  const res = await fetch(`${API}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quote, author })
  });

  const result = await res.json();
  addMsg.textContent = result.message;

  // Clear inputs
  quoteInput.value = '';
  authorInput.value = '';
});
