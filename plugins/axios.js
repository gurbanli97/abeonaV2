export default function ({ $axios, error: nuxtError }) {
    $axios.onRequest(config => {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = 'Token 18cd72d3438c27d08086f397ed3a81efd4b45624'
    });
  
    $axios.onError(error => {
      nuxtError({
        statusCode: (error.response && error.response.status) || 500,
        message: error.message || 'Server error',
      });
    });
  }