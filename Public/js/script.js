var images = [];


$("#submitUpload").on("click", function (event) {
    event.preventDefault();

    // target the form
    const form = $("#uploadForm")[0];
    // collect all data from the form (text fields AND file inputs)
    const data = new FormData(form);

    $.ajax({
        type: "POST",
        enctype: "multipart/form-data", // IMPORTANT!!!
        url: "/upload",
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        timeout: 600000,
        success: function(response) {
            // celebrate a bit; the upload succeeded!
            alert("You have successfully uploaded an image!!!");
            // the back-end sends an object containing the AWS url for the newly-uploaded 
            // file and any additional data sent from the front-end via our AJAX post
            console.log(response);
        },
        error: function(err) {
            console.log(err);
        }
    }).then(data=>{
        images.push(data.url);
    });
});

$("#createPost").on("click", function(event){
    event.preventDefault();

    const title = $("#title").val().trim();
    const body = $("#body").val().trim();
    const zip = $("#zip").val().trim();

    const post = {
        title: title,
        body: body,
        zipCode: zip,
        images: images.join(", ")
    };

    $.get("/api/user_data").then(user=>{
        post.UserId = user.id;
        $.ajax("/api/post", {
            method: "POST",
            data: post
        }).then(function(){
            alert("Successfully created post");
        }).catch(err => alert("You must be signed in to create a post"))
            .then(
                $.ajax("/api/posts", {
                    method: "GET"
                })
            ).then(res=>{
                res.redirect("/viewPost");
            })
    });

});

$("#submitButton").on("click", event=>{
    event.preventDefault();
    $.ajax("/api/login", {
        type: "POST",
        data: {
            email: $("#loginEmail").val().trim(),
            password: $("#loginPassword").val().trim()
        }
    }).then(()=>{
        alert("You have successfully logged in");
        location.redirect= "/createPost";
    });
});