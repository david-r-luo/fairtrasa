var config = {
	apiKey: "AIzaSyAZ23jgIK18y_NOiWbEMHE8CkRKWpXetzE",
    authDomain: "farmer-dashboard.firebaseapp.com",
    databaseURL: "https://farmer-dashboard.firebaseio.com",
    projectId: "farmer-dashboard",
    storageBucket: "farmer-dashboard.appspot.com",
    messagingSenderId: "741303749626"
};

firebase.initializeApp(config);

var databaseRef = firebase.database().ref();

var contractsRef = firebase.database().ref("contracts");

//var testRef = databaseRef.child("key");

//databaseRef.set({key: "value"});
// testRef.on("value", function(snapshot) {
//   console.log(snapshot.val());
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

function funct1(evt) {
	var vendor_address = document.getElementById("vendor-address").value;
	var product = document.getElementById("product").value;
	var quantity = document.getElementById("quantity").value;
	var value_per_product = document.getElementById("value-per-product").value;
	var contract_expiry_date = document.getElementById("contract-expiry-date").value;

	contractsRef.push({
		vendor_address: vendor_address,
		product: product,
		quantity: quantity,
		value_per_product: value_per_product,
		contract_expiry_date: contract_expiry_date})

	evt.preventDefault();
	window.location.replace("manage_contracts.html");
}

var submit = document.getElementsByClassName('submit')[0];

submit.onclick = funct1;