document.addEventListener("scroll", function(e) {
    checkScroll(window.scrollY);
    parallax(window.scrollY);
})

function parallax(value) {
    var para = (value*-0.29)-60;
    document.getElementById("bg-code").style.marginTop = para+"px";
}

function checkScroll(value) {
    if(value >= 300) {
        console.log("hey");
        document.getElementById("left-1").style.transform = "scale(1)";
    }
}