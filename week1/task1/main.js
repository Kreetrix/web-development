function convertTemperature() {
    const celsius = parseFloat(document.getElementById("celsius").value);

    if (isNaN(celsius)) {
        alert("Please enter a valid number for Celsius.");
        return;
    }

    const fahrenheit = (celsius * 9/5) + 32;

    const kelvin = celsius + 273.15;

    document.getElementById("fahrenheit").textContent = `Fahrenheit: ${fahrenheit.toFixed(2)}°F`;
    document.getElementById("kelvin").textContent = `Kelvin: ${kelvin.toFixed(2)}K`;
}