export const restaurantRow = (restaurant) => {
  const {name, company} = restaurant;
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name}</td>
    <td class="${company.toLowerCase()}">${company}</td>
  `;
  return tr;
};

export const restaurantModal = (restaurant, menu) => {
  const {
    name, 
    address, 
    postalCode, 
    city, 
    phone, 
    company
  } = restaurant;
  
  const menuHtml = menu?.courses
    ?.map(({name: courseName, price, diets}) => 
      `<li>${courseName}, ${price ?? '?€'}${diets ? ` (${diets})` : ''}</li>`
    )
    .join('') || '<li>No menu available</li>';

  return `
    <h1>${name}</h1>
    <p><strong>Address:</strong> ${address}</p>
    <p><strong>Postal Code:</strong> ${postalCode}</p>
    <p><strong>City:</strong> ${city}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Company:</strong> <span class="${company.toLowerCase()}">${company}</span></p>
    <h2>Menu</h2>
    <ul>${menuHtml}</ul>
  `;
};