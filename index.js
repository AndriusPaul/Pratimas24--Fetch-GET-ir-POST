const state = {};
//https://robust-safe-crafter.glitch.me/
//https://localhost:7205/House/
fetch("https://robust-safe-crafter.glitch.me")
  .then((res) => res.json())
  .then((data) => {
    renderFilterProperties([...new Set(data.map((entry) => entry.city))]);
    renderPropertyCards(data);
    state.properties = data;
  });

function renderFilterProperties(cities) {
  cities.forEach((city) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = city;
    const filterContainer = document.getElementById("filter-container");
    filterContainer.append(filterButton);
  });
}
function renderPropertyCards(properties) {
  const propertyContainer = document.getElementById("properties-container");
  propertyContainer.innerHTML = "";
  properties.forEach((property) => {
    const propertyCard = document.createElement("div");
    propertyCard.setAttribute("class", "property-card");
    const propertyImage = document.createElement("img");
    propertyImage.src = property.image;
    const propertyPrice = document.createElement("h1");
    propertyPrice.textContent = `${property.price}Eur`;
    const propertyCity = document.createElement("p");
    propertyCity.textContent = property.city;
    const propertyDesc = document.createElement("p");
    propertyDesc.textContent = property.description;

    propertyCard.append(
      propertyImage,
      propertyPrice,
      propertyCity,
      propertyDesc
    );
    propertyContainer.append(propertyCard);
  });
}

function filterProperties(event) {
  if (event.target.tagName.toLowerCase() === "button") {
    const isAlreadySelected = event.target.classList.contains("selected");
    if (isAlreadySelected) {
      renderPropertyCards(state.properties);
    } else {
      const cityClicked = event.target.innerText;
      renderPropertyCards(
        state.properties.filter((property) => property.city === cityClicked)
      );
      const allFilterButtons = event.target.parentNode.children;
      for (let i = 0; i < allFilterButtons.length; i++) {
        allFilterButtons[i].classList.remove("selected");
      }
    }
    event.target.classList.toggle("selected");
  }
}

document
  .getElementById("filter-container")
  .addEventListener("click", filterProperties);
