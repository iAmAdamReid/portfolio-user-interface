// JS goes here

/************************************************************************************************/

/*** NAVIGATION HOVER ZOOM JAVASCRIPT ***/
let navTitle = document.querySelector('.nav-title');
navTitle.addEventListener('mouseover', () => {
    TweenMax.fromTo(navTitle, 1, {
        scale: 1
    }, {
        scale: 1.15,
        ease: Elastic.easeOut
    });
});

navTitle.addEventListener('mouseout', () => {
    TweenMax.fromTo(navTitle, 1, {
        scale: 1.15
    }, {
        scale: 1,
        ease: Elastic.easeOut
    });
});

/*** END NAVIGATION HOVER ZOOM JAVASCRIPT ***/

/************************************************************************************************/

/*** NAVIGATION EXPAND AND COLLAPSE JAVASCRIPT ***/

let navButton = document.querySelector('.nav-button');
let navigation = document.querySelector('#navigation');
let isOpen = false;

navButton.addEventListener('click', () => {
    if (isOpen == false) {
        navigation.style.display = 'flex';
        navButton.innerHTML = `<img src = './img/nav-hamburger-close.png'>`;
        TweenMax.fromTo(navigation, 0.5, {
            scale: 0,
            y: -800
        }, {
            scale: 1.0,
            y: 0,
            ease: Expo.easeOut
        });
        isOpen = true;
    } else {

        navButton.innerHTML = `<img src = './img/nav-hamburger.png'>`
        TweenMax.fromTo(navigation, 0.5, {
            scale: 1.0,
            y: 0,
            display: 'flex'
        }, {
            scale: 0,
            y: -800,
            display: 'none',
            ease: Expo.easeOut
        });
        isOpen = false;
    }
});

/*** END NAVIGATION EXPAND AND COLLAPSE JAVASCRIPT ***/

/************************************************************************************************/

/*** NAV BUTTON ANIMATIONS ***/

navButton.addEventListener('mouseover', () => {
    TweenMax.fromTo(navButton, 1, {
        scale: 1
    }, {
        scale: 1.15,
        ease: Elastic.easeOut
    });
});

navButton.addEventListener('mouseout', () => {
    TweenMax.fromTo(navButton, 1, {
        scale: 1.15
    }, {
        scale: 1,
        ease: Elastic.easeOut
    });
});

/*** END NAV BUTTON ANIMATIONS ***/

/************************************************************************************************/

/*** HOME PAGE PROJECT TITLE ORIENTATION ***/

var mobileWidth = window.matchMedia('(min-width: 500px)');

shiftLeft(mobileWidth);
mobileWidth.addListener(shiftLeft);

function shiftLeft() {

    // Shifts every other project title to the left on desktop
    let projects = document.querySelectorAll('.project');
    let everyOther = [];

    projects.forEach(function (each) {
        if (each.dataset.tab % 2 === 0) {
            everyOther.push(each);
        }
    });

    let eoTitle = [];

    for (i = 0; i < everyOther.length; i++) {
        eoTitle.push(everyOther[i].querySelector('.project-title'));
    }
    if (mobileWidth.matches) {
        for (i = 0; i < eoTitle.length; i++) {
            eoTitle[i].style.cssText = 'left: 0; right: initial;';
        }

    } else {
        for (i = 0; i < eoTitle.length; i++) {
            eoTitle[i].style.cssText = 'left: initial; right: initial;';
        }
    }
}

/*** END HOME PAGE PROJECT TITLE ORIENTATION ***/

/************************************************************************************************/

/*** SERVICES PAGE TABS JAVASCRIPT ***/

//take all tabs and map them into a constructor
class TabLink {
    constructor(element) {
        this.element = element;

        // collect tab's data
        this.tabData = element.dataset.tab;

        // find element that matches data
        this.card = document.querySelector(`.card[data-tab='${this.tabData}'`);
        //add click event that runs a method
        this.element.addEventListener('click', () => {
            this.showCard(this.card);
            this.tabSelect(this.element);
        });
    }

    // hide all cards that do not match this.card
    showCard(card) {
        let hideAll = document.querySelectorAll('.card');
        hideAll.forEach(function (each) {
            each.style.display = 'none';
        });
        card.style.display = 'inline-block';
        TweenMax.fromTo(card, 1, {
            opacity: 0
        }, {
            opacity: 1,
            ease: Power1.easeOut
        });
    }

    tabSelect(element) {
        let allTabs = document.querySelectorAll('.tab-link');
        allTabs.forEach(function (each) {
            each.classList.remove('active-link');
            TweenMax.fromTo(each, 0.1, {
                scale: 1
            }, {
                scale: 1,
                ease: Power1.easeOut
            });
        });
        element.classList.add('active-link');
        TweenMax.fromTo(element, 0.1, {
            scale: 1
        }, {
            scale: 1.15,
            ease: Power1.easeOut
        });
    }
}

