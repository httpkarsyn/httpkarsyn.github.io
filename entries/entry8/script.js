

function DONGHUA(sel){
    
    var cxt = document.body.querySelector(sel);
    
    var reqFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(callback){window.setTimeout(callback,1000/60);}
    var cancFrame = window.cancelAnimationFrame || window.msRequestAnimationFrame || function(reqID){window.clearTimeout(reqID);}
    
    var f = {
        '-': function(x){
            return x;
        },
        '<': function(x){
            return Math.pow(x,2);
        },
        '>':function(x){
            return 1-Math.pow(x-1,2);
        },
        'fkbounce': function(x){
            let a = 2.7;
            let c = 1/(2*Math.sqrt(a))+0.5;
            let b = 1-a*Math.pow(1-c,2);

            if (x<1/Math.sqrt(a)) return a*Math.pow(x,2);
            return a*Math.pow(x-c,2)+b;
        }
    };
    
    
    function Donghua(t,st,a,an){
        this.target = t;
        this.attr = a;
        this.curve = f[an.ease] || f['-'];
        this.duration = an.duration || 1000;
        this.delay = an.delay || 0;
        this.loop = an.loop || 'false';
        this.req;
        this.start = st + this.delay;
        this.from = {};
        
   
        this.getFrom();
        window.setTimeout(this.init.bind(this),this.delay);
    }
    Donghua.prototype.init = function(){
        this.req = reqFrame(this.dong.bind(this));
    }
    Donghua.prototype.getFrom = function(){
        for (var i in this.attr){
            this.from[i] = this.target.getAttribute(i);
        }
    }
    Donghua.prototype.dong = function(timestamp){
        let ts = timestamp || performance.now();
        let x = (ts - this.start) / this.duration;
        
        x = (x > 1) ? 1 : x;
        
        this.hua(x);
        
        if (x < 1) {
            this.req = reqFrame(this.dong.bind(this));
            return;
        } else if (x === 1 && this.loop === true){
            this.start = performance.now();
            this.req = reqFrame(this.dong.bind(this));
            return;
        }
        cancFrame(this.req);
    }
    Donghua.prototype.hua = function(x){
        for (let i in this.attr){
            if (/^(#?)([a-f\d]{3})$/i.test(this.attr[i]) || /^(#?)([a-f\d]{6})$/i.test(this.attr[i])){
                let colorTo = this.hex2rgb(this.attr[i]);
                let colorFrom = this.hex2rgb(this.from[i]);
                let color = this.scale(colorFrom,colorTo,this.curve(x));
                color = this.rgb2hex(color);
                this.target.setAttribute(i,color);
            } else {
                this.target.setAttribute(i,this.scale(this.from[i],this.attr[i],this.curve(x)));
            }
        }
    }
    Donghua.prototype.rgb2hex = function(rgb){
        let result = {};
        for (let i in rgb){
            result[i] = rgb[i].toString(16);
            if (result[i].length === 1) result[i] = '0'+result[i];
        }
        return '#'+result.r+result.g+result.b;
    }
    Donghua.prototype.hex2rgb = function(hex){
        let shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shortHexRegex,function(m,r,g,b){return r+r+g+g+b+b;});
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return (result) ? {r:parseInt(result[1],16),g:parseInt(result[2],16),b:parseInt(result[3],16)} : null;
    }
    Donghua.prototype.scale = function(os,ts,fx){
        if (typeof os === 'object' && os !== null && typeof ts === 'object' && ts !== null) {
            let result = {};
            for (let i in os){
                result[i] = Math.floor(os[i]+(ts[i]-os[i])*fx);
            }
            return result;
        } else {
            os = Number(os);
            ts = Number(ts);
            fx = Number(fx);
            return os+(ts-os)*fx;
        }
    }
    
    function createSVG(type){
        let ns = 'http://www.w3.org/2000/svg';
        return document.createElementNS(ns,type);
    }
    
    function ToSvg(s){
        this.svgstr = s;
        
        this.svg = function(){
            let d = document.createElement('div');
            d.innerHTML(this.svgstr);
            return d.firstChild;
        }
        
        return this.svg();
    }
    
   
    function Svg(){
        this.element;
        this.donghua;
        this.afterWait = 0;
    }
    Svg.prototype = {
        attr:function(attr){
            attr = (typeof attr === 'object' && attr !== null) ? attr : {};
            for (var i in attr){
                this.element.setAttribute(i,attr[i]);
            }
            
            return this;
        },
        getAttr:function(attrStr){
            attrStr = (typeof attrStr !== 'string' || attrStr === 'undefined') ? '' : attrStr;
            return this.element.getAttribute(attrStr);
        },
        animate:function(attr,anime){
            attr = attr || {};
            anime = anime || {};
            this.donghua = new Donghua(this.element,performance.now(),attr,anime);
            if (this.afterWait < this.donghua.duration + this.donghua.delay) {
                this.afterWait = this.donghua.duration + this.donghua.delay;
            }
            return this;
        },
        after:function(func,delay){
            delay = delay || 0;
            window.setTimeout(func.bind(this),this.afterWait+delay);
            this.afterWait = 0;
            return this;
        },
        click:function(func,bubble){
            bubble = bubble || false;
            this.element.addEventListener('click',func.bind(this),bubble);
            return this;
        },
        remove:function(){
            this.element.parentNode.removeChild(this.element);
            return null;
        }
    };
    
    
    function Circle(){
        Svg.call(this);
        
        this.element = createSVG('circle');
    }
    Circle.prototype = Object.create(Svg.prototype);
    Circle.prototype.constructor = Circle;
    
    function Rect(){
        Svg.call(this);
        
        this.element = createSVG('rect');
    }
    Rect.prototype = Object.create(Svg.prototype);
    Rect.prototype.constructor = Rect;
    
    function Line(){
        Svg.call(this);
        
        this.element = createSVG('line');
    }
    Line.prototype = Object.create(Svg.prototype);
    Line.prototype.constructor = Line;
    
    function Path(){
        Svg.call(this);
        
        this.element = createSVG('path');
    }
    Path.prototype = Object.create(Svg.prototype);
    Path.prototype.constructor = Path;
    
    function Text(){
        Svg.call(this);
        
        this.element = createSVG('text');
        
        this.content = function(txt){
            this.element.textContent = txt;
            return this;
        }
    }
    Text.prototype = Object.create(Svg.prototype);
    Text.prototype.constructor = Text;
    
    
    return {
        circle:function(){
            let circle = new Circle();
            cxt.appendChild(circle.element);
            return circle;
        },
        rect:function(){
            let rect = new Rect();
            cxt.appendChild(rect.element);
            return rect;
        },
        line:function(){
            let line = new Line();
            cxt.appendChild(line.element);
            return line;
        },
        path:function(){
            let path = new Path();
            cxt.appendChild(path.element);
            return path;
        },
        text:function(){
            let text = new Text();
            cxt.appendChild(text.element);
            return text;
        }
    };
}


