document.addEventListener('DOMContentLoaded', (event) => {
    navanimation();
});

function navanimation() {
    var nav = document.querySelector("nav");

    nav.addEventListener("mouseenter", function() {
        var tl = gsap.timeline();
        tl.to("#nav-bottom", {
            height: "70%",
            duration: 0.65
        });
        tl.to(".bottom-div h5 span", {
            fontSize: "1.5vw",
            fontWeight: 500,
            y: 0,
            duration: 0.5,
            stagger: 0.1
        }, "<");
       
    });

    nav.addEventListener("mouseleave", function() {
        var tl = gsap.timeline();
        tl.to(".bottom-div h5 span", {
            fontSize: "0",
            fontWeight: 500,
            y: 25,
            duration: 0.5,
            stagger: 0.2
        });
        tl.to("#nav-bottom", {
            height: 0,
            duration: 0.65
        }, "<");

    });
}
var rightElems = document.querySelectorAll(".right-elem");

rightElems.forEach(function(elem) {
    var img = elem.querySelector("img");

    elem.addEventListener("mouseenter", function() {
        gsap.to(img, {
            opacity: 1,
            scale: 1
        });
    });

    elem.addEventListener("mouseleave", function() {
        gsap.to(img, {
            opacity: 0,
            scale: 0
        });
    });

    elem.addEventListener("mousemove", function(event) {
        var rect = elem.getBoundingClientRect();
        var x = event.clientX - rect.left - (rect.width / 2); // Adjust as needed
        var y = event.clientY - rect.top - (rect.height / 2); // Adjust as needed

        gsap.to(img, {
            x: x,
            y: y,
            ease: "power2.out"
        });
    });
});


var sections = document.querySelectorAll(".section");
sections.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        var video = elem.querySelector("video");
        if(video) {
            video.style.opacity = 1;
            video.play();
        }
    });
    elem.addEventListener("mouseleave", function(){
        var video = elem.querySelector("video");
        if(video) {
            video.style.opacity = 0;
            video.load(); // This will reset the video to the beginning
        }
    });
});

var sections = document.querySelectorAll(".mini1");
sections.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        var video = elem.querySelector("video");
        if(video) {
            video.style.opacity = 1;
            video.play();
        }
    });
    elem.addEventListener("mouseleave", function(){
        var video = elem.querySelector("video");
        if(video) {
            video.style.opacity = 0.4;
            video.load(); // This will reset the video to the beginning
        }
    });
});
var sections = document.querySelectorAll(".mini2");
sections.forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        var video = elem.querySelector("video");
        if(video) {
            video.style.opacity = 1;
            video.play();
        }
    });
    elem.addEventListener("mouseleave", function(){
        var video = elem.querySelector("video");
        if(video) {
            video.style.opacity = 0.2;
            video.load(); // This will reset the video to the beginning
        }
    });
});

function loadingAnimation() {
    console.log("Loading animation started");

    var tl = gsap.timeline();
    tl.from("#page1", {
        opacity: 0,
        duration: 0.2,
        delay: 0.2,
        onComplete: function() {
            console.log("#page1 initial fade-in complete");
        }
    })
    .from("#page1", {
        transform: "scaleX(0.7) scaleY(0.2) translateY(80%)",
        borderRadius: "150px",
        duration: 2,
        ease: "expo.out",
        onComplete: function() {
            console.log("#page1 transform animation complete");
        }
    })
    .from("nav", {
        opacity: 0,
        delay: -0.2,
        onComplete: function() {
            console.log("Nav fade-in complete");
        }
    })
    .from("#page1 h1, #page1 p, #page1 div", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        onComplete: function() {
            console.log("#page1 content fade-in complete");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadingAnimation();
});
$(document).ready(function() {
    // Timer arguments:
    //   #1 - time of animation in milliseconds,
    //   #2 - days to deadline

    var animationTime = 20, // in seconds
        days = 7;

    // Set animation duration
    $('#progress-time-fill, #death-group').css({'animation-duration': animationTime + 's'});

    function deadlineAnimation() {
        $('#designer-arm-grop').css({'animation-duration': '1.5s'});
        setTimeout(function() { $('#designer-arm-grop').css({'animation-duration': '1s'}); }, 4000);
        setTimeout(function() { $('#designer-arm-grop').css({'animation-duration': '0.7s'}); }, 8000);
        setTimeout(function() { $('#designer-arm-grop').css({'animation-duration': '0.3s'}); }, 12000);
        setTimeout(function() { $('#designer-arm-grop').css({'animation-duration': '0.2s'}); }, 15000);
    }

    function timer(totalTime, deadline) {
        var time = totalTime * 1000; // convert to milliseconds
        var dayDuration = time / deadline;
        var actualDay = deadline;

        var interval = setInterval(function() {
            --actualDay;
            $('.deadline-days .day').text(actualDay);
            if (actualDay <= 0) {
                clearInterval(interval);
                $('.deadline-days .day').text(deadline);
            }
        }, dayDuration);
    }

    function deadlineText() {
        var $el = $('.deadline-days');
        var html = '<div class="mask-red"><div class="inner">' + $el.html() + '</div></div><div class="mask-white"><div class="inner">' + $el.html() + '</div></div>';
        $el.html(html);
    }

    deadlineText();
    deadlineAnimation();
    timer(animationTime, days);

    setInterval(function() {
        deadlineAnimation();
        timer(animationTime, days);
        console.log('begin interval', animationTime * 1000);
    }, animationTime * 1000);
});
