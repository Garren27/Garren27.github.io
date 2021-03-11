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
    	alert("Data was added successfully!");
  		}
  	});

	itemName.value = "";
	itemQuantity.value = "";
}


function displayItems(){

	var entries = firebase.database().ref('entries/');
	
	entries.on('value', (snapshot) => {
		ul.innerHTML = "";
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
      		var ul = document.getElementById("shoppingListItems");
      		var li = document.createElement("li");
  			li.appendChild(document.createTextNode(childData.name));
  			ul.appendChild(li);
  		});
  			
	});
	


}
