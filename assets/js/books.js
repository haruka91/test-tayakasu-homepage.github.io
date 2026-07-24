const booksGrid = document.querySelector("#booksGrid");
const booksShelf = document.querySelector("#booksShelf");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"') {
      if (quoted && nextChar === '"') {
        value += '"';
        index += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(value);
      if (row.some((cell) => cell.trim())) {
        rows.push(row);
      }
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) {
    rows.push(row);
  }

  const headers = rows.shift().map((header) => header.trim());
  return rows.map((cells) => headers.reduce((entry, header, index) => {
    entry[header] = (cells[index] || "").trim();
    return entry;
  }, {}));
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function renderShelf(books) {
  booksShelf.innerHTML = books.slice(0, 5).map((book) => `
    <span class="books-shelf-item">
      <img src="${escapeHtml(book.image)}" alt="">
    </span>
  `).join("");
}

function renderBooks(books) {
  booksGrid.innerHTML = books.map((book) => {
    const amazonLink = book.amazon_url
      ? `<a class="amazon-link" href="${escapeHtml(book.amazon_url)}" target="_blank" rel="noopener" aria-label="${escapeHtml(book.title)}をAmazonで見る">
          <img src="data/images/book/amazon.gif" alt="Amazon">
        </a>`
      : "";

    return `
      <article class="book-card">
        <div class="book-cover-area">
          <img src="${escapeHtml(book.image)}" alt="${escapeHtml(book.title)} 表紙" class="book-cover">
          <span class="book-year">${escapeHtml(book.year)}</span>
        </div>
        <div class="book-card-body">
          <h2>${escapeHtml(book.title)}</h2>
          <p class="book-authors">${escapeHtml(book.authors)}</p>
          <p class="book-meta">${escapeHtml(book.publisher)}<br>${escapeHtml(book.published)}</p>
          <p class="book-note">${escapeHtml(book.note)}</p>
        </div>
        <div class="book-card-footer">
          ${amazonLink}
        </div>
      </article>
    `;
  }).join("");
}

fetch("data/csv/book.csv")
  .then((response) => {
    if (!response.ok) {
      throw new Error("CSV load failed");
    }
    return response.text();
  })
  .then((text) => {
    const books = parseCsv(text).filter((book) => book.title && book.image);
    renderShelf(books);
    renderBooks(books);
  })
  .catch(() => {
    booksGrid.innerHTML = '<p class="books-loading">data/csv/book.csv を読み込めませんでした。</p>';
  });
