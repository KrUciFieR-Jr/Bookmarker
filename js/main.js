//Listen for form submit
document.getElementById('myform').addEventListener('submit',saveBookmark);
document.getElementById('myform').addEventListener('fetch',fetchBookmarks);
 //Save Bookmark
 function saveBookmark(e){
 	console.log('It Works');
 	//get the values from form
 	var sitename = document.getElementById('site-name').value;
 	var siteurl  = document.getElementById('site-url').value;
 	var bookmark={
 		name:sitename,
 		url : siteurl
 	}
 	if(!validateForm(sitename,siteurl)){
 		return false;
 	}

 	if(localStorage.getItem('bookmarks') === null){
 		//init array
 		var bookmarks = [];
 		bookmarks.push(bookmark);
 		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 	}
 	else{
 		// Add the given Details to the bookmark array
 		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 		bookmarks.push(bookmark);
 		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 	}
 	//Clear the form for next submission
 	document.getElementById('myform').reset();
 	//Re-fetch Bookmarks
 	fetchBookmarks();
 	//Prvent form from submitting
 	e.preventDefault();

 }

 function fetchBookmarks(){
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 	//Get output id
 	var bookmarkResults = document.getElementById('results');
 	bookmarkResults.innerHTML = '';
 	for(var i=0;i<bookmarks.length;i++){
 		var name = bookmarks[i].name;
 		var url = bookmarks[i].url;
 		bookmarkResults.innerHTML += '<div class="well">'+ '<h3>' + name +'   '
 										+'<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+'  '+
 										'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+'<h3>'+'<div>';
 	}

 }

//Delete Bookmarks

 function deleteBookmark(url){
 	//Get the Bookmark from LocalStorage
 	//console.log(url);
 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
 	//Loop Through the bookmarks Array
 	for(var i =0;i<bookmarks.length;i++){
 			if(bookmarks[i].url == url){
 				//Remove from the array
 				bookmarks.splice(i,1);
 			}
 	}
 	//Re-Set it to the Local Storage
 	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
 	//Re-Fetch
 	fetchBookmarks();
 }
 //Function to validate the given form

 function validateForm(sitename,siteurl){
 	 	if(!sitename || !sitename)
 		{ alert("Enter the Blank Details");
 			return false;
 		}
 		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		if(!siteurl.match(regex)){
			alert('Enter an valid Url !');
			return false;
		}
		return true;
 }