import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-course-efb3a-default-rtdb.europe-west1.firebasedatabase.app/',
  timeout: 5000 // The API request has a timeout of 5 seconds
});

instance.interceptors.request.use(function (config) {
  // Use() serves as middleware. Modify the config here if needed.
  // For instance, you might want to redirect the request to another API.
  console.log('Request Config:', config);
  return config;  // Proceed with the request

}, function (err) {
  // Handle any errors that occur during the request phase.
  return Promise.reject(err); // Reject the promise with the error object
});

// Add a response interceptor to handle actions after receiving a response.
instance.interceptors.response.use(function (response) {
  // Log the received response for debugging purposes.
  console.log('Received Response:', response);
  return response;  // Proceed with the received response

}, function (err) {
  // Log any errors that occur during the response phase.
  console.log('Response Error:', err);

  // Reject the promise with the error object to allow further handling.
  return Promise.reject(err);
});

export default instance;