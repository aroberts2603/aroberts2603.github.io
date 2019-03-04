grayVal = 51;

window.addEventListener("scroll", function(e) {
	if(window.scrollY > 0) {
		if(window.scrollY <= 180) {
			percent = window.scrollY/180;
			document.getElementById("navbar").style.backgroundColor = "rgba("+grayVal+","+grayVal+","+grayVal+","+percent+")";
		} else {
			document.getElementById("navbar").style.backgroundColor = "rgba("+grayVal+","+grayVal+","+grayVal+",1)";
		}
	} else {
		document.getElementById("navbar").style.backgroundColor = "rgba("+grayVal+","+grayVal+","+grayVal+",0)";
		document.getElementById("nlc").style.color = "white";
	}
});