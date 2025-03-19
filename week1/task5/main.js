function calculateSum() {
    const number = parseInt(document.getElementById("numberInput").value);

    if (isNaN(number) || number < 1) {
        document.getElementById("result").textContent = "Please enter a valid positive integer.";
        return;
    }

    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum += i;
    }

    document.getElementById("result").textContent = `The sum of natural numbers up to ${number} is: ${sum}`;
}