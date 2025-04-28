// This file contains JavaScript code for interactivity on the website, including search functionality, fetching news articles, and managing the catalog display.

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const resultsContainer = document.getElementById('results-container');

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.toLowerCase();
        fetch('/src/data/products.json')
            .then(response => response.json())
            .then(data => {
                const results = data.filter(product => product.name.toLowerCase().includes(query));
                displayResults(results);
            });
    });

    function displayResults(results) {
        resultsContainer.innerHTML = '';
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>No counterfeit products found.</p>';
            return;
        }
        results.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p>Description: ${product.description}</p>
            `;
            resultsContainer.appendChild(productElement);
        });
    }

    // Fetch and display news articles
    fetchNewsArticles();

    function fetchNewsArticles() {
        // Placeholder for fetching news articles
        // This can be replaced with actual API calls to fetch news
        const newsContainer = document.getElementById('news-container');
        const newsArticles = [
            { title: 'Counterfeit Milk Warning', content: 'Authorities have issued a warning about counterfeit milk products.' },
            { title: 'Fake Medicines in the Market', content: 'Recent investigations have uncovered fake medicines being sold.' }
        ];

        newsArticles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('news-article');
            articleElement.innerHTML = `
                <h4>${article.title}</h4>
                <p>${article.content}</p>
            `;
            newsContainer.appendChild(articleElement);
        });
    }
});