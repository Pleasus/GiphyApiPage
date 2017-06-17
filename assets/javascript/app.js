$(document).ready(function(){
  console.log("jscript ready");
  $(".gif").on("click", function() {
    // Grabbing and storing the data-cartoon property value from the button
    $("#gifs-appear-here").empty();
    var cartoon = $(this).attr("data-cartoon");
    // Constructing a queryURL using the cartoon name
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
      cartoon + "&api_key=dc6zaTOxFJmzC&limit=15";
    // create a variable for the cartoons array
    var cartoons = ["The Simpsons", "Bojack Horseman", "Looney Toons", "Mickey Mouse"];
    // create a variable that holds the state of the gif
    var state = $(this).attr("data-state");
    // Performing an AJAX request with the queryURL    
    $.ajax({
        url: queryURL,
        method: "GET"
    })
      // After data comes back from the request
      .done(function(response) {
        console.log(queryURL);
        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        // Looping through each result item
        for (var i = 0; i < results.length; i++) {
          // Creating and storing a div tag
          var cartoonDiv = $("<div>");
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);
          // Creating and storing an image tag
          var cartoonImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          cartoonImage.attr("src", results[i].images.fixed_height.url);
          // Appending the paragraph and image tag to the cartoonDiv
          cartoonDiv.addClass("imageBlock");
          cartoonDiv.append(cartoonImage);
          cartoonDiv.append(p);
          // code that animates when clicked if not animated, and vice versa
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
          // Prependng the cartoonDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(cartoonDiv);
        }

      });
      
      function renderButtons() {
        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#cartoonButtons").empty();
        // Looping through the array of movies
        for (var i = 0; i < cartoons.length; i++) {
          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of gif to our button
          a.addClass("btn btn-default gif");
          // Adding a data-attribute
          a.attr("data-cartoon", cartoons[i]);
          // Providing the initial button text
          a.text(cartoon[i]);
          // Adding the button to the buttons-view div
          $("#cartoonButtons").append(a);
        }
      }

      $("#addCartoon").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var cartoonText = $("#cartoon-input").val().trim();
        // Adding movie from the textbox to our array
        cartoons.push(cartoonText);
        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });
  });
});