import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import DoctorFinder from './DoctorFinder.js';
import Geocode from './Geocode.js';

$(document).ready(function() {
  $(".searchForm").submit(function() {
    event.preventDefault();

    let userAddress = $("input[name='address']").val();
    let userQuery = $("input[name='query']").val();
    let distance = $("option:selected").val();

    let geocode = new Geocode();
    let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${userAddress}&key=${process.env.exports.apiKey2}`;
    let geocodePromise = geocode.geocodeQuery(geocodeUrl);

    geocodePromise.then(function(response) {
      let geoBody = JSON.parse(response);
      let lat = geoBody.results[0].geometry.location.lat;
      let lng = geoBody.results[0].geometry.location.lng;

      let doctorFinder = new DoctorFinder();
      let doctorSearchUrl = `https://api.betterdoctor.com/2016-03-01/doctors?location=${lat},${lng},${distance}&sort=distance-desc&limit=100&user_key=${process.env.exports.apiKey}&query=${userQuery}`;
      let promise = doctorFinder.doctorQuery(doctorSearchUrl);

      promise.then(function(response){
        let body = JSON.parse(response);

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

            let middleName;
            if (body.data[i].profile.middle_name === undefined) {
              middleName = "";
            } else {
              if (body.data[i].profile.middle_name.length < 2) {
                middleName = " " + body.data[i].profile.middle_name + ".";
              } else {
                middleName = " " + body.data[i].profile.middle_name;
              }
            }

            let number = body.data[i].practices[0].phones[0].number;
            number = number.split("");
            number.splice(3, 0, '-');
            number.splice(7, 0, '-');
            number = number.join("");

            $(".results").append(`<div class="card" style="width: 35rem;" id="doctor${i}"><div class="card-body"><h5 class="card-title">${body.data[i].profile.first_name}${middleName} ${body.data[i].profile.last_name}, ${body.data[i].profile.title}</h5><div class="doctor-info" id="doctor-info-doctor${i}"><img src="${body.data[i].profile.image_url}"><p class="small-text">${body.data[i].profile.bio}</p><p>${body.data[i].practices[0].visit_address.street}</p><p>${street2}</p>
            <p>${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state} ${body.data[0].practices[0].visit_address.zip}</p><p>${number}</p><p>${website}</p><p><span class='bold'>Accepts new patients?</span> ${acceptsPatients}</p></div></div></div>`);
          }
        }

        $(".card").hover(function() {
          const cardId = $(this).attr("id");
          $(`#${cardId}`).click(function() {
            $(`#doctor-info-${cardId}`).toggle();
          });
        });
      });
    });
  });
});
