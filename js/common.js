///////////////////////
///  Common JS 1.0  ///
///////////////////////

//////////////
/// Util   ///
/// Event  ///
/// Cookie ///
/// Ajax   ///
/// Move   ///
//////////////


//////////////
// Util 1.0 //
//////////////

/**
 * $$
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-23
 * @param   {string}   select
 * @param   {boolean}   all
 * @return  {element}
 */
function $$(select, all) {
    if (all == undefined) {
        return document.querySelector(select);
    } else {
        return document.querySelectorAll(select);
    }
}

/**
 * getStyle
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-23
 * @param   {element}   DOM
 * @param   {attribute}   attr
 * @return  {value} attr.value
 */
function getStyle(DOM, attr) {
    if (getComputedStyle) {
        return getComputedStyle(DOM, false)[attr]; //W3C
    } else {
        return DOM.currentStyle[attr]; //IE
    }
}

/**
 * getRandomColor
 * @param  {Boolean} isRGB 
 * @return {String}  [rgb(0,0,0)] or [#ffffff]
 */
function getRandomColor(isRGB) {
    var sColor = "";
    if (!isRGB) {
        sColor = "#";
        var sChars = "0123456789abcdef"
        for (var i = 0; i < 6; i++) {
            sColor += sChars[Math.floor(Math.random() * 16)];
        }
    } else {
        var r = parseInt(Math.random() * 255);
        var g = parseInt(Math.random() * 255);
        var b = parseInt(Math.random() * 255);
        sColor = "rgb(" + r + "," + g + "," + b + ")";
    }
    return sColor;
}

/**
 * getRandomNum
 * This is a cool && pretty function
 * Random number of any interval
 * @author wiolem
 * @date    2017-12-01
 * @param   {number}   min
 * @param   {number}   max
 * @return  {number} eg: a number of 100 ~ 200
 */
function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

///////////
// Event //
///////////

/**
 * preventDefaultEvent
 * @param  {event} event
 * @return {undefined} undefined
 */
function prevDefaultEvent(event) {
    var evt = event || window.event;
    if (evt.preventDefault) {
        evt.preventDefault(); //W3C
    } else {
        window.event.returnValue = false; //IE
    }
    return false;
}

/**
 * preventEventBubble
 * @param  {event} event    
 * @return {undefined} undefined
 */
function prevEventBubble(event) {
    var evt = event || window.event;
    if (evt.stopPropagation) {
        evt.stopPropagation(); //W3C
    } else {
        window.event.cancelBubble = true; //IE
    }
}

/**
 * addEventListener
 * @param {Element}   dom    
 * @param {String}   event  
 * @param {Function} callback
 * @return {undefined} undefined
 */
function addEvent(dom, event, callback) {
    if (dom.addEventListener) {
        dom.addEventListener(event, callback);
    } else {
        dom.attachEvent("on" + event, callback);
    }
}

/**
 * removeEventListener
 * @param  {Element}   dom  
 * @param  {String}   event   
 * @param  {Function} callback  
 * @return {undefined} undefined        
 */
function removeEvent(dom, event, callback) {
    if (dom.removeEventListener) {
        dom.removeEventListener(event, callback);
    } else {
        dom.deatchEvent(event, callback);
    }
}

/**
 * EventDelegation
 * @param  {Element}	parent   父级元素
 * @param  {Element}	select    子集元素
 * @param  {String}		event    事件名
 * @param  {Function} callback   事件处理函数
 * @return {undefined} undefined
 */
function delegation(parent, select, evt, callback) {
    parent[evt] = function(event) {
        var evt = event || window.event;
        var child = parent.querySelectorAll(select);
        child = [].slice.call(child);
        var hasChild = child.indexOf(evt.target);
        if (hasChild != -1) {
            callback.call(child[hasChild], evt, hasChild);
        }
    }
}

////////////
// Cookie //
////////////

/**
 * setCookie
 * @param {string} name    name
 * @param {string} value   value
 * @param {string} path    path
 * @param {date}   expires Session
 * @return {undefined} undefined
 */
