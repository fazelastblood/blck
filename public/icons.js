var db;

function loadIcon() {
  var request = indexedDB.open('myDatabase', 1);

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
    };

    request.onsuccess = function(event) {
      db = event.target.result;

      // Start a new transaction and get the settings object store
      var transaction = db.transaction(['settings'], 'readonly');
      var objectStore = transaction.objectStore('settings');

      // Retrieve the page icon URL
      var iconRequest = objectStore.get('pageIcon');

      iconRequest.onsuccess = function(event) {
        var iconData = event.target.result;

        if (iconData && iconData.url) {
          // If icon URL is found, resolve the promise with the icon URL
          resolve(iconData.url);
        } else {
          // If no icon URL is found, resolve the promise with the default icon URL
          resolve('/assets/blck-icon.png');
        }
      };

      iconRequest.onerror = function(event) {
        // If an error occurs, reject the promise with the error
        reject(event.target.error);
      };
    };

    request.onerror = function(event) {
      // If an error occurs, reject the promise with the error
      reject(event.target.errorCode);
    };
  });
}

function appendIconToHead(iconUrl) {
  var linkTag = document.createElement('link');
  linkTag.rel = 'icon';
  linkTag.type = 'image/png';
  linkTag.href = iconUrl;

  document.head.appendChild(linkTag);
}

// Example usage:
window.addEventListener('load', function() {
  var request = indexedDB.open('myDatabase', 1);

  request.onerror = function(event) {
    console.error('Error opening database:', event.target.errorCode);
  };

  request.onsuccess = function(event) {
    db = event.target.result;

    loadIcon()
      .then(iconUrl => {
        console.log('Loaded icon URL:', iconUrl);
        appendIconToHead(iconUrl);
        // Use the icon URL as needed in your application
      })
      .catch(error => {
        console.error('Error loading icon:', error);
      });
  };

  request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store to store the page icon URL
    var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
  };
});
