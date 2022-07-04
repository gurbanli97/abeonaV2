export default function ({ $axios,store, error: nuxtError }) {
    $axios.onRequest(config => {
      config.headers['Content-Type'] = 'application/json';
    });
  
    $axios.onError(error => {
      const statusCode = error.response?.status;
      const message = error.message || 'Server error';

      if ([404, 500].includes(statusCode)) {
        nuxtError({ statusCode, message });
      }
    });
  }