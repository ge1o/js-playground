'use strict';

(function(window, document) {

    var app = this;

    var Slider = function Slider(el, options) {
        var _this = this instanceof Slider ? this : Object.create(Slider.prototype);

        _this.UNIT = 'px';
        _this.isAnimating = false;
        _this.moved = 0;
        _this.intervalMoveId;
        _this.intervalAnimateId;

        _this.firstSlide;
        _this.lastSlide;

        options = options || {};

        _this.selectors = {
            sliderContainer: window.querySelector('.slider-container'),
            slider: window.querySelector('.slider'),
            slides: window.querySelectorAll('.slider li'),
            prev: window.querySelector('.prev'),
            next: window.querySelector('.next')
        };

        _this.initialize(options);

        return _this;
    };

    Slider.prototype.initialize = function initialize(options) {
        console.info('Slider init');

        var _this = this;

        _this.defaults = {
            animation: 'slide',
            autoSlide: true,
            width: 1024,
            height: 768,
            direction: 'next',
            speed: 1000,
            showTime: 3000
        };

        _this.lastIndex = _this.selectors.slides.length;
        _this.firstIndex = 0;
        _this.currentIndex = 0;

        _this.buildSlider();

        //console.log('here');
        _this.interval = setInterval((function() {_this.move()}).bind(this), _this.defaults.showTime);


        _this.selectors.slider.addEventListener('mouseenter', (function() {_this.stopAnimate()}).bind(this));
        _this.selectors.slider.addEventListener('mouseleave', (function() {
            _this.isAnimating = false;
            _this.interval = setInterval((function() {_this.move()}).bind(this), _this.defaults.showTime);
        }).bind(this));

    };

    Slider.prototype.buildSlider = function buildSlider() {
        var _this = this;

        _this.selectors.slider.style.width = _this.defaults.width + _this.UNIT;
        _this.selectors.slider.style.height = _this.defaults.height + _this.UNIT;

        //_this.firstSlide;
        //_this.lastSlide;

        for (var i = 0; i < _this.selectors.slides.length; i++) {
            this.selectors.slides[i].style.left = _this.defaults.width + _this.UNIT;
        }

        _this.selectors.slides[_this.currentIndex].style.left = 0;
        //_this.selectors.slides[_this.firstIndex].style.left = 0;
        //_this.selectors.slides[_this.lastIndex].style.left = 0;




        console.info('Slider built');
        _this.swapSlides();
    };

    Slider.prototype.beforeAnimate = function beforeAnimate() {
        var _this = this;



        //console.log(_this.isAnimating, ' before');
        //setTimeout((function(){_this.afterAnimate()}).bind(this), 1000);
    };

    Slider.prototype.afterAnimate = function afterAnimate() {
        var _this = this;

        _this.isAnimating = false;
        //'AFTER');
        _this.swapSlides();
        //_this.selectors.slides);


        if (!_this.isAnimating) {
            //Interval(_this.intervalMoveId);
            //clearInterval(_this.intervalAnimateId);
            //_this.isAnimating = true;

            //_this.intervalMoveId = setTimeout((_this.autoSlide).bind(this), _this.defaults.showTime);
        }
        //console.log(_this.intervalMoveId);
        //_this.moveFirstToEnd(slides.length - this.currentIdx);
    };

    Slider.prototype.autoSlide = function autoSlide() {
        var _this = this;

        //_this.isAnimating = false;
        if (!_this.isAnimating) {

            _this.move(_this.defaults.direction);
        }


        //_this.afterAnimate();


    };

    Slider.prototype.move = function move(direction) {
        var _this = this;
        //_this.selectors.slider.style.left = 0 + 'px';

        //clearInterval(_this.intervalMoveId);
        //clearInterval(_this.intervalAnimateId);

        _this.isAnimating = false;
        //console.log(_this.isAnimating);

        if (_this.defaults.autoSlide) {
            _this.intervalMoveId = setInterval((_this.autoSlide).bind(this), _this.defaults.showTime);
            //console.log(_this.intervalId);
            //_this.autoSlide();
        }

        if (!_this.isAnimating) {
            _this.isAnimating = true;
            _this.startAnimate(direction);
        }


    };

    Slider.prototype.startAnimate = function startAnimate() {
        var _this = this;
        clearInterval(_this.intervalMoveId);

                    _this.selectors.slides[_this.currentIndex].style.transition = 'all 1s linear';
                    _this.selectors.slides[_this.currentIndex + 1].style.transition = 'all 1s linear';

                    _this.selectors.slides[_this.currentIndex].style.left = - 1024 + 'px';
                    _this.selectors.slides[_this.currentIndex + 1].style.left = 0 + 'px';

                    //for (var i = 0; i < _this.selectors.slides.length; i++) {
                    //    _this.selectors.slides[i].style.left = parseInt(_this.selectors.slides[i].style.left) - 1024 + 'px';
                    //    _this.selectors.slides[i].style.transition = 'all 1s linear';
                    //
                    //}
        _this.currentIndex++;
        //_this.currentIndex);
        setTimeout((function() {_this.swapSlides()}).bind(this), 1000);

                    //setTimeout((function(){_this.afterAnimate()}).bind(_this), _this.defaults.showTime);
                    //console.log(this.config.selectors.slider.style.left);
                    //this.config.selectors.slides.forEach(function(slide) {
                    //this.config.selectors.slider.style.left = parseInt(this.config.selectors.slider.style.left) + 1 + 'px';
                    //});
    };

    Slider.prototype.stopAnimate = function stopAnimate() {
        var _this = this;

        _this.hovered = true;

        //_this.isAnimating = true;
        clearInterval(_this.intervalMoveId);
        //clearInterval(_this.intervalAnimateId);
        clearInterval(_this.interval);
        //console.log(_this + 'STOP');
        //console.log('stopped animation');
    };

    Slider.prototype.swapSlides = function swapSlides() {
        var _this = this;

        console.log('swapping');

        for (var i = 0; i < _this.selectors.slides.length; i++) {
            _this.selectors.slides[i].style.transition = 'none';
        }




        if(_this.currentIndex == _this.selectors.slides.length - 1) {
            console.log('the last one');

            for (var i = 0; i < _this.selectors.slides.length; i++) {
                //this.selectors.slides[i].style.left = _this.defaults.width + _this.UNIT;
            }

            _this.currentIndex = 0;
            _this.firstIndex = 0;
            _this.lastIndex = _this.selectors.slides.length;

            //_this.selectors.slides[_this.currentIndex].style.transition = 'all 1s linear';
            //_this.selectors.slides[_this.currentIndex + 1].style.transition = 'all 1s linear';

            //_this.selectors.slides[_this.currentIndex].style.left = - 1024 + 'px';
            //_this.selectors.slides[_this.currentIndex + 1].style.left = 0 + 'px';

        }

        _this.firstSlide = _this.selectors.slides[_this.firstIndex];
        _this.lastSlide = _this.selectors.slides[_this.lastIndex - 1];

        //console.log(_this.firstIndex, ' firstIndex');
        console.log(_this.currentIndex, ' currentIndex');
        // console.log(_this.lastIndex, ' lastIndex');




        _this.lastSlide.style.left = - _this.defaults.width + _this.UNIT;
        //console.log(_this.selectors.slides.length, '_this.selectors.slides.length');
        //_this.lastIndex--;
        //_this.firstIndex++;

        if (_this.currentIndex == 2) {
            console.log('move now');
            _this.firstSlide.style.left = _this.defaults.width * _this.selectors.slides.length + _this.UNIT;

            console.log(_this.selectors.slides[_this.lastIndex - 1]);
            _this.selectors.slides[_this.lastIndex - 1].style.left = 1024 + 'px';

            //if (_this.firstIndex > 0) {
            //    _this.firstIndex--;
            //}

        }

        //_this.lastIndex = 1;
        //_this.firstIndex = 0;
        //_this.currentIndex = 0;
    };

    app.Slider = Slider;

    return app.Slider();

}).call(window, document);
