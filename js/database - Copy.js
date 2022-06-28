function showForm(){
	document.getElementById("createItem").style.display = '';
}


function hideForm(){
	document.getElementById("createItem").style.display="none";
}


function addItem(){
	var itemName = document.getElementById("itemName");
	var itemQuantity = document.getElementById("itemQuantity");

	if (itemName.value === "" || itemQuantity.value === ""){
		alert("Please enter a Name and a Quantity");
	} 
	else {
	  	var newPostKey = firebase.database().ref("entries/").push().key;
		firebase.database().ref("entries/" + newPostKey).set({
			name : itemName.value,
			quantity : itemQuantity.value
		}, (error) => {
	  		if (error) {
	    	// The write failed...
	    	alert("There was an error adding the item")
	  		} else {
	    	// Data saved successfully!
	    	console.log("Data was added successfully!");
	  		}
	  	});
	}

	itemName.value = "";
	itemQuantity.value = "";
}


function displayItems(){

	var entries = firebase.database().ref('entries/');
	
	entries.on('value', (snapshot) => {
		// Clear the current table contents
		const dataTable = document.getElementById("dataTable");
		dataTable.innerHTML = "";

		// Create a new table heading row
		const headingTableRow = document.createElement("tr");

		const headingName = document.createElement("th");
		headingName.appendChild(document.createTextNode("Name"));
  		headingTableRow.appendChild(headingName);

  		const headingQuantity = document.createElement("th");
		headingQuantity.appendChild(document.createTextNode("Quantity"));
  		headingTableRow.appendChild(headingQuantity);

  		const headingDelBtn = document.createElement("th");
  		headingDelBtn.appendChild(document.createTextNode("Delete"));
  		headingTableRow.appendChild(headingDelBtn);

  		// <td> is nested inside a <tr> which is nested inside a <table>
  		dataTable.appendChild(headingTableRow);

  		const data = snapshot.val();	  		
  		var numberOfChildren = snapshot.numChildren();
  		
  		// Using the forEach method provided in the Firebase documentation, we can access each child of the original snapshot
  		snapshot.forEach(function(childSnapshot) {

  			// get out the key and the JSON data of the child
      		var key = childSnapshot.key;
      		var childData = childSnapshot.val();

      		const dataTableRow = document.createElement("tr");


      		// Add a new row per item to the table
      		// Add Item names
      		var itemsEntry = document.createElement("td");
      		itemsEntry.className = "shoppingListEntry";
  			itemsEntry.appendChild(document.createTextNode(childData.name));
  			dataTableRow.appendChild(itemsEntry);

  			// Add item quanities
  			var quantityEntry = document.createElement("td");
  			quantityEntry.className = "shoppingListEntry";
  			quantityEntry.appendChild(document.createTextNode(childData.quantity));
  			dataTableRow.appendChild(quantityEntry);

  			// Add Delete buttons
  			var delButton = document.createElement("button");
  			delButton.innerHTML = "x";
  			delButton.className = "deleteBtn";
  			delButton.setAttribute("onclick", "deleteEntry(this.id)");
  			delButton.setAttribute("id", key);
  			var delButtonEntry = document.createElement("td");
  			delButtonEntry.className = "shoppingListEntry";
  			delButtonEntry.appendChild(delButton);
  			dataTableRow.appendChild(delButtonEntry);

  			dataTable.appendChild(dataTableRow);


  		});
  			
	});
	
}

function deleteEntry(key){
	console.log(key);
	// Remove entry with specified key from Firebase
	firebase.database().ref('entries/' + key).set(
		null
	);
}
