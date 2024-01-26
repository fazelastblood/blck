// Function to start dragging
function dragStart(event) {
  const tile = event.target.closest(".tile");
  if (tile) {
    const existingId = tile.id; // Get the existing ID of the tile
    const draggingId = existingId + "_dragging"; // Append "_dragging" to the existing ID
    event.dataTransfer.setData("text/plain", draggingId);
    tile.classList.add("dragging");
    tile.setAttribute("data-original-id", existingId); // Store the original ID as a data attribute

    // Call the checkMouseReleased function
    checkMouseReleased();
  }
}
  
  // Function to check if the mouse was released outside of any tiles
  function checkMouseReleased() {
    const handleMouseUp = (event) => {
      const draggedTile = document.querySelector(".tile.dragging");
      const targetTile = event.target.closest(".tile");
  
      if (!targetTile && draggedTile) {
        draggedTile.classList.remove("dragging");
  
        // Remove the highlight class from all tiles
        const highlightedTiles = Array.from(document.querySelectorAll(".tile.highlight"));
        highlightedTiles.forEach((highlightedTile) => {
          highlightedTile.classList.remove("highlight");
        });
      }
  
      // Remove the event listener after the mouse is released
      document.removeEventListener("mouseup", handleMouseUp);
    };
  
    // Add event listener for mouseup on the whole document
    document.addEventListener("mouseup", handleMouseUp);
  }
  
  
  // Function to allow dropping
  function allowDrop(event) {
    event.preventDefault();
    const tile = event.target.closest(".tile");
    const highlightedTiles = Array.from(document.querySelectorAll(".tile.highlight"));
    highlightedTiles.forEach((highlightedTile) => {
      if (highlightedTile !== tile) {
        highlightedTile.classList.remove("highlight");
      }
    });
    if (tile && !tile.classList.contains("highlight")) {
      tile.classList.add("highlight");
    }
  }
  
  // Function to handle dropping
  function drop(event) {
    event.preventDefault();
    const draggedTileId = event.dataTransfer.getData("text/plain").replace("_dragging", "");
    const draggedTile = document.getElementById(draggedTileId);
    const targetTile = event.target.closest(".tile");
  
    if (draggedTile && targetTile && targetTile.parentNode) {
      // Get the current tile order from local storage
      const tileOrder = JSON.parse(localStorage.getItem("tileOrder")) || {};
  
      // Swap the positions in the tile order dictionary
      const draggedTileIndex = Array.from(draggedTile.parentNode.children).indexOf(draggedTile) + 1;
      const targetTileIndex = Array.from(targetTile.parentNode.children).indexOf(targetTile) + 1;
      [tileOrder[draggedTileIndex], tileOrder[targetTileIndex]] = [tileOrder[targetTileIndex], tileOrder[draggedTileIndex]];
  
      // Save the updated tile order to local storage
      localStorage.setItem("tileOrder", JSON.stringify(tileOrder));
  
      // Update the screen
      const container = document.querySelector(".grid-tiles");
      container.innerHTML = ""; // Clear the container before appending tiles
      Object.entries(tileOrder).forEach(([index, tilePath]) => {
        const tile = createTileElement(index, tilePath);
        container.appendChild(tile);
      });
    } else {
      if (draggedTile) {
        draggedTile.classList.remove("dragging");
      }
    }
  
    // Remove the highlight class from all tiles
    const highlightedTiles = Array.from(document.querySelectorAll(".tile.highlight"));
    highlightedTiles.forEach((highlightedTile) => {
      highlightedTile.classList.remove("highlight");
    });
  }
  
  
// Function to create a tile element with the specified index and path
function createTileElement(index, tilePath) {
    const tile = document.createElement("div");
    tile.id = "tile" + index; // Assign a string ID to the tile
    tile.classList.add("tile");
    tile.draggable = true;
    tile.addEventListener("dragstart", dragStart);
  
    if (index >= 7 && index <= 12) {
      tile.id += " desktop-only"; // Append "_desktop-only" to the tile ID
      tile.classList.add("desktop-only"); // Add the "desktop-only" class
    }
  
    const link = document.createElement("a");
    link.href = tilePath.link;
  
    const image = document.createElement("img");
    image.src = tilePath.image;
    image.alt = "";
  
    link.appendChild(image);
    tile.appendChild(link);
  
    return tile;
  }
  
  // Function to load the saved tile order from local storage or create a new one
  function loadTileOrder() {
    let tileOrder = JSON.parse(localStorage.getItem("tileOrder"));
    if (!tileOrder) {
      tileOrder = {};
  
      const container = document.querySelector(".grid-tiles");
      const tiles = Array.from(container.children);
  
      tiles.forEach((tile, index) => {
        const tileLink = tile.querySelector("a");
        const tilePath = {
          image: tileLink.querySelector("img").src,
          link: tileLink.href,
        };
  
        tileOrder[index + 1] = tilePath;
      });
  
      localStorage.setItem("tileOrder", JSON.stringify(tileOrder));
    }
  
    // Update the screen based on the tile order
    const container = document.querySelector(".grid-tiles");
    container.innerHTML = ""; // Clear the container before appending tiles
    Object.entries(tileOrder).forEach(([index, tilePath]) => {
      const tile = createTileElement(index, tilePath);
      container.appendChild(tile);
    });
  }
  
  // Clear the localStorage if it doesn't have the tileOrder key
  function clearLocalStorageIfEmpty() {
    if (!localStorage.getItem("tileOrder")) {
      localStorage.clear();
    }
  }
  
  // Load the tile order when the page loads
  window.addEventListener("DOMContentLoaded", () => {
    clearLocalStorageIfEmpty();
    loadTileOrder();
  });