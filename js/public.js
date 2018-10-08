function getScore() {
    var GameScore = Bmob.Object.extend("GameScore");
    var query = new Bmob.Query(GameScore);
    query.get("72d17427aa", {
        success: function(object) {
            // The object was retrieved successfully.
            console.log("bmob", object.get("score"));
            new GameEngine().maxScore = object.get("score");
        },
        error: function(object, error) {
            console.log("query object fail");
            return 0;
        }
    });
}

function updateScore(score) {
    var GameScore = Bmob.Object.extend("GameScore");
    var query = new Bmob.Query(GameScore);
    query.get("72d17427aa", {
        success: function(object) {
            // The object was retrieved successfully.
            object.set("score", score);
            object.save(null, {
                success: function(objectUpdate) {
                    console.log("create object success, object score:" + objectUpdate.get("score"));
                    showMaxScore("历史最高分 得分：" + objectUpdate.get("score"));
                },
                error: function(model, error) {
                    showMaxScore("create object fail");
                }
            });
        },
        error: function(object, error) {
            console.log("query object fail");
        }
    });
}

function showMaxScore(msg) {
    var r = confirm(msg);
    if (r == true) {
        location.reload(location.href);
    } else {
        location.reload(location.href);
    }
}

function createEle(ele) {
    return document.createElement(ele);
}