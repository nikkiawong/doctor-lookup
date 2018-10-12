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
    let doctorSearchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_key=${process.env.exports.apiKey}&query=${userQuery}`;
    let promise = doctorFinder.doctorQuery(doctorSearchUrl);

    promise.then(function(response){
      let body = JSON.parse(response);

      for(let i=0; i < body.data.length; i++) {
        console.log(body.data[i].profile.first_name);
        console.log(body.data[i].profile.last_name);
        console.log(body.data[i].practices[0].accepts_new_patients);
        console.log(body.data[i].practices[0].phones[0].number);
        console.log(body.data[i].practices[0].website);
        console.log(body.data[i].practices[0].visit_address.street + ", " + body.data[i].practices[0].visit_address.street2 + ", " + body.data[i].practices[0].visit_address.city + ", " + body.data[i].practices[0].visit_address.state + " " + body.data[0].practices[0].visit_address.zip);
        $(".results").append(`<h2>${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</h2><p>${body.data[i].practices[0].visit_address.street + ", " + body.data[i].practices[0].visit_address.street2 + ", " + body.data[i].practices[0].visit_address.city + ", " + body.data[i].practices[0].visit_address.state + " " + body.data[0].practices[0].visit_address.zip}</p><p>${body.data[i].practices[0].phones[0].number}</p><p>${body.data[i].practices[0].website}</p><p><span class='bold'>Accepts new patients?</span> ${body.data[i].practices[0].accepts_new_patients}</p>`);
      }
    });
  });
});
