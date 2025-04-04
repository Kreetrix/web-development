import baseUrl from './variables.js';
import { fetchData } from './utils.js';
import { restaurantRow, restaurantModal } from './components.js';

const table = document.querySelector('table');
const modal = document.getElementById('restaurantModal');
const closeModal = document.querySelector('.close');
const filterButtons = {
  all: document.getElementById('all'),
  sodexo: document.getElementById('sodexo'),
  compass: document.getElementById('compass')
};

let allRestaurants = [];

const createRestaurantFilter = (company) => (restaurants) => {
  if (company === 'all') return restaurants;
  return restaurants.filter(restaurant => restaurant.company === company);
};

const filters = {
  all: createRestaurantFilter('all'),
  sodexo: createRestaurantFilter('Sodexo'),
  compass: createRestaurantFilter('Compass Group')
};

const displayRestaurants = async (filterFn = filters.all) => {
  try {
    if (allRestaurants.length === 0) {
      allRestaurants = await fetchData(`${baseUrl}/api/v1/restaurants`);
      allRestaurants.sort((a, b) => a.name.localeCompare(b.name));
    }

    const filteredRestaurants = filterFn(allRestaurants);
    
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Company</th>
        </tr>
      </thead>
      <tbody></tbody>
    `;
    
    const tbody = table.querySelector('tbody');
    
    filteredRestaurants.forEach(restaurant => {
      const row = restaurantRow(restaurant);
      row.addEventListener('click', async () => {
        try {
          const menu = await fetchData(`${baseUrl}/api/v1/restaurants/daily/${restaurant._id}/fi`);
          modal.querySelector('#modalBody').innerHTML = restaurantModal(restaurant, menu);
          modal.style.display = 'block';
        } catch (error) {
          modal.querySelector('#modalBody').innerHTML = `
            <h1>${restaurant.name}</h1>
            <p>Error loading menu: ${error.message}</p>
          `;
          modal.style.display = 'block';
        }
      });
      tbody.appendChild(row);
    });

    if (filteredRestaurants.length === 0) {
      tbody.innerHTML = `<tr><td colspan="2">No restaurants found</td></tr>`;
    }
  } catch (error) {
    console.error('Error loading restaurants:', error);
    table.innerHTML = `<tr><td colspan="2">Error loading restaurants: ${error.message}</td></tr>`;
  }
};

Object.entries(filterButtons).forEach(([key, button]) => {
  button.addEventListener('click', () => {
    Object.values(filterButtons).forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    displayRestaurants(filters[key]);
  });
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

filterButtons.all.classList.add('active');
displayRestaurants();