var s = DONGHUA('svg');

document.body.addEventListener('click',buo,false);
document.body.addEventListener('touchstart',buo,false);

function randomColor(){
    let channel;
    let color = '#';
    for (let i=0;i<3;i++){
        channel = Math.floor(Math.random()*256).toString(16);
        if (channel.length === 1) channel = '0'+channel;
        color += channel;
    }
    return color;
}

function buo(e){
    let bodyX = e.clientX || e.touches[0].clientX;
    let bodyY = e.clientY || e.touches[0].clientY;
    let diff = Math.abs(window.innerHeight-window.innerWidth);
    let min = (window.innerHeight > window.innerWidth) ? window.innerWidth : window.innerHeight;
    let cx;
    let cy;
    let color = randomColor();
    let n = 3;
    let discs = [];
    if(window.innerHeight < window.innerWidth){
        cx = bodyX - diff/2;
        cy = bodyY;
    }else{
        cx = bodyX;
        cy = bodyY - diff/2;
    }
    cx = cx*100/min;
    cy = cy*100/min;
    for (let i=0;i<n;i++){
        discs[i] = s.circle().attr({
            cx:cx,
            cy:cy,
            r:0,
            fill:color,
            'fill-opacity':1,
            stroke:'transparent'
        }).animate({
            r:80,
            'fill-opacity':0
        },{ease:'>',duration:2000,delay:200*i}).after(function(){
            this.remove();
        });
    }
    e.preventDefault();
}

