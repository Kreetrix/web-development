

async function fetchData(url, options = {}) {
    const response = await fetch(url, options);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    if (response.status === 204) {
        return null;
    }

    return await response.json();
}
  
const test = async () => {

    try {
      const userData = await fetchData('https://reqres.in/api/users/1');
      console.log('GET Response -> ', userData);
    } catch (error) {
      console.error('GET Error -> ', error.message);
    }
  
    try {
      const newUser = {
        name: 'John Doe',
        job: 'Developer'
      };
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      };
      const createdUser = await fetchData('https://reqres.in/api/users', options);
      console.log(createdUser);
    } catch (error) {
      console.error('POST Error:', error.message);
    }
  
    try {
      await fetchData('https://reqres.in/api/unknown/23');
    } catch (error) {
      console.error('Error Response -> ', error.message);
    }
};

test();