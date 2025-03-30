async function testErrorHandling() {
    try {
      const response = await fetch('https://reqres.in/api/unknown/23');
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) 
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log('POST Response:', data);
    } catch (error) {
      console.error('POST Request Error:', error.message);
    }
  
    try {
      const response = await fetch('https://reqres.in/api/users/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Updated Name',
          job: 'Updated Job'
        })
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
      const data = await response.json();
      console.log('PUT Response:', data);
    } catch (error) {
      console.error('PUT Request Error:', error.message);
    }
  
    try {
      const response = await fetch('https://reqres.in/api/users/1', {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error(response.status);
      }
    } catch (error) {
      console.error('DELETE Request Error:', error.message);
    }
  }
  
  testErrorHandling();