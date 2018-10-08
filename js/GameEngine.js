class GameEngine {
    constructor() {
        if (__instance()) return __instance();
        this.main = $$(".main");
        this.menu = $$(".options");
        this.level = 0;
        this.score = 0;
        this.maxScore = 0;
        this.enemies = [];
        __instance(this);
    }
    start() {
        this.init();
        getScore();
    }
    init() {
        delegation(this.menu, "li", "onclick", function(event, index) {
            this.level = index + 1;
            moveMultiAttr(this.menu, { opacity: 0 }, function() {
                this.menu.remove();
                this.moveBg();
                this.loading();
            }.bind(this));
        }.bind(this));
    }
    loading() {
        var logo = createEle("div");
        this.append(logo);
        logo.className = "logo";
        var load = createEle("div");
        this.append(load);
        load.className = "loading";
        var timer = null;
        var index = 1;
        timer = setInterval(function() {
            load.style.background = `url(images/loading${++index}.png) no-repeat`;
            if (index == 3) {
                index = 0;
            }
        }.bind(this), 300);
        setTimeout(function() {
            logo.remove();
            load.remove();
            clearInterval(timer);
            this.scoreBox = createEle("div");
            this.append(this.scoreBox);
            this.scoreBox.className = "score";
            new PlaneWars().show();
            this.initEnemy();
            this.initProto();
        }.bind(this), 3000);
    }
    moveBg() {
        var count = 0;
        this.moveBgTimer = null;
        this.moveBgTimer = setInterval(function() {
            this.main.style.backgroundPositionY = ++count + "px";
        }, 30);
    }
    append(obj) {
        this.main.appendChild(obj);
    }
    initEnemy() {
        this.timerPlane = null;
        this.timerPlane = setInterval(function() {
            this.randomPlane();
        }.bind(this), 500);
    }
    randomPlane() {
        var num = Math.random();
        switch (true) {
            case num < 0.5:
                this.enemies.push(new SmallEnemy());
                break;
            case num < 0.8:
                this.enemies.push(new MiddleEnemy());
                break;
            case num < 1:
                this.enemies.push(new LargeEnemy());
                break;
        }
    }
    initProto() {
        var count = 0;
        this.timerProto = null;
        this.timerProto = setInterval(function() {
            count++;
            if (count % 3 == 0) {
                new Prop(true).init();
            } else {
                new Prop().init();
            }
        }, 10000);
    }
    width() {
        return this.main.offsetWidth;
    }
    height() {
        return this.main.offsetHeight;
    }
    left() {
        return this.main.offsetLeft;
    }
    top() {
        return this.main.offsetTop;
    }
}