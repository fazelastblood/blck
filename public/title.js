
var db;

function loadTabNameAndChangeDocumentTitle() {
    var itemKey = 'tabName'; // Replace with the key of the item you want to check

    var transaction = db.transaction(['settings'], 'readonly');
    var objectStore = transaction.objectStore('settings');
    var request = objectStore.get(itemKey);
  
    request.onsuccess = function(event) {
      var data = event.target.result;
  
      if (data && data.name) {
        // Change the document title with the retrieved tab name
        document.title = data.name;
      } else {
        // Handle the case when tab name is not found
        console.error('Tab name not found in settings.');
      }
    };
  
    request.onerror = function(event) {
      console.error('Error loading tab name:', event.target.error);
    };
  }

  window.addEventListener('load', function() {
    var request = window.indexedDB.open('myDatabase', 1);
  
    request.onerror = function(event) {
      console.error('Error opening database:', event.target.errorCode);
    };
  
    request.onsuccess = function(event) {
      db = event.target.result;
      loadTabNameAndChangeDocumentTitle();
    };
  
    request.onupgradeneeded = function(event) {
      db = event.target.result;
  
      // Create an object store to store the background image URL
      var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
    };
  });