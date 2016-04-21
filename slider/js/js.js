function Slider(params) {



    this.config = {
        width: params.width || 1024,
        height: params.height || 768,
        interval: params.interval || 2000,
        speed: params.speed || 1000,
        autoplay: params.autoplay || true,
        selectors: {
            sliderContainer: document.querySelector('.slider-container'),
            slider: document.querySelector('.slider'),
            slides: document.querySelectorAll('.slider li'),
            prev: document.querySelector('.prev'),
            next: document.querySelector('.next')
        }
    };

    this.root = window.document.querySelector('.slider');


    this.currentIdx = 0;

    this.firstIdx = 0;

    this.lastIdx = this.config.selectors.slides.length - 1;

    this.UNIT = 'px';

    this.isAnimating = false; // FIXME: how to make it private?

    //this.items = CONFIG.SELECTORS.slides || Array();



    //var params = params || CONFIG.defaults;

    //console.log(CONFIG.SELECTORS.slides[3]);







}

Slider.prototype.beforeAnimate = function() {
    this.isAnimating = true;
    setTimeout((function(){this.afterAnimate()}).bind(this), 1000);
};

Slider.prototype.afterAnimate = function() {
    this.isAnimating = false;
    this.moveFirstToEnd(slides.length - this.currentIdx);
};

Slider.prototype.buildSlider = function() {
    this.config.selectors.slider.style.width = this.config.width + this.UNIT;
    this.config.selectors.slider.style.height = this.config.height + this.UNIT;
    for (var i = 0; i < this.config.selectors.slides.length; i++) {
        this.config.selectors.slides[i].style.left = i * this.config.width + this.UNIT;
    }
};

Slider.prototype.moveFirstToEnd = function(index) {
    //console.log(index + ' <- needed to be moved');
    //console.log(this.currentIdx, ' <- currentIdx');
    //console.log(this.firstIdx, ' <- firstIdx');
    //console.log(this.lastIdx, ' <- lastIdx');

    //if(this.currentIdx >= 2) {
    //    console.log((1024 * slides.length), '(1024 * slides.length)');
    //    console.log((parseInt(slides[this.firstIdx].style.left)), 'parseInt(slides[this.firstIdx].style.left))');
    //    console.log((1024 * slides.length) - parseInt(slides[this.firstIdx].style.left), '11');

            //slides[this.firstIdx].style.left = parseInt(1024 * slides.length) + parseInt(slides[this.firstIdx].style.left) + 'px';

        ++this.firstIdx;
        --this.lastIdx;
    //}

    //console.log(this.currentIdx, ' <- currentIdx');
    //console.log(this.firstIdx, ' <- firstIdx');
    //console.log(this.lastIdx, ' <- lastIdx');


    slides.forEach(function(item, index) {
        //item.style.transition = 'none';
        //console.log(slides[index].style.left);
        //console.log((1024 * index) + 'px');
        //slides[index].style.left = 1024 * index + 'px';
        //item.style.transition = 'all 1s linear';
    });



    //slides[index].style.left = 2048 + this.UNIT;
    //slides[index - 1].style.left = 1024 + this.UNIT;
};

Slider.prototype.initAnimation = function() {
    var animationId = setInterval(
        (function frame() {
            if (this.config == 350) {
                clearInterval(animationId);
            } else {
                console.log(this.config.selectors.slider.style.left);
                //this.config.selectors.slides.forEach(function(slide) {
                    this.config.selectors.slider.style.left = parseInt(this.config.selectors.slider.style.left) + 1 + 'px';
                //});
            }
        }).bind(this), 10);
};

Slider.prototype.animate = function(direction) {
    this.beforeAnimate();
    //console.log('move ' + direction);
    currentIdx = this.currentIdx;

    for (var i = 0; i < this.config.selectors.slides.length; i++) {
        slides = Array.prototype.slice.call(this.config.selectors.slides);
    }

    this.initAnimation();

    //slides.forEach(function(slide) {
        //slide.style.transition = 'all 1s linear';



        //for (i = 1024; i <= 0; i--) {
        //    slide.style.left = parseInt(slide.style.left) - 1 + 'px';
        //}



    //});


    //console.log(slides.length - this.currentIdx);

    //if(this.currentIdx > 2) {

    //}

    if((this.currentIdx + 1 == slides.length) && (slides.length - this.currentIdx == 1)) {
        //console.log(slides[slides.length - this.currentIdx - 1]);
        //slides[slides.length - this.currentIdx - 1].style.left = 1024 + 'px';
        //currentIdx = 1;
         //+ 1;
    }

    //this.config.selectors.slides[this.currentIdx-1].style.left = -1024+'px';
    //this.config.selectors.slides[this.currentIdx].style.left = 0+'px';
    //if(this.currentIdx+1 < slides.length) {
    //    this.config.selectors.slides[this.currentIdx + 1].style.left = 1024 + 'px';
    //} else {
    //    this.config.selectors.slides[this.currentIdx].style.left = -1024 + 'px';
    //}

};

Slider.prototype.next = function() {

    ++this.currentIdx;
    //this.firstIdx;
    //--this.lastIdx;

    //console.log(this.lastIdx + ' <-');

    if (this.config.selectors.slides.length <= this.currentIdx) {
        this.currentIdx = 0;
        this.firstIdx = 0;
        this.lastIdx = this.config.selectors.slides.length - 1;
    }

    if(this.isAnimating == false) {
        this.animate('next');
    }




};

