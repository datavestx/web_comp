document.getElementById("readMoreBtn").addEventListener("click", function() {
    let moreText = document.getElementById("moreText");
    let fadeEffect = document.getElementById("fadeEffect");

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "block";
        fadeEffect.style.display = "none";
        this.innerText = "Read Less";
    } else {
        moreText.style.display = "none";
        fadeEffect.style.display = "block";
        this.innerText = "Read More";
    }
});

