document.addEventListener('DOMContentLoaded', async () => {
  const restaurantContainer = document.getElementById('restaurant-container');
  const loadingElement = document.getElementById('loading');
  const errorContainer = document.getElementById('error-container');
  const modal = document.getElementById('restaurant-modal');
  const closeBtn = document.querySelector('.close-btn');
  
  let restaurants = [];
  const url = 'https://media2.edu.metropolia.fi/restaurant'

  async function fetchRestaurants() {
    try {
      const response = await fetch(`${url}/api/v1/restaurants`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      restaurants = data;
      displayRestaurants();
      loadingElement.style.display = 'none';
    } catch (error) {
      loadingElement.style.display = 'none';
      showError(`Failed to load restaurants: ${error.message}`);
    }
  }

  async function fetchDailyMenu(restaurantId, lang = 'en') {
    try {
      const response = await fetch(`${url}/api/v1/restaurants/daily/${restaurantId}/${lang}`);
      
      if (response.status === 404) {
        throw new Error('Restaurant not found');
      }
      if (response.status === 500) {
        throw new Error('Internal server error');
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      showError(`Failed to load menu: ${error.message}`);
      return null;
    }
  }

  function displayRestaurants() {
    restaurantContainer.innerHTML = '';
    restaurants.forEach(restaurant => {
      const card = document.createElement('div');
      card.className = 'restaurant-card';
      card.innerHTML = `
        <h3>${restaurant.name}</h3>
        <p>${restaurant.address}</p>
      `;
      card.addEventListener('click', () => openModal(restaurant));
      restaurantContainer.appendChild(card);
    });
  }

  function showError(message) {
    errorContainer.innerHTML = `<div class="error">${message}</div>`;
  }

  async function openModal(restaurant) {
    document.getElementById('modal-title').textContent = restaurant.name;
    document.getElementById('modal-address').textContent = `Address: ${restaurant.address}`;
    document.getElementById('modal-phone').textContent = `Phone: ${restaurant.phone || 'N/A'}`;
    document.getElementById('modal-email').textContent = `Email: ${restaurant.email || 'N/A'}`;
    
    const menuContainer = document.getElementById('modal-menu');
    menuContainer.innerHTML = '<p>Loading daily menu...</p>';
    
    const dailyMenu = await fetchDailyMenu(restaurant._id, 'en');
    
    if (dailyMenu && dailyMenu.courses) {
      menuContainer.innerHTML = '<h3>Daily Menu</h3>';
      
      if (dailyMenu.courses.length > 0) {
        dailyMenu.courses.forEach(course => {
          const menuItem = document.createElement('div');
          menuItem.className = 'menu-item';
          menuItem.innerHTML = `
            <strong>${course.name}</strong><br>
            ${course.price || 'Price not available'}<br>
            ${course.diets || ''}
          `;
          menuContainer.appendChild(menuItem);
        });
      } else {
        menuContainer.innerHTML += '<p>No courses available for today.</p>';
      }
    } else {
      menuContainer.innerHTML = '<p>No daily menu available.</p>';
    }
    
    modal.style.display = 'flex';
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  fetchRestaurants();
});