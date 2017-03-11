var topics = ["unicorns", "rainbows", "mermaids", "Nene Leakes", "fairies", "sun", "tacos", "twirling","cookies", "cupcakes", "cake", "Serena Williams", "sushi", "Apple Jacks", "Cookie Crisp", "Alanis Morrissette", "ice cream", "Skittles", "gummy bears", "Gwen Stefani", "gummy worms","cupid", "Lisa Frank"];

$("document").ready(function(){ 
for (var i=0; i < topics.length; i++){

  addButton(topics[i]);

}

$('#addGif').on("click", function(event){
   var buttonLabel = $("#input").val();
   addButton(buttonLabel);
});

$("body").on("click", ".gif", function() {

 changeGifState ($(this));

});

$("body").on("click", ".gifButton", function() {
  
  var fItem = $(this).text();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q="' + fItem + '"&api_key=dc6zaTOxFJmzC&limit=15';
    $("#fantasyResults").empty();

      $.ajax({
         url: queryURL, 
         method:"GET",
    success: function(response) {
       installGifs(response.data);
        }    
    });
    

});

function changeGifState(img){
      var state = img.attr("data-state");
   
      if (state === "still") {
        img.attr("src", img.attr("data-animate"));
        img.attr("data-state", "animate");
      } else {
        img.attr("src", img.attr("data-still"));
        img.attr("data-state", "still");
      }
}

function addButton(label){
  var button = $("<button>");
  button.attr("type", "button");
  button.text(label).addClass("gifButton");
  $("#fButton").append(button);
}

function installGifs(results){
          for (var i = 0; i < results.length; i++) {
            var fairyDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);

            var fantasyImage = $("<img>");
            fantasyImage.addClass("gif")
            .attr("src", results[i].images.fixed_height_small.url)
            .attr("data-animate", results[i].images.fixed_height_small.url)
            .attr("data-still", results[i].images.fixed_height_small_still.url)
            .attr("data-state", "animate");
            fairyDiv.append(p);
            fairyDiv.append(fantasyImage);

            $("#fantasyResults").append(fairyDiv);
          }

 }
 

 });
