async function createUser() {
    const user = {
      name: 'John Doe',
      job: 'Developer'
    };
  
    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      
      if (!response.ok) {
        console.log(response.status);
      }
      
      const data = await response.json();
      console.log('User created:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  createUser();