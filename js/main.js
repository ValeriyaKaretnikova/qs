window.addEventListener('load', function (e) {

    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('nav').classList.toggle('show-nav');
        document.querySelector('.menu-toggle').classList.toggle('open');
        document.body.classList.toggle('lock');
    });

    const menuLinks = document.querySelectorAll('.menu-links li a');
    menuLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (document.querySelector('nav').classList.contains('show-nav')) {
                document.querySelector('nav').classList.remove('show-nav');
                document.querySelector('.menu-toggle').classList.remove('open');
                document.body.classList.remove('lock');
            }
        })
    })

    // 2. Typing Carousel

    const TxtRotate = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 500;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };


    TxtRotate.prototype.tick = function () {
        let i = this.loopNum % this.toRotate.length;
        let fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

        let that = this;
        let delta = 200 - Math.random() * 50;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };


    const elements = document.getElementsByClassName('txt-rotate');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-rotate');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }


    // 3.Projects hover-state

    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        project.addEventListener('mouseover', () => {
            const projectHover = project.children[1];
            const projectText = projectHover.children[0];
            projectHover.classList.add('visible');
            projectText.children[0].style.top = '2rem';
            projectText.children[1].style.top = '3.5rem';
            projectText.children[2].style.bottom = '2rem';
        })
        project.addEventListener('mouseout', (e) => {
            const projectHover = project.children[1];
            const projectText = projectHover.children[0];
            projectHover.classList.remove('visible');
            projectText.children[0].style.top = '-2rem';
            projectText.children[1].style.top = '-3.5rem';
            projectText.children[2].style.bottom = '-2rem';
        })
    })

    // 4. Modal Images
    const projectsHover = document.querySelectorAll('.project .project-hover');

    projectsHover.forEach((project) => {
        project.addEventListener('click', function (e) {
            const imageName = this.previousElementSibling.alt.trim();
            console.log(imageName)
            const project = this.parentElement;
            const modalImage = project.querySelector('.modal');

            modalImage.style.display = "block";
            modalImage.style.zIndex = 10;
            document.body.classList.add('lock');

            const modalImageName = "#" + imageName;
            displaySlickCarousel(modalImageName);

            const closeSpan = project.querySelector('.close');
            // When the user clicks on <span> (x), close the modal
            closeSpan.onclick = function () {
                disableSlickCarousel(modalImageName);
                modalImage.style.display = "none";
                document.body.classList.remove('lock');
            }
        })
    })

    // 5. Testimonials Carousel
    $('.carousel').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: true,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    arrows: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });

    // 6. Button UP
    var currentY = window.scrollY;
    window.onscroll = function () { 
        if (window.scrollY > currentY){
            activateFabs();
            currentY = window.scrollY;
        }
        else if (window.scrollY < currentY) {
            disactivateFabs();
            currentY = window.scrollY;
        }
    };
    scrollStop(activateFabs);


    //7. Instagram Feed
    // const userFeed = new Instafeed({
    //     get: 'user',
    //     target: "instafeed-container",
    //     resolution: 'low_resolution',
    //     limit: 9,
    //     template: '<div class="instaItem"><a href="{{link}}"><img alt="{{caption}}" src="{{image}}" /></a><p>{{caption}}</p></div>',
    //     accessToken: 'IGQVJWTTdCTmQ5Wm5pTXpOSmNNUE1rQ1JGNFM0ejZADMjhJZAmpaSmpkWlBXSkhfZAWRTb2plUlBDeHlwN1RXOGZACdmVWN294QTJqSl9CTnpRVkRDdDl0UFB0YUwwaVZAFMWFxMUxJM0haTWhNWUJCZAy1tYwZDZD'
    // });
    // userFeed.run();

    // const instaPosts = document.querySelector('#instafeed-container');
    
    // instaPosts.addEventListener('click', (e) => {
    //     window.open(e.target.parentElement.querySelector('a'));
    // })
})



// FUNCTIONS
function displaySlickCarousel(sliderName) {
    $(sliderName).slick({
        arrows: false,
        dots: true,
        infinite: true,
        autoPlay: true,
        mobileFirst: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 960,
                settings: {
                    arrows: true
                }
            },
        ]
    });
}

function disableSlickCarousel(sliderName) {
    $(sliderName).slick('unslick');
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function activateFabs() {
    document.querySelector('#btnUp').style.display = "none";
    document.querySelector('.fabs-contact').style.display = "flex";
}

function disactivateFabs() {
    document.querySelector('#btnUp').style.display = "block";
    document.querySelector('.fabs-contact').style.display = "none";
}

function scrollStop (activateFabs, refresh = 2000) {
    // Make sure a valid callback was provided
    if (!activateFabs || typeof activateFabs !== 'function') return;
    // Setup scrolling variable
    let isScrolling;
    // Listen for scroll events
    window.addEventListener('scroll', function (event) {   
        // Clear our timeout throughout the scroll
        window.clearTimeout(isScrolling);
        // Set a timeout to run after scrolling ends
         isScrolling = setTimeout(activateFabs, refresh);

    }, false);

}