function setCookie(name, value, expires, path) {
    var d = new Date();
    d.setDate(d.getDate() + expires);
    document.cookie = name + "=" + value + ";expires=" + d + ";path=" + path;
}

/**
 * removeCookie
 * @param  {string} name
 * @param  {string} path  
 * @return {undefined} undefined
 */
function removeCookie(name, path) {
    setCookie(name, null, -1, path);
}

/**
 * getCookie
 * @param  {string} name
 * @return {string} value 
 */
function getCookie(name) {
    var sCookie = document.cookie;
    console.log(1, sCookie);
    var aCookie = sCookie.split("; "); //分割成数组
    console.log(2, aCookie);
    for (var i = 0; i < aCookie.length; i++) {
        if (name == aCookie[i].split("=")[0]) { //
            console.log(3, aCookie[i].split("=")[1]); //
            return aCookie[i].split("=")[1]; //
        }
    }
    return "";
}

//////////
// Ajax //
//////////

/**
 * ajaxGet
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-28
 * @param   {string}   url
 * @param   {Function} callback
 * @param   {string}   data
 * @return  {undefined}
 */
function ajaxGet(url, callback, data) {
    var ajax = null;
    if (window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
    } else {
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (data) { // data has value
        url = url + "?" + data;
    }
    ajax.open("GET", url, true);
    ajax.send();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(ajax.responseText);
        }
    }
}

/**
 * ajaxPost
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-28
 * @param   {string}   url
 * @param   {Function} callback
 * @param   {string}   data
 * @return  {undefined}
 */
function ajaxPost(url, callback, data) {
    var ajax = new XMLHttpRequest();
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send(data);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            callback(ajax.responseText);
        }
    }
}

/**
 * jsonp
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-30
 * @param   {[type]}   src
 * @param   {Function} cb
 * @param   {Function} callback
 * @param   {string}   data
 * @return  {undefined}
 */
function jsonp(src, cb, callback, data) {
    // 创建script标签;
    var script = document.createElement("script");
    // 创建随机函数名;
    var randomCallback = "callback" + parseInt(Math.random() * 1000);
    // 随机名称的全局函数;
    window[randomCallback] = function(res) {
        callback(res);
    }
    //http://www.baidu.com?callback=随机全局函数;
    src = data ? src + "?" + cb + "=" + randomCallback + "&" + data : src + "?" + cb + "=" + randomCallback;
    script.src = src;
    document.body.appendChild(script);
    script.onload = function() { //当script加载成功后;
        setTimeout(function() {
            //删除无用script标签;
            script.remove();
            //删除无用全局函数;
            delete window[randomCallback];
        }, 100);
    }
}

/**
 * ajaxGetByPromise
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-28
 * @param   {string}   url
 * @param   {string}   data
 * @return  {Promise}
 */
function ajaxGetByPromise(url, data) {
    var promise = new Promise(function(success, failed) {
        var ajax = null;
        if (window.XMLHttpRequest) {
            ajax = new XMLHttpRequest();
        } else {
            ajax = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (data) { // data has value
            url = url + "?" + data;
        }
        ajax.open("GET", url, true);
        ajax.send();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200) {
                success(ajax.responseText);
            }
        }
        setTimeout(function() {
            failed("服务器响应无效");
        }, 5000);
    });
    return promise;
}

////////////////////////////
// Move Animate Frame 1.0 //
////////////////////////////
/**
 * Implementation: A attribute move.
 * 
 * @author wiolem
 * @version 1.0.0
 * @date    2017-11-21
 */

/**
 * move
 * 
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-21
 * @param   {Element}   dom
 * @param   {string}   attr eg:width height top left opacity...
 * @param   {target}   target
 * @return  {undefined}
 */
