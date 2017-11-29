function addRow(key, rec, stat, prod, quant, val, s_e) {
	var table_body = document.getElementById("table-body");

	var new_row = document.createElement("tr");

	var recipient = document.createElement("td");
	recipient.innerHTML = rec;
	var order_status = document.createElement("td");
	order_status.innerHTML = stat;
	var product = document.createElement("td");
	product.innerHTML = prod;
	var quantity = document.createElement("td");
	quantity.innerHTML = quant;
	var value = document.createElement("td");
	value.innerHTML = val;
	var start_expiration = document.createElement("td");
	start_expiration.innerHTML = s_e;

	new_row.appendChild(recipient);
	new_row.appendChild(order_status);
	new_row.appendChild(product);
	new_row.appendChild(quantity);
	new_row.appendChild(value);
	new_row.appendChild(start_expiration);

	new_row.setAttribute("id", key);

	new_row.setAttribute("onclick", "doubleclick(this, function(){}, removeItem)");

	table_body.insertBefore(new_row, table_body.firstChild);
}

function doubleclick(el, onsingle, ondouble) {
    if (el.getAttribute("data-dblclick") == null) {
        el.setAttribute("data-dblclick", 1);
            setTimeout(function () {
                if (el.getAttribute("data-dblclick") == 1) {
                    onsingle();
                }
            el.removeAttribute("data-dblclick");
        }, 200);
	} else {
		el.removeAttribute("data-dblclick");
		ondouble(el.id);
	}
}

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

function removeItem(id) {
	contractsRef.child(id).remove();
	location.reload();
}

contractsRef.once("value").then(function(snapshot) {
	snapshot.forEach(function(childSnapshot) {
		var key = childSnapshot.getKey()
		var vendor_address = childSnapshot.val().vendor_address;
		var order_status = "In Production";
		var product = childSnapshot.val().product;
		var quantity = childSnapshot.val().quantity;
		var value = "$" + childSnapshot.val().value_per_product * quantity;
		var start_expiration = "04/17/2017 - " + childSnapshot.val().contract_expiry_date;
		
		addRow(key, vendor_address, order_status, product, quantity, value, start_expiration);
	});
});