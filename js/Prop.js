class Prop {
    constructor(type) {
        this.type = type;
        this.body = createEle("div");
    }
    init() {
        new GameEngine().append(this.body);
        this.body.className = "weapon";
        if (this.type) {
            this.body.style.background = "url(images/prop1.png)";
        }
        this.body.style.left = getRandomNum(0, new GameEngine().width() - this.width()) + "px";
        this.body.style.top = -this.height() + "px";
        this.move();
    }
    move() {
        this.timer = null;
        this.timer = setInterval(function() {
            this.body.style.top = this.top() + 4 + "px";
            if (this.height() > new GameEngine().height()) {
                clearInterval(this.timer);
                this.body.remove();
            }
            if (impact(this.body, new PlaneWars().body)) {
                this.body.remove();
                if (this.type) {
                    new PlaneWars().proto = 2;
                } else {
                    new PlaneWars().proto = 1;
                }
                new PlaneWars().rapidFire();
            }
        }.bind(this), 30);
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