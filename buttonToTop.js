document.addEventListener('DOMContentLoaded', function() {
// Получаем кнопку
    var backToTopBtn = document.getElementById("backToTopBtn");
    console.log(backToTopBtn);

    // Когда пользователь прокручивает страницу вниз на 20px, показать кнопку
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }

    // Когда пользователь нажимает на кнопку, прокрутить вверх
    backToTopBtn.onclick = function() {topFunction()};

    function topFunction() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Плавная прокрутка
        });
    }
});
