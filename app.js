let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.querySelector(".result");

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value.trim();
    if (!countryName) {
        result.innerHTML = `<p>Please enter a country name</p>`;
        return;
    }

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(finalURL)
        .then((response) => {
            if (!response.ok) throw new Error("Country not found");
            return response.json();
        })
        .then((data) => {
            console.log(data);
            let country = data[0];
            result.innerHTML = `
                <img src="${country.flags.svg}" alt="Flag">
                <h3>${country.name.common}</h3>
                <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
                <p><strong>Continent:</strong> ${country.region}</p>
                <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                <p><strong>Currency:</strong> ${Object.values(country.currencies)[0].name} (${Object.values(country.currencies)[0].symbol})</p>
                <p><strong>Language:</strong> ${Object.values(country.languages).join(", ")}</p>
            `;
        })
        .catch(() => {
            result.innerHTML = `<p>Country not found. Please check the spelling.</p>`;
        });
});