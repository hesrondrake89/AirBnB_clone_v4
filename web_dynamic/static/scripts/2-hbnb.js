$( document ).ready(function () {


    let ls_amen = [];
    $('input[type=checkbox]').change (function () {
      let name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
      ls_amen.push(name);
        } else {
      ls_amen = ls_amen.filter(amen => amen !== name);
        }
      $('.amenities h4').text(ls_amen.join(', '));
    });
  

    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      dataType: 'json',
      success: function (data) {
        if (data.status === 'OK') {
      $('#api_status').addClass('available');
        } else {
      $('#api_status').removeClass('available');
        }
      }
    });
  
  });