function move(dom, attr, target) {
    clearInterval(dom.timer);
    dom.timer = setInterval(function() {
        if (attr == "opacity") {
            var cursor = getStyle(dom, attr) * 100;
        } else {
            var cursor = parseInt(getStyle(dom, attr));
        }
        var speed = (target - cursor) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (target == cursor) {
            clearInterval(dom.timer);
        } else {
            if (attr == "opacity") {
                dom.style.filter = 'alpha(opacity:' + (cursor + speed) + ')';
                dom.style[attr] = (cursor + speed) / 100;
            } else {
                dom.style[attr] = cursor + speed + "px";
            }
        }
    }, 30);
}

/////////////////////////////
// Move Animate Frame 2.0  //
/////////////////////////////

/**
 * Implementation: Any attribute && Multiattribute move.
 * Bugs: The timer cannot close properly.
 * 
 * @author wiolem
 * @version 2.0.0
 * @date    2017-11-21
 */

/**
 * move
 *
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-11-21
 * @param   {Element}   dom		Native element object.
 * @param   {Object}   json		eg:{width:1130,height:350,opacity:30,...}.
 * @param   {Function} callback		Call after the animation is over.
 * @return  {undfined}
 */
function moveMultiAttr(dom, json, callback) {
    dom.timer = {};
    for (let attr in json) { //json{width:1130,height:350}
        dom.timer[attr] = setInterval(function() {
            if (attr == "opacity") {
                var cursor = getStyle(dom, attr) * 100;
            } else {
                var cursor = parseInt(getStyle(dom, attr));
            } //cursor => start position
            var speed = (json[attr] - cursor) / 10; //json[attr] => target
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (cursor == json[attr]) {
                clearInterval(dom.timer[attr]);
                var count = 0;
                delete dom.timer[attr]; //clear timers
                for (var i in dom.timer) {
                    count++;
                }
                if (count == 0) { //clear all timers
                    if (typeof callback === "function") { //To prevent an error
                        callback();
                    }
                }
            } else {
                if (attr == "opacity") {
                    dom.style.opacity = (cursor + speed) / 100;
                } else {
                    dom.style[attr] = cursor + speed + "px";
                }
            }
        }, 30);
    }
}

/////////////////////////////
// Move Animate Frame 2.0  //
/////////////////////////////

/**
 * Implementation: Any attribute && Multiattribute move.
 * Bugs: The animation cannot be completed.
 * 
 * @author wiolem
 * @version 2.0.0
 * @date    2017-12-01
 */

/**
 * moveMultiAttr2
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-12-01
 * @param   {Element}   dom		Native element object.
 * @param   {Object}   json		eg:{width:1130,height:350,opacity:30,...}.
 * @param   {Function} callback		Call after the animation is over.
 * @return  {undfined}
 */
function moveMultiAttr2(obj, json, callback) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var flag = true;
        for (var attr in json) {
            var current = 0;
            if (attr == "opacity") {
                current = parseFloat(getStyle(obj, attr)) * 100;
            } else if (attr == "zIndex") {
                current = parseInt(getStyle(obj, attr));
            } else {
                current = parseInt(getStyle(obj, attr));
            }
            var speed = (json[attr] - current) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            if (current != json[attr]) {
                flag = false;
            }
            if (attr == "opacity") {
                obj.style.opacity = (current + speed) / 100;
            } else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            } else {
                obj.style[attr] = current + speed + "px";
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (callback) {
                callback();
            }
        }
    }, 30)
}

/**
 * impact
 * This is a cool && pretty function
 * @author wiolem
 * @date    2017-12-01
 * @param   {Object}   obj  eg: A moving Object
 * @param   {Object}   target  eg: Target Object
 * @return  {boolean}	true:impact || false:noImpact
 */
function impact(obj, target) {
    var L1 = obj.offsetLeft + obj.offsetWidth;
    var R1 = obj.offsetLeft;
    var T1 = obj.offsetTop + obj.offsetHeight;
    var B1 = obj.offsetTop;

    var L2 = target.offsetLeft;
    var R2 = target.offsetLeft + target.offsetWidth;
    var T2 = target.offsetTop;
    var B2 = target.offsetTop + target.offsetHeight;
    if (L1 < L2 || R1 > R2 || T1 < T2 || B1 > B2) { // noImpact
        return false;
    } else {
        return true;
    }
}