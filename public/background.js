var defaultBG = "./assets/bg.webp";
var db;

function update() {
  document.body.style.filter = "blur(0px)";

  var itemKey = 'backgroundImage'; // Replace with the key of the item you want to check

  var transaction = db.transaction(['settings'], 'readonly');
  var objectStore = transaction.objectStore('settings');
  var request = objectStore.get(itemKey);

  request.onsuccess = function(event) {
    var itemValue = event.target.result;
    if (itemValue === null || typeof itemValue === 'undefined') {
      var transaction = db.transaction(['settings'], 'readwrite');
      var objectStore = transaction.objectStore('settings');
      var data = { id: itemKey, url: defaultBG };
      var request = objectStore.put(data);

      request.onsuccess = function() {
        update();
      };

      request.onerror = function(event) {
        console.error('Error storing default background image URL:', event.target.error);
      };
    } else {
      var savedImageUrl = itemValue.url;
      if (savedImageUrl) {
        var style = document.createElement('style');
        style.innerHTML = `
            body {
              background: url(${savedImageUrl});
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
            }

            html {
              background: url(${savedImageUrl});
              background-repeat: no-repeat;
              background-position: center;
              background-size: cover;
            }
        `;

        // Append the style element to the head
        document.head.appendChild(style);
      }
    }
  };

  request.onerror = function(event) {
    console.error('Error retrieving background image URL:', event.target.error);
  };
}

window.addEventListener('load', function() {
  var request = window.indexedDB.open('myDatabase', 1);

  request.onerror = function(event) {
    console.error('Error opening database:', event.target.errorCode);
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    update();
  };

  request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store to store the background image URL
    var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
  };
});