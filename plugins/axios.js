export default function ({ $axios, error: nuxtError }) {
    $axios.onRequest(config => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = 'Token 59a1e6bf9efe056cc908427a64aa02568ae91c2c'
    });
  
    $axios.onError(error => {
      nuxtError({
        statusCode: (error.response && error.response.status) || 500,
        message: error.message || 'Server error',
      });
    });
  }