var db;

function loadThemeColorsAndApplyCSS() {
  var mainColorKey = 'colors_theme_main';
  var darkColorKey = 'colors_theme_dark';

  var transaction = db.transaction(['settings'], 'readonly');
  var objectStore = transaction.objectStore('settings');

  // Retrieve the main color
  var mainColorRequest = objectStore.get(mainColorKey);

  mainColorRequest.onsuccess = function(event) {
    var mainColorData = event.target.result;

    if (mainColorData && mainColorData.color) {
      // Apply main color to CSS styles
      document.styleSheets[0].insertRule(
        `.search-content::before, .search-content.focused::before { background-color: ${mainColorData.color}; }`,
        document.styleSheets[0].cssRules.length
      );

      // Apply main color to the scrollbar thumb
      document.styleSheets[0].insertRule(
        `::-webkit-scrollbar-thumb { background: ${mainColorData.color}; }`,
        document.styleSheets[0].cssRules.length
      );
    }
  };

  mainColorRequest.onerror = function(event) {
    console.error('Error loading main color:', event.target.error);
  };

  // Retrieve the dark color
  var darkColorRequest = objectStore.get(darkColorKey);

  darkColorRequest.onsuccess = function(event) {
    var darkColorData = event.target.result;

    if (darkColorData && darkColorData.color) {
      // Apply dark color to CSS styles
      document.styleSheets[0].insertRule(
        `.search-content::before, .search-content::after { background-color: ${darkColorData.color}; }`,
        document.styleSheets[0].cssRules.length
      );

      // Apply dark color to the scrollbar track
      document.styleSheets[0].insertRule(
        `::-webkit-scrollbar-track { background: ${darkColorData.color}; }`,
        document.styleSheets[0].cssRules.length
      );
    }
  };

  darkColorRequest.onerror = function(event) {
    console.error('Error loading dark color:', event.target.error);
  };

  transaction.onerror = function(event) {
    console.error('Transaction error:', event.target.error);
  };
}

// Example usage:
window.addEventListener('load', function() {
  var request = window.indexedDB.open('myDatabase', 1);

  request.onerror = function(event) {
    console.error('Error opening database:', event.target.errorCode);
  };

  request.onsuccess = function(event) {
    db = event.target.result;
    loadThemeColorsAndApplyCSS();
  };

  request.onupgradeneeded = function(event) {
    db = event.target.result;

    // Create an object store to store the theme colors
    var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
  };
});
