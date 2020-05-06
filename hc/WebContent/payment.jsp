<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<script src="https://code.jquery.com/jquery-3.5.0.min.js"
	integrity="sha256-xNzN2a4ltkB44Mc/Jz3pT4iU1cmeR0FkXs4pru/JxaQ="
	crossorigin="anonymous"></script>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
	integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
	crossorigin="anonymous">
	<style>
	button{
	margin: 5px;
	}
	</style>
</head>
<body>
<section id="pay_form">
	<h2>Make new payment</h2>
<div class="form-group">
			<label>Appoinment</label> <select id="new_appo"></select><button type="button" onclick="pay()" id="btn_update"
			class="btn btn-primary">Pay</button>
		</div>
</section>
	<section id="update_form">
		<h2>Update payment</h2>
		<div class="form-group">
			<label>Appoinment</label> <select id="update_appo"></select>
		</div>
		<div class="form-group">
			<label>Date</label> <input type="date" id="update_date">
		</div>
		<div class="form-group">
			<label>Price</label> <input type="number" id="update_price">
		</div>	 
		<button type="button" onclick="doUpdate()" id="btn_update"
			class="btn btn-primary">Update</button>
		<button type="button" onclick="cancel()" id="btn_cancel"
			class="btn btn-danger">Cancel</button>
	</section>

	<table class="table" style="width: 900px">
		<thead>
			<tr>
				<th>#</th>
				<th>Date</th>
				<th>Session Date</th>
				<th>Session</th>
				<th>Patient</th>
				<th>Doctor</th>
				<th>Price</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody id="table_container">
		</tbody>
	</table>
	<script src="payment.js"></script>
</body>
</html>