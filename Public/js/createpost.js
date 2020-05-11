// $("#createPost").on("click", function(event){
//     event.preventDefault();
//     const title = $("#title").val().trim();
//     const body = $("#body").val().trim();
//     const zip = $("#zip").val().trim();

//     const post = {
//         title: title,
//         body: body,
//         zipCode: zip
//     };
//     $.ajax("/api/user_data", {
//         type: "GET"
//     }
//     ).then( function(user){
//         post.UserId = user.id;
//         $.ajax("/api/post", {
//             method: "POST",
//             data: post
//         }).then(function(response){
//             console.log("Successfully created post");
//             res.redirect("/viewPost");
//             console.log(response)
//         });
//     });


// });