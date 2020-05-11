


function handleLoginErr(err) {
    console.log(err);
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
}

function signUpUser(name, email, password, address) {

    // const userName = $("#inputName2").val().trim();
    // const email = $("#inputEmail2").val().trim();
    // const password = $("#inputPassword").val().trim();
    // const address = `${$("#inputAddress").val().trim} ${$("#inputCity").val().trim()}, ${$("#inputState")} ${$("#inputZip")}`;

    $.post("/api/signup", {
        name: name,
        email: email,
        password: password,
        address: address
    })
        .then(function(data) {
            alert("You have successfully signed up!");
        })
        .catch(handleLoginErr);
}

$("#regButton").on("click", event=>{
    event.preventDefault();
    var userAddress = `${$("#inputAddress").val().trim()} ${$("#inputCity").val().trim()}, ${$("#inputState").val().toString()} ${parseInt($("#inputZip").val())}`;

    const userData = {
        name: $("#inputName2").val().trim(),
        email: $("#inputEmail2").val().trim(),
        password: $("#inputPassword").val().trim(),
        address: userAddress
    };
    console.log(userData);

    if (!userData.name || !userData.email || !userData.password || !userData.address) {
        return;
    }

    signUpUser(userData.name, userData.email, userData.password, userData.address);
    $("#inputName2").val("");
    $("#inputEmail2").val("");
    $("#inputPassword").val("");
    $("#inputAddress").val("");
    $("#inputCity").val("");
    $("#inputState").val("");
    $("#inputZip").val("");
});

$("#viewPostButton").on("click", (event)=>{
    event.preventDefault();
    window.location.assign("/api/posts");
});


