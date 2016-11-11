function openBox(id) {
	var object = document.getElementById(id);
	if(object.style.display == 'flex')
	{
		document.getElementById(id).style.display = 'none';
	}
	else {
		document.getElementById(id).style.display = 'flex';
	}
}

// $(function() {

// 	var $orders = $('#orders');

// 	$.ajax({
// 		type: 'GET',
// 		url: 'http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1',
// 		// request: function(data) {
// 		// 	$.each(data, function(i, item) {
// 		// 		$data.append('<li>ASDSD</li>');
// 		// 	});
// 		// }
// 		success: function(data) {
// 			$.each(data, function(i, order) {
// 				$orders.append('<li>asdasdasd</li>');
// 			});
// 		}
// 	});
// });

requestURL = "https://maps.googleapis.com/maps/api/directions/json?origin=Brooklyn?";

$.ajax({
            url: requestURL, 
            type: "GET",   
            dataType: 'jsonp',
            cache: false,
            success: function(response){                          
                alert("HELLO");                   
            }           
        }); 