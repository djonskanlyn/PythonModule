// Random Meal API

document.addEventListener('DOMContentLoaded', function() { // checks that the DOM has loaded
    fetchCategories(); // runs fetch meal categories function
    document.getElementById('fetchMeal').addEventListener('click', fetchRandomMeal); // listen out for click on fetch meal button and call fetch random meal function
    document.getElementById('saveFavourite').addEventListener('click', sendRecipeToFavourites);
});

// function to fetch meal categories from API
function fetchCategories() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php') // fetch data from api
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const select = document.getElementById('categorySelect'); // retrieve the 'categorySelect' element from document
            data.categories.forEach(category => { // for each element in categories list in JSON (data)
                const option = document.createElement('option'); // create on option element
                option.value = category.strCategory; // set the value of the category option to the name string (strCategory is a value in the JSON)
                option.textContent = category.strCategory; // set the text content of the category option to the name string
                select.appendChild(option); // add the option element to the dropdown ('categorySelect' element from document)
            });
        })
        .catch(error => { // if there is an error
            console.error('Error loading categories:', error); // record message error in console
        });
}

// function to fetch random meal
function fetchRandomMeal() {
    const selectedCategory = document.getElementById('categorySelect').value; // identify selected meal category
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`) // fetch data from api referencing selected meal category
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const meals = data.meals; // store the meals data from JSON object as meals 
            const randomIndex = Math.floor(Math.random() * meals.length); // select a random number as an index within the length of t/he array of meals pulled down
            const randomMeal = meals[randomIndex]; // store the meal identified by the random index
            fetchMealDetails(randomMeal.idMeal); // use the fetchMealDetails() function to pulls the meal details data based on the meal id. (idMeal is a value in the JSON)
        })
        // catch error code
        .catch(error => {
            console.error('Error fetching meals:', error); // record message error in console
            document.getElementById('mealDisplay').innerHTML = `<p>Error fetching data. Please try again.</p>`; // provide error message on webpage
        });
}

// function to fetch meal details
function fetchMealDetails(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`) // fetch data from api referencing selected meal id
        .then(response => response.json()) // when promise resolves successfully, extract JSON from response
        .then(data => { // when promise resolves successfully, data is the JSON object
            const meal = data.meals[0]; // create a variable of the first meal returned
            displayMeal(meal); // use the displayMeal() function on the data returned
        })
        // catch error code
        .catch(error => {
            console.error('Error fetching meal details:', error); // record message error in console
            document.getElementById('mealDisplay').innerHTML = `<p>Error fetching meal details. Please try again.</p>`; // provide error message on webpage
        });
}

function displayMeal(meal) {

    const mealClass = document.getElementById('categorySelect').value;
    const mealDiv = document.getElementById('mealDisplay'); // get the mealDisplay element of the DOM

    const mealName = meal.strMeal || 'No meal found';
    const mealThumb = meal.strMealThumb || 'static/images/No_Image_Available.jpg'; 
    
    const instructions = meal.strInstructions || 'No cooking instructions provided.';
    // Regex to split on periods, question marks, and exclamation marks that are followed by a space or end of string, and not preceded by a common abbreviation
    const mealInstructions = instructions.split(/(?<!\b(?:Mr|Mrs|Dr|Ms|Jr|Sr|St)\.)(?<!\b\d)\.\s+|\?\s+|\!\s+/g).map(item => 
        item.trim() ? `<li>${item.trim()}</li>` : ''
    ).join('');

    

    mealDiv.innerHTML = `

        <h2>${mealClass}: ${mealName}</h2>

        <div class="styled-frame">
            <img src="${mealThumb}" alt="Image of ${mealName}" class="meal-image" style="width: 300px;">
        </div>

        <ul> </ul>

        <div class="styled-frame">
            <ul>${mealInstructions}</ul>
        </div>
    `;
}

function sendRecipeToFavourites() { 
    const mealClass = document.getElementById('mealClass').textContent;
    const mealName = document.getElementById('mealName').textContent;
    const mealThumb = document.getElementById('mealThumb').src;
    const mealInstructions = document.getElementById('mealInstructions').textContent;

    console.log("Sending data to /favourites:", {mealClass, mealName, mealThumb, mealInstructions});

    fetch('/favourites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mealClass: mealClass,
            mealName: mealName,
            mealThumb: mealThumb,
            mealInstructions: mealInstructions
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP error ' + response.status);
        }
        return response.json();
    })
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

