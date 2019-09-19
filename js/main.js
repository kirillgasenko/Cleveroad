var update   = null,
    weekday  = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    monthday = ["Jan", "Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];

function example(){

  /* 
  * Get information about where is ISS now
  */
  $.getJSON( "http://api.open-notify.org/iss-now.json", function( data ) {
    var items = [];
    place = data.iss_position;
    $('.place-inner').empty();
    $.each(place, function( key, val ) {
      items.push( "<span id='" + key + "' class='" + key + "' >" + key + ': ' + val + "</span>" );
    });

    $( "<div/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( ".place-inner" );
    /*
    * Google map
    */
    myLatLng = {lat: +(data.iss_position.latitude), lng: +(data.iss_position.longitude)};

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      size:new google.maps.Size(580,440),
      center: myLatLng
    });

    marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
    });
  });

  /* 
  * Get information about astronauts in ISS
  */

  $.getJSON( "http://api.open-notify.org/astros.json", function( data ) {
    
    var people = data.people;
    var number = data.number;
    console.log(data.number)
    $(".people-inner").empty();
    $(".people-bottom").empty();
    $.each(people, function( key, val ) {
      $(".people-inner").append( "<span id='" + key + "' class='" + key + "' >"  + val.name + "</span>" );
      
    });
    $(".people-bottom").append( "<span>"+ "Total amount: "  + number + " people on ISS" +  "</span>" );
  });
  
  /* 
  * Add time
  */
  var time = $(".hours"),
      day = $(".day");
      year = $(".year")
      date = new Date(),
      days = date.getDate(),
      months = date.getMonth(),
      years = date.getFullYear();

  $('.hours').empty();
  $('.day').empty();
  $('.year').empty();
  time.append(checkTime(date.getHours()) + ":" +  checkTime(date.getMinutes()));
  day.append(weekday[date.getDay()]);
  year.append(days + "  " + monthday[months] + "  " + years);

  /* 
  * Call the recursive timeout to update info every 5 sec
  */ 
  clearTimeout(update);

  update = setTimeout(example, 5000)
}

/* 
* Add 0 before single number
*/ 
function checkTime(i){
  return (i < 10) ? "0" + i : i;
}

example();