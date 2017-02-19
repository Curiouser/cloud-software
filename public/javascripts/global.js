// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
    populateMap();
    $('#userList table tbody').on('click', 'td a.linkshowcharacters', populateCharacters);
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
    $('#btnAddUser').on('click', addUser);
});



// Functions =============================================================

function populateTable() {
    // Empty content string
    var tableContent = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/users', function(data) {
        // For each item in our JSON, add a table row and cells to the content string

        $.each(data.users, function(i, obj){
                tableContent += '<tr>';
                tableContent += '<td><a href="#" class="linkshowcharacters" rel="' + obj.id + '">' + obj.name + '</a></td>';
                tableContent += '<td>' + obj.email + '</td>';
                tableContent += '<td>' + obj.alliance_id + '</td>';
                tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + obj.id + '">delete</a></td>';
                tableContent += '</tr>';
            });
        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

function populateMap() {
    var origin = [48.792716,2.359279];
    var map = L.map('mapContent').setView(origin, 15);
    L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20
    }).addTo(map);

    // jQuery AJAX call for JSON
    $.getJSON( '/characters', function(data) {
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.characters, function(i, obj){
            L.marker([obj.position.x, obj.position.y]).addTo(map).bindPopup(obj.name);
        });
        // Inject the whole content string into our existing HTML table
    });
};

function populateCharacters(event) {

    var charactersContent ='';
    // jQuery AJAX call for JSON
    $.getJSON( '/users/' + $(this).attr('rel') + '/characters', function(data) {
        console.log(data.characters)
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data.characters, function(i, obj){
            console.log(obj)
                charactersContent += '<div>' + obj.name + ' ' + obj.class + ' '+ obj.position.x +' '+ obj.position.y +'</div>';
            });
        // Inject the whole content string into our existing HTML table
        $('#userInfo p').html(charactersContent);
    });
};

function deleteUser(event) {
    event.preventDefault(); // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?'); // Check and make sure the user confirmed
    if (confirmation === true) { // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/' + $(this).attr('rel')
        }).done(function( response ) {
            // Check for a successful response
            if (response.status == 'success') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            // Update the table
            populateTable();
        });
    }
    else {// If they said no to the confirm, do nothing
        return false;
    }
};

// Add User
function addUser(event) {
    event.preventDefault();// Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {// If it is, compile all user info into one object
        
        var user = {
            "user":{
                "name":$('#addUser fieldset input#inputUserName').val(),
                "email":$('#addUser fieldset input#inputUserEmail').val()
            }
        };
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            url: '/users',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(user)
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.status == 'success') {
                // Clear the form inputs
                $('#addUser fieldset input').val('');
                // Update the table
                populateTable();
            }
            else {// If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};