document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const inner = carousel.querySelector('.carousel-inner');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carousel.querySelector('.carousel-control.prev');
    const nextBtn = carousel.querySelector('.carousel-control.next');
    const indicatorsContainer = carousel.querySelector('.carousel-indicators');
    
    let currentIndex = 0;
    
    items.forEach((item, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('carousel-indicator');
        if (index === currentIndex) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = indicatorsContainer.querySelectorAll('.carousel-indicator');
    
    function goToSlide(index) {
        currentIndex = index;
        inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(currentIndex);
    });
    
    let carouselInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }, 5000);
    
    carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            goToSlide(currentIndex);
        }, 5000);
    });
});