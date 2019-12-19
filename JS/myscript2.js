$(document).ready(function() {
    
  $(function() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth();
      var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var yyyy = today.getFullYear();
      today = dd + ' ' + month[mm] + ' ' + yyyy;
      $("#currentDate").text("Today, " + today);
    });
    $(".intro2").hide();
    $(".forecast").hide();
   
    $('#send').click(function(e) {
      e.preventDefault();
      var city = $('#city_value').val();
      if (city !== '') {
        $.ajax({
          type: 'GET',
          url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=95bc8c8128e7f4f0d19b3342b0ce2095&units=metric',
          dataType: 'jsonp',
          success: function(json) {
            $(".intro").hide(2000);
            $(".intro2").show();
            $(".main").show();
            var icon = findIcon(json.weather[0].icon);
            console.log(icon);
            setIcon(icon, document.querySelector('.mainIcon'));
            $('#weather').empty().text(json.weather[0].description);
            $("#city").empty().text(json.name);
            $('#temperature').empty().text(json.main.temp + "°C");
            $('#pressure.data').empty().append("Pressure: " + json.main.pressure + " hPa");
            $('#humidity.data').empty().append("Humidity: " + json.main.humidity + " %");
            $('#minTemp.data').empty().append("Min temperature: " + json.main.temp_min + "°C");
            $('#maxTemp.data').empty().append("Max temperature: " + json.main.temp_max + "°C");
            $('#windSpeed.data').empty().append("Wind Speed: " + json.wind.speed + " m/s");
            $('#windDirection.data').empty().append("Wind Direction: " + json.wind.deg + "°");
            fiveDayForecast(city);
          }
        })
      } else $("#city_value").attr("placeholder", "Please enter field")
    });
   
    function fiveDayForecast(city){
      $.ajax({
        type: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=95bc8c8128e7f4f0d19b3342b0ce2095&units=metric',
        dataType: 'jsonp',
        success: function(json) {
          $(".forecast").css({"height": "30%"});
          $(".forecast").show();
          var k = 0;
          var b = 0;
          var today = new Date();
          var day = today.getDay();
          var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
          for (var i = 6; i < json.list.length; i += 8) {
              k++;
              b = day + k;
              if (b>=7){b = b-7};
              var icon = findIcon(json.list[i].weather[0].icon);
              var iconClass = '.icon' + k;
              setIcon(icon, document.querySelector(iconClass));
              $('#description.data'+k).empty().append(json.list[i].weather[0].description).css({'font-weight': 'bold'});
              $('#dayofweek.data'+k).empty().append(days[(b)]).css({'font-weight': 'bold'});
              $('#pressure.data'+k).empty().append("Pressure: " + json.list[i].main.pressure + " hPa");
              $('#humidity.data'+k).empty().append("Humidity: " + json.list[i].main.humidity + " %");
              $('#minTemp.data'+k).empty().append("Min temperature: " + json.list[i].main.temp_min + "°C");
              $('#maxTemp.data'+k).empty().append("Max temperature: " + json.list[i].main.temp_max + "°C");
              $('#windSpeed.data'+k).empty().append("Wind Speed: " + json.list[i].wind.speed + " m/s");
              $('#windDirection.data'+k).empty().append("Wind Direction: " + json.list[i].wind.deg + "°");
          }
          
          $("#nextFiveDays").empty().append("5 Day Forecast for " + json.city.name + "  (click for detailed forecast)");
          
        }
      })
    };

    $(".intro2").click(function (e){
      e.preventDefault();
      $(".intro").show(2000);
      $(".intro2").hide(2000);
      $(".main").hide(2000);
      $(".forecast").hide(2000);
});

$(".forecast").click(function (e){
  e.preventDefault();
  if ($(".main").is(":hidden")) {
  $(".main").show(2000);
  $(".forecast").animate({"height": "30%"},2000);
}else {$(".main").hide(2000);
$(".forecast").animate({"height": "80%"},2000);
}
});

    function setIcon(icon, iconClass){
        const skycons = new Skycons({"monochrome": false});
        skycons.play();
        return skycons.set(iconClass, Skycons[icon]);
    }

    function findIcon(icon) {
    let selectedIcon;
    switch (icon) {
      case '01d':
        selectedIcon = "CLEAR_DAY"
        break;
      case '01n':
        selectedIcon = "CLEAR_DAY"
        break;
      case '02d':
      case '02n':
        selectedIcon = "PARTLY_CLOUDY_DAY"
        break;
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        selectedIcon = "CLOUDY"
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        selectedIcon = "RAIN"
        break;
      case '11d':
      case '11n':
        selectedIcon = "THUNDER"
        break;
      case '13d':
      case '13n':
        selectedIcon = "SNOW"
        break;
      case '50d':
      case '50n':
        selectedIcon = "FOG"
        break;
      default:
        selectedIcon = "WIND"
    }
    return selectedIcon;
  }
  });

  