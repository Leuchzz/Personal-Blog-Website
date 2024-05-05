// Get the list from localStorage or create an empty array if it doesn't exist
var list = JSON.parse(localStorage.getItem('list')) || [];

// Populate the list items from the stored data
for (var i = 0; i < list.length; i++) {
  var li = document.createElement("li");
  var t = document.createTextNode(list[i].value);
  li.appendChild(t);

  // Set display style to 'none' if the item was previously hidden
  if (list[i].hidden) {
    li.style.display = 'none';
  }

  // Add 'checked' class if the item was previously checked
  if (list[i].checked) {
    li.classList.add('checked');
  }

  // Create an edit button
  var editSpan = document.createElement("SPAN");
  var editTxt = document.createTextNode("\u270E");
  editSpan.className = "edit";
  editSpan.appendChild(editTxt);
  li.appendChild(editSpan);

  // Create a close button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Append the list item to the unordered list
  document.getElementById("myUL").appendChild(li);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
for (var i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    updateLocalStorage();
  }
}

// Click on an edit button to edit the current list item
var edit = document.getElementsByClassName("edit");
for (var i = 0; i < edit.length; i++) {
  edit[i].onclick = function() {
    var li = this.parentElement;
    var text = li.firstChild.nodeValue;
    var newText = prompt("Edit your item:", text);
    if (newText !== null) {
      li.firstChild.nodeValue = newText;
      updateLocalStorage();
    }
  }
}

// Add a "checked" symbol when clicking on a list item
var ul = document.getElementById('myUL');
ul.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
  updateLocalStorage();
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
    updateLocalStorage();
  }
  document.getElementById("myInput").value = "";

  // Create an edit button for the new list item
  var editSpan = document.createElement("SPAN");
  var editTxt = document.createTextNode("\u270E");
  editSpan.className = "edit";
  editSpan.appendChild(editTxt);
  li.appendChild(editSpan);

  // Create a close button for the new list item
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  // Add click event listeners to the new edit button
  editSpan.onclick = function() {
    var li = this.parentElement;
    var text = li.firstChild.nodeValue;
    var newText = prompt("Edit your item:", text);
    if (newText !== null) {
      li.firstChild.nodeValue = newText;
      updateLocalStorage();
    }
  };

  // Add click event listeners to the new close button
  span.onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
    updateLocalStorage();
  };
}

// Update the localStorage with the current list items
function updateLocalStorage() {
  var items = document.querySelectorAll('#myUL li');
  var updatedList = [];
  items.forEach(function(item) {
    updatedList.push({ 
      value: item.firstChild.nodeValue, 
      checked: item.classList.contains('checked'),
      hidden: item.style.display === 'none'
    });
  });
  localStorage.setItem('list', JSON.stringify(updatedList));
}
