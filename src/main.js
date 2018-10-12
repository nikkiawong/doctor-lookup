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
    let doctorSearchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&limit=100&user_key=${process.env.exports.apiKey}&query=${userQuery}`;
    let promise = doctorFinder.doctorQuery(doctorSearchUrl);

    promise.then(function(response){
      let body = JSON.parse(response);
      console.log(body);

      if (body.data.length === 0) {
        $(".results").html("");
        $(".results").html("<p>Sorry, no results found. Please try searching again.</p>");
      } else {
        $(".results").html("");
        for(let i=0; i < body.data.length; i++) {

          let street2;
          if (body.data[i].practices[0].visit_address.street2 === undefined) {
            street2 = "";
          } else {
            street2 = body.data[i].practices[0].visit_address.street2;
          }

          let website;
          if (body.data[i].practices[0].website === undefined) {
            website = "";
          } else {
            website = `<a href='${body.data[i].practices[0].website}'>Website</a>`;
          }

          let acceptsPatients;
          if (body.data[i].practices[0].accepts_new_patients === true) {
            acceptsPatients = "Yes";
          } else {
            acceptsPatients = "No";
          }
          console.log(street2);

          $(".results").append(`<div class="card" style="width: 35rem;"><div class="card-body"><h2 class="card-title">${body.data[i].profile.first_name} ${body.data[i].profile.last_name}</h2><img src="${body.data[i].profile.image_url}"><p>${body.data[i].practices[0].visit_address.street}</p><p>${street2}</p>
          <p>${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[0].practices[0].visit_address.zip}</p><p>${body.data[i].practices[0].phones[0].number}</p><p>${website}</p><p><span class='bold'>Accepts new patients?</span> ${acceptsPatients}</p></div></div>`);
        }

      }
    });
  });
});
