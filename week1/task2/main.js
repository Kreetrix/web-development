function calculateDistance() {
    const point1 = document.getElementById("point1").value;
    const point2 = document.getElementById("point2").value;

    const [x1, y1] = point1.split(",").map(coord => parseFloat(coord.trim()));
    const [x2, y2] = point2.split(",").map(coord => parseFloat(coord.trim()));

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
        document.getElementById("result").innerText = "Invalid input. Please enter valid coordinates.";
        return;
    }

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    document.getElementById("result").innerText = `Distance between the points: ${distance.toFixed(2)}`;
}