var payments = [];
$(document).ready(function() {
	$('#pay_form').show();
	$('#update_form').hide();
	getPayments();
	getAppos();
});

function pay() {
	var appoId = $('#new_appo').val();
	$.ajax({
		type : "GET",
		url : '/hc/api/appoinment/pay/' + appoId,
		dataType : 'json',
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},
		success : function(data) {
			if (data.status) {
				alert('Paid');
				getPayments();
				getAppos()
			}

		}
	});
}
var toUpdate=null;
function update(id){
	for (var i=0;i<payments.length;i++){
		if(payments[i].id==id){
			
			toUpdate=payments[i];
			$('#pay_form').hide();
			$('#update_form').show();
			$('#new_appo').val(toUpdate.appinment_id);
			$('#update_date').val(toUpdate.date);
			$('#update_price').val(toUpdate.price);
		}
	}
	//getAppos();
}

function doUpdate(){
	
	var date=$('#update_date').val();
	var price=$('#update_price').val();
	var appo=$('#update_appo').val();
	
	$.ajax({
		type : "PUT",
		url : '/hc/api/payments/update/'+toUpdate.id,
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},
		data: JSON.stringify({date:date,price:price,appoId:appo}),
		success : function(data) {
		
			 if(data.status){
				 alert('updated');
					getPayments();
					getAppos();
					$('#pay_form').show();
					$('#update_form').hide();
			 }
		}
	});
}
function getAppos() {
	$.ajax({
		type : "GET",
		url : '/hc/api/appoinment/all',
		dataType : 'json',
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},
		success : function(data) {
		
			$('#new_appo').empty();
			$('#update_appo').empty();
			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				 if (d.paid == 0) {
					$('#new_appo').append(
							' <option value="' + d.id + '">' + d.date + ' - '
									+ d.patientName + ' - '
									+ d.sessionDescription + '</option>');
			 	}
				$('#update_appo').append(
						' <option value="' + d.id + '">' + d.date + ' - '
								+ d.patientName + ' - ' + d.sessionDescription
								+ '</option>');
			}

		}
	});
}
function cancel(){
	toUpdate=null;
	$('#pay_form').show();
	$('#update_form').hide();
}

function del(id) {
	$.ajax({
		type : "DELETE",
		url : '/hc/api/payments/delete/' + id,
		dataType : 'json',
		contentType : "application/json; charset=utf-8",
		headers : {
			"Authorization" : "Basic "
					+ btoa(localStorage.getItem('username') + ":"
							+ localStorage.getItem('password'))
		},

		success : function(data) {
			if (data.status) {
				alert('Deleted');
				getPayments();
				getAppos();
			 
			}
		}
	});
}
function getPayments() {

	$
			.ajax({
				type : "GET",
				url : '/hc/api/payments/all',
				dataType : 'json',
				headers : {
					"Authorization" : "Basic "
							+ btoa(localStorage.getItem('username') + ":"
									+ localStorage.getItem('password'))
				},
				success : function(data) {
					payments = data;
					$('#table_container').empty();
					const trs = '<tr>' + '<td> @id </td>' + '<td> @date </td>'
							+ '<td> @sessionDate </td>'
							+ '<td> @sessionDescription </td>'
							+ '<td> @user </td>'  + '<td> @doctor </td>'+ '<td> @price </td>'
							+ '<td> @action </td>' + '</tr>';
					const btnUpdate = '<button type="button" style="margin:5px" class="btn btn-warning" onClick="update( @id )">Update</button>';
					const btnDelete = '<button type="button" style="margin:5px" class="btn btn-danger" onClick="del( @id )">Delete</button>';
					for (var i = 0; i < data.length; i++) {
						var d = data[i];
						var actions = btnUpdate.replace('@id', d.id)
								+ btnDelete.replace('@id', d.id);
						var tr = trs.replace('@id', d.id).replace('@date',
								d.date).replace('@sessionDate', d.sessionDate)
								.replace('@sessionDescription',
										d.sessionDescription).replace('@user',
										d.user).replace('@doctor', d.doctor)
								.replace('@action', actions).replace('@price',d.price)

						$('#table_container').append(tr);
					}

				}
			});
}