export default class Geocode {
  geocodeQuery(geocodeUrl){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = geocodeUrl;
      request.onload = function() {
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
