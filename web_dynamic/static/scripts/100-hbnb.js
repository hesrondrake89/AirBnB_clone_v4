$(document).ready(function () {
  console.log('#### SCRIPT LOADED ####');
  const amenDict = {};
  
  $('.amenities input[type="checkbox"]').on('change', function () {
    if (this.checked) {
      console.log('#### Amenity checked! ####');
      console.log($(this).attr('data-name'));
      // add key/value to dict if id not already in it
      if (!($(this).attr('data-id') in amenDict)) {
        amenDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
    } else {
      console.log('#### Amenity UNchecked! ####');

     
      delete amenDict[$(this).attr('data-id')];
      delete amenDict[$(this).attr('data-name')];
    }

    
    $('.amenities').find('h4').text('');
    $('.amenities').find('h4').text(Object.values(amenDict).join(', '));
  });

  const cityDict = {};

  $('.locations ul.popover > ul input[type="checkbox"]').on('change', function () {
    if (this.checked) {
      console.log('#### City checked! ####');
      console.log($(this).attr('data-name'));
      // add key/value to dict if id not already in it
      if (!($(this).attr('data-id') in cityDict)) {
        cityDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
    } else {
      console.log('#### City UNchecked! ####');

    
      delete cityDict[$(this).attr('data-id')];
      delete cityDict[$(this).attr('data-name')];
    }
   
    $('.locations').find('h4').text('');
    $('.locations').find('h4').text(Object.values(cityDict).join(', '));
  });

  const stateDict = {};
 
  $('.locations ul.popover > li input[type="checkbox"]').on('change', function () {
    if (this.checked) {
      console.log('#### State checked! ####');
      console.log($(this).attr('data-name'));
      // add key/value to dict if id not already in it
      if (!($(this).attr('data-id') in stateDict)) {
        stateDict[$(this).attr('data-id')] = $(this).attr('data-name');
      }
    } else {
      console.log('#### State UNchecked! ####');

      
      delete stateDict[$(this).attr('data-id')];
      delete stateDict[$(this).attr('data-name')];
    }
  });

  /*
    ####################################################
  */

  
  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    console.log('#### API Status ####');
    if (data.status === 'OK') {
      console.log('API OK!!!!');
      $('#api_status').addClass('available');
    } else {
      console.log('API NOT OK :-(');
      $('#api_status').removeClass('available');
    }
  });

  /*
    ####################################################
  */

  
  function searchButton () {
    $('button').click(function () {
      console.log('button clicked');

      
      const ajaxDict = {};
      if (Object.keys(amenDict).length > 0 ||
Object.keys(cityDict).length > 0 ||
Object.keys(stateDict).length > 0) {
        ajaxDict.amenities = Object.keys(amenDict);
        ajaxDict.cities = Object.keys(cityDict);
        ajaxDict.states = Object.keys(stateDict);
      }
      console.log('#### ajaxDict ####');
      console.log(ajaxDict);

      const posting = $.ajax({
        async: false,
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify(ajaxDict),
        dataType: 'json',
        contentType: 'application/json',
        success: function (data) {
          console.log('#### POST Success! ####');
          console.log('#### Data ####');
          console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log('Error, status = ' + textStatus + ', ' + 'error thrown: ' + errorThrown
          );
        }
      });

      
      posting.done(function (data) {
        console.log('#### Peeling JSON onion ####');

       
        const el = $('section.places');

       
        el.empty();

        el.append('<h1>Places</h1>');

        $.each(data, function (i, place) {
          el.append(
            '<article>' +
              '<div class="title">' +
'<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' + '$' +
place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
              '<br />' +
              place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
'<br />' +
              place.number_rooms + ' Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
'<br />' +
              place.number_bathrooms + ' Bathrooms' +
              '</div>' +
              '</div>' +
              '<div class="description">' + '<br />' +
              place.description +
              '</div>' +
'</article>'
          );
          if (place.price_by_night > 99) {
            $('.container .places .price_by_night').css('font-size', '25px');
          }
        });
      });
    });
  }
  $(window).on('load', function () {
    searchButton();
    const ajaxDict = {};
    if (Object.keys(amenDict).length > 0 ||
Object.keys(cityDict).length > 0 ||
Object.keys(stateDict).length > 0) {
      ajaxDict.amenities = Object.keys(amenDict);
      ajaxDict.cities = Object.keys(cityDict);
      ajaxDict.states = Object.keys(stateDict);
    }
    console.log('#### ajaxDict ####');
    console.log(ajaxDict);

    const posting = $.ajax({
      async: false,
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify(ajaxDict),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        console.log('#### POST Success! ####');
        console.log('#### Data ####');
        console.log(data);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('Error, status = ' + textStatus + ', ' + 'error thrown: ' + errorThrown
        );
      }
    });

   
    posting.done(function (data) {
      console.log('#### Peeling JSON onion ####');

      
      const el = $('section.places');

      
      el.empty();

      el.append('<h1>Places</h1>');

      $.each(data, function (i, place) {
        el.append(
          '<article>' +
              '<div class="title">' +
'<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' + '$' + place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<i class="fa fa-users fa-3x" aria-hidden="true"></i>' +
              '<br />' +
              place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<i class="fa fa-bed fa-3x" aria-hidden="true"></i>' +
'<br />' +
              place.number_rooms + ' Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<i class="fa fa-bath fa-3x" aria-hidden="true"></i>' +
'<br />' +
              place.number_bathrooms + ' Bathrooms' +
              '</div>' +
              '</div>' +
              '<div class="description">' + '<br />' +
            place.description +
              '</div>' +
'</article>'
        );
        if (place.price_by_night > 99) {
          $('.container .places .price_by_night').css('font-size', '25px');
        }
      });
    });
  });
});
