async function fetchUser() {
    try {
        const response = await fetch('https://reqres.in/api/users/1');
        if (!response.ok) {
        throw new Error(`status: ${response.status}`);
        }
        const data = await response.json();
        console.log('User data:', data);
    } catch (error) {
        console.error('Error:', error);
    }
  }
  
  fetchUser();