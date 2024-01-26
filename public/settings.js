document.body.style.filter = "blur(0px)";

// Create or open the IndexedDB database
var db;
var request = window.indexedDB.open('myDatabase', 1);

request.onerror = function(event) {
  console.error('Error opening database:', event.target.errorCode);
};

request.onsuccess = function(event) {
  db = event.target.result;
};

request.onupgradeneeded = function(event) {
  db = event.target.result;

  // Create an object store to store the background image URL
  var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
};

function checkValid(imageURL) {
  if (imageURL.includes("https://") || imageURL.includes("http://") && imageURL.length > 10 || imageURL.includes('/assets/bg.webp') || imageURL.includes('/assets/heaven.jpg') || imageURL.includes('/assets/scfi_city.jpg') || imageURL.includes('/assets/space_mountin.jpg') || imageURL.includes('/assets/tower_space.jpg')) {
    return true;
  } else {
    return false;
  }
}

function changeBackground() {
  var imageUrl = document.getElementById('backgroundInput').value;

  var isValid = checkValid(imageUrl);
  if (isValid) {
    // Store the background image URL in IndexedDB
    var transaction = db.transaction(['settings'], 'readwrite');
    var objectStore = transaction.objectStore('settings');
    var data = { id: 'backgroundImage', url: imageUrl };
    var request = objectStore.put(data);

    request.onsuccess = function() {
      var text = document.querySelector(".settings-error");
      text.style.color = "#fff";
      text.style.display = "block";
      text.innerText = "Background Added";
      document.getElementById('backgroundInput').value = "";
      setTimeout(function() {
        text.style.display = "none";
      }, 3000);
    };

    request.onerror = function(event) {
      console.error('Error storing background image URL:', event.target.error);
    };
  } else {
    var text = document.querySelector(".settings-error");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Valid URL Please";
    document.getElementById('backgroundInput').value = "";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}

function reset() {
  var imageUrl = "./assets/bg.webp";

  var isValid = checkValid(imageUrl);
  if (isValid) {
    // Store the background image URL in IndexedDB
    var transaction = db.transaction(['settings'], 'readwrite');
    var objectStore = transaction.objectStore('settings');
    var data = { id: 'backgroundImage', url: imageUrl };
    var request = objectStore.put(data);

    request.onsuccess = function() {
      var text = document.querySelector(".settings-error");
      text.style.color = "#fff";
      text.style.display = "block";
      text.innerText = "Background Reset";
      document.getElementById('backgroundInput').value = "";
      setTimeout(function() {
        text.style.display = "none";
      }, 3000);
    };

    request.onerror = function(event) {
      console.error('Error storing background image URL:', event.target.error);
    };
  } else {
    var text = document.querySelector(".settings-error");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Valid URL Please";
    document.getElementById('backgroundInput').value = "";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}



function changeBackgroundREC(imgurl) {
  var imageUrl = imgurl;

  var isValid = checkValid(imageUrl);
  if (isValid) {
    // Store the background image URL in IndexedDB
    var transaction = db.transaction(['settings'], 'readwrite');
    var objectStore = transaction.objectStore('settings');
    var data = { id: 'backgroundImage', url: imageUrl };
    var request = objectStore.put(data);

    request.onsuccess = function() {
      var text = document.querySelector(".settings-error");
      text.style.color = "#fff";
      text.style.display = "block";
      text.innerText = "Background Changed";
      document.getElementById('backgroundInput').value = "";
      setTimeout(function() {
        text.style.display = "none";
      }, 3000);
    };

    request.onerror = function(event) {
      console.error('Error storing background image URL:', event.target.error);
    };
  } else {
    var text = document.querySelector(".settings-error");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Valid URL Please";
    document.getElementById('backgroundInput').value = "";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}

function resetTabName() {
  var transaction = db.transaction(['settings'], 'readwrite');
  var objectStore = transaction.objectStore('settings');
  
  // Use delete method to remove the tabName entry
  var request = objectStore.delete('tabName');

  request.onsuccess = function() {
    // Display success message or perform other UI updates
    var text = document.querySelector(".settings-error");
    text.style.color = "#fff";
    text.style.display = "block";
    text.innerText = "Tab Name Reset";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  };

  request.onerror = function(event) {
    console.error('Error resetting tab name:', event.target.error);
  };
  
}


function checkXSSValid(input) {
  // Use a regular expression or a library like DOMPurify for XSS validation
  // This is a basic example using a simple regular expression
  var cleanInput = input.replace(/<[^>]*>/g, ''); // Remove HTML tags

  // Check if the cleaned input is equal to the original input
  // If it's not equal, then there were HTML tags (potential XSS)
  return cleanInput === input;
}

function saveTabName(tabName) {
  // Check if tabName is XSS valid
  var isXSSValid = checkXSSValid(tabName);

  if (isXSSValid) {
    // Store the tabName in IndexedDB
    var transaction = db.transaction(['settings'], 'readwrite');
    var objectStore = transaction.objectStore('settings');
    var data = { id: 'tabName', name: tabName };
    var request = objectStore.put(data);

    request.onsuccess = function() {
      // Display success message
      var text = document.querySelector(".settings-error3");
      text.style.color = "#fff";
      text.style.display = "block";
      text.innerText = "Tab Name Saved";
      // Optionally clear input field or perform other UI updates
      // document.getElementById('tabNameInput').value = "";
      setTimeout(function() {
        text.style.display = "none";
      }, 3000);
    };

    request.onerror = function(event) {
      console.error('Error storing tab name:', event.target.error);
    };
  } else {
    // Display error message for invalid tabName
    var text = document.querySelector(".settings-error3");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Valid Tab Name Please (No XSS or malicious code)";
    // Optionally clear input field or perform other UI updates
    // document.getElementById('tabNameInput').value = "";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}


function changeSearch(searchEngine) {
  var searchUrl;

  // Determine the search engine URL based on the selected search engine
  switch (searchEngine) {
    case 'yahoo':
      searchUrl = 'https://search.yahoo.com/search?q=%s';
      break;
    case 'google':
      searchUrl = 'https://www.google.com/search?q=%s';
      break;
    case 'bing':
      searchUrl = 'https://www.bing.com/search?q=%s';
      break;
    case 'duckduckgo':
      searchUrl = 'https://duckduckgo.com/?q=%s';
      break;
    default:
      return; // If an invalid search engine is selected, do nothing
  }

  // Store the search engine URL in IndexedDB
  var transaction = db.transaction(['settings'], 'readwrite');
  var objectStore = transaction.objectStore('settings');
  var data = { id: 'searchEngine', url: searchUrl };
  var request = objectStore.put(data);

  request.onsuccess = function() {
    var text = document.querySelector(".settings-error1");
    text.style.color = "#fff";
    text.style.display = "block";
    text.innerText = "Search Changed";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  };
  

  request.onerror = function(event) {
    console.error('Error storing search engine URL:', event.target.error);
  };
}

function changeBackgroundRE(imgurl) {
  var imageUrl = imgurl;

  var isValid = checkValid(imageUrl);
  if (isValid) {
    // Store the background image URL in IndexedDB
    var transaction = db.transaction(['settings'], 'readwrite');
    var objectStore = transaction.objectStore('settings');
    var data = { id: 'backgroundImage', url: imageUrl };
    var request = objectStore.put(data);

    request.onsuccess = function() {
      var text = document.querySelector(".settings-error");
      text.style.color = "#fff";
      text.style.display = "block";
      text.innerText = "Background Changed";
      document.getElementById('backgroundInput').value = "";
      setTimeout(function() {
        text.style.display = "none";
      }, 3000);
    };

    request.onerror = function(event) {
      console.error('Error storing background image URL:', event.target.error);
    };
  } else {
    var text = document.querySelector(".settings-error");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Valid URL Please";
    document.getElementById('backgroundInput').value = "";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}


function deleteTileOrderFromLocalStorage() {
  localStorage.removeItem("tileOrder");
  var text = document.querySelector(".settings-error2");
  text.style.color = "#fff";
  text.style.display = "block";
  text.innerText = "Shortcuts Reset";
  setTimeout(function() {
    text.style.display = "none";
  }, 3000);
}

function checkValidColor(color) {
  // Regular expression to match a valid color hex code with hashtag
  var colorHexRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;

  // Return true if the input matches the color hex regex, otherwise return false
  return colorHexRegex.test(color);
}

function saveThemeColors(mainColor, darkColor) {
  // Check if mainColor and darkColor are valid (you can customize this validation)
  var isValidMainColor = checkValidColor(mainColor);
  var isValidDarkColor = checkValidColor(darkColor);

  if (isValidMainColor && isValidDarkColor) {
    // Start a new transaction and get the settings object store
    var transaction = db.transaction(['settings'], 'readwrite');
    var objectStore = transaction.objectStore('settings');

    // Save the main color
    var mainColorData = { id: 'colors_theme_main', color: mainColor };
    var mainColorRequest = objectStore.put(mainColorData);

    mainColorRequest.onsuccess = function() {
      console.log('Main color saved successfully.');
    };

    mainColorRequest.onerror = function(event) {
      console.error('Error saving main color:', event.target.error);
    };

    // Save the dark color
    var darkColorData = { id: 'colors_theme_dark', color: darkColor };
    var darkColorRequest = objectStore.put(darkColorData);

    darkColorRequest.onsuccess = function() {
      console.log('Dark color saved successfully.');
    };

    darkColorRequest.onerror = function(event) {
      console.error('Error saving dark color:', event.target.error);
    };

    transaction.oncomplete = function() {
      var text = document.querySelector(".settings-error8");
      text.style.color = "#fff";
      text.style.display = "block";
      text.innerText = "Theme Colors Saved";
      setTimeout(function() {
        text.style.display = "none";
      }, 3000);
    };

    transaction.onerror = function(event) {
      console.error('Transaction error:', event.target.error);
    };
  } else {
    var text = document.querySelector(".settings-error8");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Valid Colors Please";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}

function savePageIcon(iconUrl) {
  // Allowed icon URLs
  var allowedUrls = ["/assets/blck-icon.png", "./classes.png"];

  // Check if the provided icon URL is allowed
  if (allowedUrls.includes(iconUrl)) {
    var db;
    var request = indexedDB.open('myDatabase', 1);

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      var objectStore = db.createObjectStore('settings', { keyPath: 'id' });
    };

    request.onsuccess = function(event) {
      db = event.target.result;

      // Start a new transaction and get the settings object store
      var transaction = db.transaction(['settings'], 'readwrite');
      var objectStore = transaction.objectStore('settings');

      // Save the page icon URL
      var pageIconData = { id: 'pageIcon', url: iconUrl };
      var request = objectStore.put(pageIconData);

      request.onsuccess = function() {
        console.log('Page icon saved successfully.');
      };

      request.onerror = function(event) {
        console.error('Error saving page icon:', event.target.error);
      };

      transaction.oncomplete = function() {
        // Optional: Perform any additional actions after the transaction is complete
        var text = document.querySelector(".settings-error9");
        text.style.color = "#fff";
        text.style.display = "block";
        text.innerText = "Page Icon Saved";
        setTimeout(function() {
          text.style.display = "none";
        }, 3000);
      };

      transaction.onerror = function(event) {
        console.error('Transaction error:', event.target.error);
      };
    };

    request.onerror = function(event) {
      console.error('Error opening IndexedDB:', event.target.error);
    };
  } else {
    console.error('Invalid page icon');
    var text = document.querySelector(".settings-error9");
    text.style.color = "red";
    text.style.display = "block";
    text.innerText = "Invalid Page Icon URL";
    setTimeout(function() {
      text.style.display = "none";
    }, 3000);
  }
  
}