// $(document).ready(function(){
//   $.ajax({
//     url:'http://localhost:1337/api/articles'
//   }).done(function(data) {
//     $.each(data,function(index,article){
//       index += 1;
//       var string = '';
//       string += '<a href="http://localhost:1337/articles/' + index + '">'
//       string += '<div class="col-md-4 articles">';
//       string += '<img src= '+ article.image +' />'
//       string +=   '<p class="text-center img">'
//       string +=     article.title;
//       string +=   '</p>';
//       string += '</div>';
//       string += '</a>'
//       $('#articles').append(string);
//       string = ''
//     })
//   })
// });

$(document).ready(function(){
  $.ajax({
    url:'/api/articles'
  }).done(function(data) {
    $.each(data,function(index,article){
      var hometemplate  =  $("#hometemplate").html();
      var template = Handlebars.compile(hometemplate);
      var html = template(data[index]);
      $('.row').append(html)
    })
  })
});