window.onload = function() {
    var slider = new Slider({});

    var next = document.querySelector('.next');
    var prev = document.querySelector('.prev');

    next.addEventListener('click', function(e) {
        e.preventDefault();
        slider.next('next');

    });
    setInterval(function() {
        slider.next('next');
    }, 2000);

    slider.buildSlider();



    //slider.move('next');
};

//(function() {
//
//    var sliderSettings = {
//        sliderWidth: 0,
//        sliderHeight: 0
//    };
//
//    var animating = false;
//
//    var sliderContainer = document.querySelector('.slider-container');
//    var slider = document.querySelector('.slider');
//    var slides = document.querySelectorAll('.slider li');
//
//    for (var i = 0; i < slides.length; i++) {
//        slides = Array.prototype.slice.call(slides);
//        //console.log(slides.shift());
//    }
//
//    var image = document.querySelectorAll('.slider img')[0];
//    var prev = document.querySelector('.prev');
//    var next = document.querySelector('.next');
//    //console.log(slider);
//    //console.log(slides);
//
//    image.addEventListener('load', function(sliderSettings) {
//        sliderSettings.sliderWidth = image.naturalWidth;
//        sliderSettings.sliderHeight = image.naturalHeight;
//    }(sliderSettings));
//
//    slider.style.width = sliderSettings.sliderWidth + 'px';
//    slider.style.height = sliderSettings.sliderHeight + 'px';
//
//    function addNav() { // TODO
//
//    }
//
//    prev.addEventListener('click', function(e) {
//        e.preventDefault();
//        moveSlides('prev');
//    });
//
//    next.addEventListener('click', function(e) {
//        e.preventDefault();
//        moveSlides('next');
//    });
//
//    function setSlidesPosition(sliderWidth) {
//        for (var i = 0; i < slides.length; i++) {
//            slides[i].style.left = i * sliderWidth + 'px';
//            //makeDraggable(slides[i]);
//        }
//    }
//
//    function beforeAnimate() {
//        animating = true;
//        if (animating) {
//            console.log('animating');
//        }
//    }
//
//    function afterAnimate() {
//        animating = false;
//        console.log('stopped animating');
//        if (animating) {
//            console.log('stopped animating');
//        }
//    }
//
//    function animateSlides (slides) {
//        var step = 1024;
//        console.log(slides);
//        var handle = setInterval(function() {
//            slides.forEach(function(slide) {
//
//                while (step > 0) {
//
//                    step--;
//                    slide.style.left = parseInt(slide.style.left) - 1 + 'px';
//                    console.log(slide.style.left);
//
//                }
//                clearInterval(handle);
//            })
//        }, 10000)
//    }
//
//    function moveSlides(direction) {
//        beforeAnimate();
//        for (var i = 0; i < slides.length; i++) {
//            if(parseInt(slides[slides.length - 1].style.left) == sliderSettings.sliderWidth) {
//                swapSlides();
//            }
//            slides[i].style.zIndex = '1';
//
//            //slides[i].style.transition = 'all .5s linear';
//
//            animateSlides(slides);
//
//            //if (direction == 'prev') {
//            //    slides[i].style.left = parseInt(slides[i].style.left) + sliderSettings.sliderWidth + 'px';
//            //} else if (direction == 'next') {
//            //    slides[i].style.left = parseInt(slides[i].style.left) - sliderSettings.sliderWidth + 'px';
//            //}
//        }
//        afterAnimate();
//    }
//
//    function swapSlides() {
//        var first = slides.shift();
//        console.log(first);
//        first.style.zIndex = '-1';
//        first.style.left = 0 + sliderSettings.sliderWidth * 2 + 'px';
//
//        slides.push(first);
//    }
//
///******************/
//    //document.onmousemove = mouseMove;
//    //document.onmouseup   = mouseUp;
//    //var dragObject  = null;
//    //var mouseOffset = null;
//    //function getMouseOffset(target, ev){
//    //    ev = ev || window.event;
//    //    var docPos    = getPosition(target);
//    //    var mousePos  = mouseCoords(ev);
//    //    return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
//    //}
//    //function getPosition(e){
//    //    var left = 0;
//    //    var top  = 0;
//    //    while (e.offsetParent){
//    //        left += e.offsetLeft;
//    //        top  += e.offsetTop;
//    //        e     = e.offsetParent;
//    //    }
//    //    left += e.offsetLeft;
//    //    top  += e.offsetTop;
//    //    return {x:left, y:top};
//    //}
//    //
//    //function mouseCoords(ev){
//    //    if(ev.pageX || ev.pageY){
//    //        return {x:ev.pageX, y:ev.pageY};
//    //    }
//    //    return {
//    //        x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
//    //        y:ev.clientY + document.body.scrollTop  - document.body.clientTop
//    //    };
//    //}
//    //
//    //function mouseMove(ev){
//    //    ev           = ev || window.event;
//    //    var mousePos = mouseCoords(ev);
//    //    if(dragObject){
//    //        //dragObject.style.position = 'absolute';
//    //
//    //        //dragObject.style.top      = mousePos.y - mouseOffset.y + 'px';
//    //        dragObject.style.left     = mousePos.x - mouseOffset.x + 'px';
//    //        return false;
//    //    }
//    //}
//    //function mouseUp(){
//    //    dragObject = null;
//    //}
//    //function makeDraggable(item){
//    //    if(!item) return;
//    //    item.onmousedown = function(ev){
//    //        dragObject  = this;
//    //        mouseOffset = getMouseOffset(this, ev);
//    //        return false;
//    //    }
//    //}
//    /********************************************************/
//
//
//
//    //console.log(sliderSettings);
//
//    setSlidesPosition(sliderSettings.sliderWidth);
//
//}).call();