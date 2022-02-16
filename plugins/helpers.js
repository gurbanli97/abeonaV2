export default ({ app }, inject) => {
    // inject("localePath", (url = "", params = {}, query = {}) => {
    //   return app.localePath({ name: url.replace("/", ""), params, query }, app.i18n.locale);
    // });
  
    inject("mapObjectToQuery", (object) => {
      const newObj = {};
      for (const [key, value] of Object.entries(object)) {
        if (value) newObj[key] = value;
      }
      return newObj;
    });
  
    inject("applyQueryToUrl", (url, query) => {
      if (query) {
        let queryEntities = "";
        url.indexOf("?") === -1 ? (url += "?") : (url += "&");
  
        Object.keys(query).forEach(key => {
          if (Array.isArray(query[key]) && query[key].length > 0) {
            query[key].forEach(subkey => {
              queryEntities += `${key}[]=${subkey}&`;
            })
          } else {
            if (query[key].length !== 0) {
              queryEntities += `${key}=${query[key]}&`;
            }
          }
        });
  
        if (queryEntities.slice(-1) === "&") {
          queryEntities = queryEntities.slice(0, -1);
        }
  
        return url + queryEntities;
      }
  
      return url;
    });
  }
  