import baseUrl from './variables.js';
import { fetchData } from './utils.js';
import { restaurantRow, restaurantModal } from './components.js';

const table = document.querySelector('table');
const modal = document.getElementById('restaurantModal');
const closeModal = document.querySelector('.close');

const displayRestaurants = async () => {
  try {
    const restaurants = await fetchData(`${baseUrl}/api/v1/restaurants`);
    restaurants.sort((a, b) => a.name.localeCompare(b.name));
    
    table.innerHTML = '';
    restaurants.forEach(restaurant => {
      const row = restaurantRow(restaurant);
      row.addEventListener('click', async () => {
        try {
          const menu = await fetchData(`${baseUrl}/api/v1/restaurants/daily/${restaurant._id}/fi`);
          modal.querySelector('#modalBody').innerHTML = restaurantModal(restaurant, menu);
          modal.style.display = 'block';
        } catch (error) {
          modal.innerHTML = `<p>Error loading menu: ${error.message}</p>`;
          modal.style.display = 'block';
        }
      });
      table.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading restaurants:', error);
    table.innerHTML = `<tr><td colspan="2">Error loading restaurants: ${error.message}</td></tr>`;
  }
};

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

displayRestaurants();