if (document.title === 'Services') {

    let tabs = document.querySelectorAll('.tab-link');

    tabs = Array.from(tabs).map(tabs => new TabLink(tabs));

    tabs[0].showCard(tabs[0].card);
    tabs[0].tabSelect(tabs[0].element);


}

/*** END SERVICES PAGE TABS JAVASCRIPT ***/

/************************************************************************************************/

/*** MOBILE IMAGES SOURCE SWAP JAVASCRIPT ***/

/** This code has been replaces by using CSS background images.
 * This was a personal exercise to demonstrate on-the-fly image source retrieval
 * by monitoring the DOM.
 * 
 */

// class ImageSwap {
//     constructor(element) {
//         this.element = element;

//         this.imgData = element.dataset.tab;

//         this.pageTitle = document.title.toLowerCase();

//         window.addEventListener('load', () => {
//             if (window.innerWidth <= 500) {
//                 this.mobileSrc();
//             } else if (window.innerWidth > 500) {
//                 this.desktopSrc();
//             }
//         });

//         window.addEventListener('resize', () => {
//             if (window.innerWidth <= 500) {
//                 this.mobileSrc();
//             } else if (window.innerWidth > 500) {
//                 this.desktopSrc();
//             }
//         });
//     }

//     mobileSrc() {
//         if (this.imgData !== 'exclude') {
//             this.element.src = `./img/${this.pageTitle}/${this.pageTitle}-mobile-${this.imgData}.png`;
//         }
//     }

//     desktopSrc() {
//         if (this.imgData !== 'exclude') {
//             this.element.src = `./img/${this.pageTitle}/${this.pageTitle}-${this.imgData}.png`;
//         }
//     }

// }

// let images = document.querySelectorAll('img');

// images = Array.from(images).map(images => new ImageSwap(images));

/*** END MOBILE IMAGES SOURCE SWAP JAVASCRIPT ***/

/************************************************************************************************/

/*** PROJECTS PAGE CAROUSEL JAVASCRIPT ***/

class Carousel {
    constructor(element) {
        this.element = element;
        // Get left and right buttons from carousel element
        this.leftButton = element.querySelector('.left-button');
        this.rightButton = element.querySelector('.right-button');
        // Get all images within carousel element
        this.images = this.element.querySelectorAll('.carousel-img');
        // Set default index to 0
        this.currentIndex = 0;
        // Show first image by default
        this.images[this.currentIndex].style.display = 'block';

        this.leftButton.addEventListener('click', () => {
            this.lastImage();
        })

        this.rightButton.addEventListener('click', () => {
            this.nextImage();
        })
    }

    lastImage() {
        let lastImg = this.images[this.currentIndex];
        TweenMax.fromTo(lastImg, 1, {
            ease: Expo.easeOut,
            x: 0
        }, {
            ease: Expo.easeOut,
            x: -1200
        });
        setTimeout(function () {
            lastImg.style.display = 'none';
        }, 150);

        // Shift index -1 on left click, wraparound if index < 0
        if ((this.currentIndex - 1) < 0) {
            this.currentIndex = this.images.length - 1;
        } else {
            this.currentIndex -= 1;
        }

        let currentImg = this.images[this.currentIndex];
        setTimeout(function () {
            currentImg.style.display = 'block';
        }, 150);
        TweenMax.fromTo(currentImg, 0.5, {
            ease: Power1.easeOut,
            x: 1200
        }, {
            ease: Power1.easeOut,
            x: 0
        });

    }

    nextImage() {
        let lastImg = this.images[this.currentIndex];

        TweenMax.fromTo(lastImg, 1, {
            ease: Expo.easeOut,
            x: 0
        }, {
            ease: Expo.easeOut,
            x: 1200
        });
        setTimeout(function () {
            lastImg.style.display = 'none';
        }, 150);

        // Shift index +1 on right click, wraparound if index > images.length - 1
        if ((this.currentIndex + 1) > this.images.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex += 1;
        }

        let currentImg = this.images[this.currentIndex];
        setTimeout(function () {
            currentImg.style.display = 'block';
        }, 150);
        TweenMax.fromTo(currentImg, 0.5, {
            ease: Power1.easeOut,
            x: -1200
        }, {
            ease: Power1.easeOut,
            x: 0
        });
    }
}

let carousel = document.querySelectorAll('.carousel');

carousel = Array.from(carousel).map(carousel => new Carousel(carousel));

/*** END PROJECTS PAGE CAROUSEL JAVASCRIPT ***/

/************************************************************************************************/