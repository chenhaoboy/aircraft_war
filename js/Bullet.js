class Bullet {
    constructor(pos) {
        this.body = createEle("div");
        this.pos = pos;
    }
    init() {
        new GameEngine().append(this.body);
        this.body.className = "bullet";
        this.body.style.left = this.pos.X - this.width() / 2 + "px";
        this.body.style.top = this.pos.Y + this.height() + "px";
        return this;
    }
    moveBullet() {
        this.timerMove = null;
        clearInterval(this.timerMove);
        this.timerMove = setInterval(function() {
            if (this.top() < -this.height()) {
                clearInterval(this.timerMove);
                this.body.remove();
                return 0;
            }
            for (var i = 0; i < new GameEngine().enemies.length; i++) {
                if (impact(this.body, new GameEngine().enemies[i].body)) {
                    clearInterval(this.timerMove);
                    this.boomBullet();
                    new GameEngine().enemies[i].boom(new GameEngine().enemies[i].arrBg);
                }
            }
            this.body.style.top = this.top() - 15 + "px";
        }.bind(this), 30);
    }
    boomBullet() {
        this.body.className = "bullet_die";
        setTimeout(function() {
            this.body.remove();
        }.bind(this), 50);
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