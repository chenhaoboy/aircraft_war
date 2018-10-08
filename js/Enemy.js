class Enemy {
    constructor(name, speed, ph) {
        this.body = createEle("div");
        this.name = name;
        this.speed = speed;
        this.ph = ph;
        this.status = 0;
        this.init().move();
    }
    init() {
        new GameEngine().append(this.body);
        this.body.className = this.name;
        this.body.style.left = getRandomNum(0, new GameEngine().width() - this.width()) + "px";
        this.body.style.top = -this.height() + "px";
        return this;
    }
    move() {
        this.timer = null;
        clearInterval(this.timer);
        this.timer = setInterval(function() {
            if (this.top() > new GameEngine().height()) {
                clearInterval(this.timer);
                this.body.remove();
            }
            this.body.style.top = this.top() + this.speed + "px";
            if (impact(this.body, new PlaneWars().body)) {

                clearInterval(this.timer);
                this.body.remove();
                for (var i = 0; i < new GameEngine().enemies.length; i++) {
                    clearInterval(new GameEngine().enemies[i].timer);
                }
                clearInterval(new GameEngine().moveBgTimer);
                clearInterval(new GameEngine().timerProto);
                clearInterval(new PlaneWars().timerFire);
                clearInterval(new GameEngine().timerPlane);

                var score = new GameEngine().score;
                if (score > new GameEngine().maxScore) {
                    updateScore(score);
                } else {
                    var r = confirm("Game Over 得分：" + new GameEngine().score);
                    if (r == true) {
                        location.reload(location.href);
                    } else {
                        location.reload(location.href);
                    }
                }
            }
        }.bind(this), 30);
    }
    boom() {
        if (this.status < this.arrBg.length) {
            if (this.ph == this.status) {
                new GameEngine().score += this.ph;
                new GameEngine().scoreBox.innerHTML = "最高分: " + new GameEngine().maxScore + "<br>得分：" + new GameEngine().score;
                for (var i = 0; i < new GameEngine().enemies.length; i++) {
                    if (new GameEngine().enemies[i] == this) {
                        new GameEngine().enemies.splice(i, 1);
                        setTimeout(function() {
                            this.body.remove();
                        }.bind(this), 500);
                    }
                }
            }
            this.body.style.background = `url(images/${this.arrBg[this.status]}) no-repeat`;
            this.status++;
        }
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
class SmallEnemy extends Enemy {
    constructor() {
        super("enemy-small", 8, 2);
        this.arrBg = ["plane1_die1.png", "plane1_die2.png", "plane1_die3.png"];
    }
}
class MiddleEnemy extends Enemy {
    constructor() {
        super("enemy-middle", 6, 3);
        this.arrBg = ["plane2_die1.png", "plane2_die2.png", "plane2_die3.png", "plane2_die4.png"];
    }
}
class LargeEnemy extends Enemy {
    constructor() {
        super("enemy-large", 4, 5);
        this.arrBg = ["plane3_die1.png", "plane3_die2.png", "plane3_die3.png", "plane3_die4.png", "plane3_die5.png", "plane3_die6.png"];
    }
}