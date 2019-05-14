
function drawCarousel() {
    return`
   
    <section class="carousel">
        <div class="slideshow-container">
            <div class="mySlides fade">
                <a href="./asian_food.html">
                    <img class="slideshow-img"
                         src="./img/asian-monday.png"
                         style="width:100%">
                    <div class="text">Азиатская Кухня</div>
                </a>
            </div>
            <div class="mySlides fade">
                <a href="./italian_food.html">
                    <img class="slideshow-img"
                         src="./img/italian-friday.png"
                         style="width:100%">
                    <div class="text">Итальянская Кухня</div>
                </a>
            </div>
            <div class="mySlides fade">
                <a href="./ukrainian_food.html">
                    <img class="slideshow-img"
                         src="./img/ukrainian-wednesday.png"
                         style="width:100%">
                    <div class="text">Украинская Кухня</div>
                </a>
            </div>
            <div class="mySlides fade">
                <a href="./business_lunch.html">
                    <img class="slideshow-img"
                         src="./img/business-lunch.png"
                         style="width:100%">
                    <div class="text">Бизнес Ланчи</div>
                </a>
            </div>
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>
        </div>
        <div class="dots">
            <span class="dot dot1"></span>
            <span class="dot dot2"></span>
            <span class="dot dot3"></span>
            <span class="dot dot4"></span>
        </div>
    </section>
    <section>
        <div class="container">
            <h2 class="main-content ">Welcome to FoodHub!</h2></div>
    </section>
    `
}
var slideIndex = 0;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > x.length) {
        slideIndex = 1
    }

    x[slideIndex - 1].style.display = "block";
    setTimeout(carousel, 10000); // Change image every 2 seconds
}


function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

export function carouselOnload(){
    document.getElementById('carousel').innerHTML = `${drawCarousel()}`;
    carousel();
    showSlides(slideIndex);

    Array.from(document.querySelectorAll('a.next')).forEach(cls => {
        cls.addEventListener('click', function () {
            console.log('work')
            showSlides(slideIndex += 1);
        });
    });

    Array.from(document.querySelectorAll('a.prev')).forEach(cls => {
        cls.addEventListener('click', function () {
            showSlides(slideIndex += -1);
        });
    });
}

