function showForm(){
	document.getElementById("createItem").style.display = '';
}


function hideForm(){
	document.getElementById("createItem").style.display="none";
}


function addItem(){
	var itemName = document.getElementById("itemName");
	var itemQuantity = document.getElementById("itemQuantity");

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

	itemName.value = "";
	itemQuantity.value = "";
}


function displayItems(){

	var entries = firebase.database().ref('entries/');
	
	entries.on('value', (snapshot) => {
		var shoppingListItems = document.getElementById("shoppingListItems");
		shoppingListItems.innerHTML = "";

		var shoppingListQuantities = document.getElementById("shoppingListQuantities");
		shoppingListQuantities.innerHTML = "";

		var deleteButtons = document.getElementById("deleteButtonsList");
		deleteButtons.innerHTML = "";

  		const data = snapshot.val();
  		console.log(data);
  		
  		var numberOfChildren = snapshot.numChildren();
  		console.log(numberOfChildren);

  		// Using the forEach method provided in the Firebase documentation, we can access each child of the original snapshot
  		snapshot.forEach(function(childSnapshot) {

  			// get out the key and the JSON data of the child
      		var key = childSnapshot.key;
      		var childData = childSnapshot.val();

      		console.log(childData);
      		console.log(childData.name);

      		// Add it to the webpage
      		// Add Item names
      		var itemsListEntry = document.createElement("li");
  			itemsListEntry.appendChild(document.createTextNode(childData.name));
  			shoppingListItems.appendChild(itemsListEntry);

  			// Add item quanities
  			var quantityListEntry = document.createElement("li");
  			quantityListEntry.appendChild(document.createTextNode(childData.quantity));
  			shoppingListQuantities.appendChild(quantityListEntry);

  			// Add Delete buttons
  			var delButton = document.createElement("button");
  			delButton.innerHTML = "x";
  			delButton.className = "deleteBtn";
  			delButton.setAttribute("onclick", "deleteEntry(this.id)");
  			delButton.setAttribute("id", key);
  			var delButtonListEntry = document.createElement("li");
  			delButtonListEntry.appendChild(delButton);
  			deleteButtons.appendChild(delButtonListEntry);



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
