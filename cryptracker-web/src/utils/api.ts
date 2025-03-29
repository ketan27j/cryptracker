
const API_BASE_URL = 'http://localhost:3004';

export const apiGet = async (endpoint: string) => {
    console.log('API GET Request:', `${API_BASE_URL}/${endpoint}`);
    const token = localStorage.getItem('authToken');
    try {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('Error occurred in API Get:', error);
      console.error('API GET Error:', error);
      throw error;
    }
};

export const apiPost = async (endpoint: string, data: any) => {
    console.log('API POST Request:', `${API_BASE_URL}/${endpoint}`);
    const token = localStorage.getItem('authToken');
    try {
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data
        //   userId: userId, // Include userId in all requests
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
};

