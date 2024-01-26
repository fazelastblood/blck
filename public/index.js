"use strict";

/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("uv-address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("uv-search-engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    document.getElementById("popup").style.display = "block";
    error.textContent = "Failed to register service worker.";
    errorCode.textContent = err.toString();
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
});

var db;
var request = window.indexedDB.open('myDatabase', 1);

request.onerror = function(event) {
  console.error('Error opening database:', event.target.errorCode);
};

request.onsuccess = function(event) {
  db = event.target.result;

  // Retrieve the stored search engine URL from IndexedDB
  var transaction = db.transaction(['settings'], 'readonly');
  var objectStore = transaction.objectStore('settings');
  var getRequest = objectStore.get('searchEngine');

  getRequest.onsuccess = function(event) {
    var searchEngineData = event.target.result;
    var defaultSearchEngineURL = 'https://www.google.com/search?q=%s';
  
    if (searchEngineData && searchEngineData.url) {
      // Set the stored search engine URL as the value for the hidden input
      document.getElementById('uv-search-engine').value = searchEngineData.url;
  
      // Extract the search engine name from the stored URL
      var searchEngineName = extractSearchEngineName(searchEngineData.url);
  
      // Change the background image URL for the .search-logo element
      var searchLogoElement = document.querySelector('.search-logo');
      var imageUrl = './assets/' + searchEngineName.toLowerCase() + '.webp';
      searchLogoElement.style.backgroundImage = 'url("' + imageUrl + '")';
    } else {
      // No search engine URL found, use the default search engine URL
      document.getElementById('uv-search-engine').value = defaultSearchEngineURL;
  
      // Extract the search engine name from the default URL
      var searchEngineName = extractSearchEngineName(defaultSearchEngineURL);
  
      // Change the background image URL for the .search-logo element using the default search engine name
      var searchLogoElement = document.querySelector('.search-logo');
      var imageUrl = './assets/' + searchEngineName.toLowerCase() + '.webp';
      searchLogoElement.style.backgroundImage = 'url("' + imageUrl + '")';
    }
  };
  
};

function extractSearchEngineName(url) {
  var domain = getDomainFromUrl(url);
  if (domain === 'duckduckgo.com') {
    return 'duckduckgo';
  } else {
    var searchEngineName = domain.split('.')[1];
    return searchEngineName;
  }
}


function getDomainFromUrl(url) {
  var parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
}


request.onupgradeneeded = function(event) {
  db = event.target.result;

  // Create an object store to store the background image URL
  var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
};