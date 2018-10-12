import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import DoctorFinder from './DoctorFinder.js';

$(document).ready(function() {
  $(".searchForm").submit(function() {
    event.preventDefault();

    let userQuery = $("input[name='query']").val();
    let doctorFinder = new DoctorFinder();
    let doctorSearchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=${process.env.exports.apiKey}&query=${userQuery}`;
    let promise = doctorFinder.doctorQuery(doctorSearchUrl);

    promise.then(function(response){
      let body = JSON.parse(response);

      for(let i=0; i < body.data.length; i++) {
        console.log(body.data[i].profile.first_name);
        console.log(body.data[i].profile.last_name);
        $(".results").append(`<h2>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</h2>`);
      }
    });
  });
});
