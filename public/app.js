//ARTICLES************************************************ARTICLES***************************************************
//pull articles from database and display on DOM
$.getJSON("/articles", function (data) {
  for (var i = 0; i < data.length; i++) {
    // Display each article card
    $("#articles").append('<div class="card" id="articleCard"><div class="card-body"><h5 class="card-title">' + data[i].title + '</h5><p class="card-text">' + data[i].summary + '</p><a class="btn btn-success" id="' + data[i]._id + '">Add Note</a><a class="btn btn-info save" data-id="' + data[i]._id + '">Save Article</a><a href="' + data[i].link + '" class="btn btn-warning">Go to Article</a></div></div>');
  }
});

//pull SAVED articles and display on DOM
$.getJSON("/save", function (data) {
  for (var i = 0; i < data.length; i++) {
    // Display each article card
    $("#savedArticles").append('<div class="card" id="articleCard"><div class="card-body"><h5 class="card-title">' + data[i].title + '</h5><p class="card-text">' + data[i].summary + '</p><a class="btn btn-success" id="' + data[i]._id + '">Add Note</a><a class="btn btn-danger delete" data-id="' + data[i]._id + '">Delete Article</a><a href="' + data[i].link + '" class="btn btn-warning">Go to Article</a></div></div>');
  }
});

//NOTES **************************************************NOTES****************************************************
// Whenever someone clicks to add a note
$(document).on("click", ".btn-success", function () {
  // Empty note section
  $("#notes").empty();
  var thisId = (this.id);
  $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    .then(function (data) {
      $("#notes").append("<h3>" + data.title + "</h3>");
      //title
      $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title'>");
      //note
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Add Note Text Here'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");
  $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
    .then(function (data) {
      // Empty the notes section on submit 
      $("#notes").empty();
    });

  // reset data entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

//SAVED **************************************************SAVED****************************************************
// When you click the savearticle button
// Add article to saved
$(document).on("click", ".save", function () {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/save/" + thisId
  }).then(function (data) {
    for (var i = 0; i < data.length; i++) {
      // Display each article card
      $("#savedArticles").append('<div class="card" id="articleCard"><div class="card-body"><h5 class="card-title">' + data[i].title + '</h5><p class="card-text">' + data[i].summary + '</p><a class="btn btn-success" id="' + data[i]._id + '">Add Note</a><a class="btn btn-info save" id="' + data[i]._id + '">Save Article</a><a href="' + data[i].link + '" class="btn btn-warning">Go to Article</a></div></div>');
    }
  })

  $(this).html("Saved!");
});

//Delete Saved
