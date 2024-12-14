// script.js
async function searchCocktail() {
    const searchTerm = document.getElementById('searchBar').value;
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    const data = await response.json();
    
    displayCocktails(data.drinks);
  }
  
  function displayCocktails(cocktails) {
    const cocktailList = document.getElementById('cocktailList');
    cocktailList.innerHTML = '';
  
    if (cocktails) {
      cocktails.forEach(cocktail => {
        const cocktailElement = document.createElement('div');
        cocktailElement.classList.add('cocktail');
  
        const cocktailImage = cocktail.strDrinkThumb ? `<img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">` : '';
  
        const ingredients = getIngredients(cocktail);
  
        // Use English instructions if available
        const instructions = cocktail.strInstructions ? cocktail.strInstructions : 'Instructions not available';
  
        cocktailElement.innerHTML = `
          ${cocktailImage}
          <div class="cocktail-details">
            <h2>${cocktail.strDrink}</h2>
            <p><strong>Category:</strong> ${cocktail.strCategory}</p>
            <p><strong>Glass:</strong> ${cocktail.strGlass}</p>
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Instructions:</strong> ${instructions}</p>
            
            
          </div>
        `;
  
        cocktailList.appendChild(cocktailElement);
      });
    } else {
      cocktailList.innerHTML = '<p>No cocktails found</p>';
    }
  }
  
  function getIngredients(cocktail) {
    let ingredients = '';
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients += `${measure ? measure : ''} ${ingredient}, `;
      }
    }
    return ingredients.slice(0, -2);
  }
  