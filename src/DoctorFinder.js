export default class DoctorFinder {
  doctorQuery(doctorSearchUrl){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = doctorSearchUrl;
      request.onload = function() {
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
