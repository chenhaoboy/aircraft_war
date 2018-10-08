class PlaneWars {
    constructor() {
        if (_instance()) return _instance();
        this.proto = 0;
        this.body = createEle("div");
        _instance(this);
    }
    show() {
        this.init();
        this.move();
    }
    init() {
        new GameEngine().append(this.body);
        this.body.className = "my-warplain";
        this.body.style.left = (new GameEngine().width() - this.width()) / 2 + "px";
        this.body.style.top = new GameEngine().height() - this.height() + "px";
        this.fire();
    }
    fire() {
        this.timerFire = null;
        this.timerFire = setInterval(function() {
            new Bullet({
                X: this.left() + this.width() / 2,
                Y: this.top()
            }).init().moveBullet();
        }.bind(this), 100 * new GameEngine().level);
    }
    rapidFire() {
        if (this.proto == 1) {
            this.timerPro = null;
            var count = 0;
            clearInterval(this.timerPro);
            this.timerPro = setInterval(function() {
                if (count / 1000 > 5) {
                    clearInterval(this.timerPro);
                    this.proto = 0;
                }
                new Bullet({
                    X: this.left() + this.width() / 2 - 20,
                    Y: this.top()
                }).init().moveBullet();
                new Bullet({
                    X: this.left() + this.width() / 2 + 20,
                    Y: this.top()
                }).init().moveBullet();
                count += 100 * new GameEngine().level;
            }.bind(this), 100 * new GameEngine().level);
        }
        if (this.proto == 2) {
            var cover = createEle("div");
            new GameEngine().append(cover);
            cover.className = "cover";
            cover.style.display = "block";
            var timer = null;
            var count = 0;
            timer = setInterval(function() {
                if (count >= 2000) {
                    clearInterval(timer);
                    cover.remove();
                }
                moveMultiAttr(cover, { opacity: 1 }, function() {
                    cover.style.opacity = "0.5";
                });
                count += 50;
            }, 50);
            // setTimeout(function(){
            // 	//clearInterval(timer);
            // 	//cover.remove();
            // },2000);
        }
    }
    move() {
        document.onkeydown = function(event) {
            var evt = event || window.event;
            var code = evt.keyCode || evt.which;
            switch (code) {
                case 37: //left
                    this.body.style.left = this.left() - 8 + "px";
                    if (this.left() < 0) {
                        this.body.style.left = 0;
                    }
                    break;
                case 39: //right
                    this.body.style.left = this.left() + 8 + "px";
                    if (this.left() > new GameEngine().width() - this.width()) {
                        this.body.style.left = new GameEngine().width() - this.width() + "px";
                    }
                    break;
            }
        }.bind(this);
    }
    width() {
        return this.body.offsetWidth;
    }
    height() {
        return this.body.offsetHeight;
    }
    left() {
        return this.body.offsetLeft;
    }
    top() {
        return this.body.offsetTop;
    }
}