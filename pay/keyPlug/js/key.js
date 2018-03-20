/**
 * Created by Administrator on 2017/6/23 0023.
 */
window.CreatKey = (function(){
    var definedKey = function(){
    };
    definedKey.prototype = {
        keyInit:function(obj){
            this.itvShow = true;                             /*控制光标闪动*/
            this.content = document.getElementById(obj.ele); /*容器div 用来放置键盘*/
            this.cur = document.getElementById(obj.cursor);  /*光标 若没有则注释掉*/
            this.numDiv = document.getElementById(obj.num);   /*模拟input输入框的div 用来显示输入的值 数值输入时需使用此项*/
            this.alert = document.getElementById(obj.ale);     /*自定义弹框*/
            this.tip = document.getElementById(obj.tip);       /*自定义内容 若无此需求 干掉*/
            this.token = obj.token;                            /*token值*/
            this.browser = obj.browser;                       /*浏览器型号*/
            this.td = document.getElementsByTagName('td');  /*键盘按键集合*/
            this.mdiv = document.getElementById('mdiv1');   /*光标容器 若没有则注释掉*/
            this.addHtml();
            this.cursorFlash(this.cur);
            this.changeBgcolor();
            this.inputNum();
            this.keyShow();
        },

        /*初始化html*/
        addHtml:function(){
            var _this = this;
            _this.content.innerHTML = this.createHtml();
        },
        /*创建html*/
        createHtml:function(){
            this.html = "";
            this.html += '<div class="foot_key" id="foot_key">';
            this.html +=     '<table class="tab_key">';
            this.html +=        '<tr>';
            this.html +=            '<td>1</td>';
            this.html +=            '<td>2</td>';
            this.html +=            '<td>3</td>';
            this.html +=            '<td rowspan="2" data-code="1"><img src="../image/del.png" width="30" height="20"></td>';
            this.html +=         '</tr>';
            this.html +=         '<tr>';
            this.html +=            '<td>4</td>';
            this.html +=            '<td>5</td>';
            this.html +=            '<td>6</td>';
            this.html +=          '</tr>';
            this.html +=          '<tr>';
            this.html +=             '<td>7</td>';
            this.html +=             '<td>8</td>';
            this.html +=             '<td>9</td>';
            this.html +=             '<td id="paybtn" rowspan="2" style="line-height:20px;background:#0388d1;color:#fff;font-size:16px">安全<br>支付</td>';
            this.html +=           '</tr>';
            this.html +=           '<tr>';
            this.html +=              '<td id="svgLineTutorial" data-code="2"><img src="../image/key.png" width="30" height="20"></td>';
            this.html +=              '<td>0</td>';
            this.html +=              '<td>.</td>';
            this.html +=            '</tr>';
            this.html +=          '</table>';
            this.html +=  '</div>';
            return this.html;
        },
        /*数字输入*/
        inputNum:function(){
            var _this = this;
            for(var i = 0;i<_this.td.length;i++){
                _this.td[i].onclick = function(){
                        _this.mdiv.style.display = 'none'; /*隐藏光标 若没有则注释掉*/
                        var keyHtml = this.innerHTML;
                        var nu = this.getAttribute('data-code');
                        if (nu == "1"){
                            keyHtml = 'X';
                        }
                        if (keyHtml=='安全<br>支付'){
                            pay();
                            return;
                        }
                        if (nu == "2"){
                            clskey();
                            return;
                        }
                        hkey(keyHtml);
                }
            }
            function pay(){
                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                var count = _this.numDiv.innerHTML;
                if(!reg.test(count)){
                    _this.tip.innerHTML = '请输入正确的金额';
                    _this.alert.style.display = 'block';
                }else {

                    var ale = document.getElementsByClassName('alert')[0];
                    _this.alert.style.display = 'block';
                    ale.tip.style.display = 'none';
                    /**
                     * 中信表单提交
                     * **/

                        /*
                    var form = document.getElementById('money_form');//表单id；
                    var money = document.getElementById('money_val');
                    money.value = count;
                    form.submit();
                    */
                     /*哆啦宝使用ajax提交*/
                    var xhr = new XMLHttpRequest();
                    xhr.open('get','http://machong8888.6655.la/pay/order?token='+_this.token+'&amount='+count+'&version='+_this.browser,true);
                    xhr.send(null);
                    xhr.onreadystatechange = function(){
                        if (xhr.readyState == 4){
                            if(xhr.status == 200){
                                var result = xhr.responseText;
                                console.log(result);
                            }
                        }
                    }
                }
            }
            function hkey(v){
                if (v == 'X'){
                    this.str = _this.numDiv.innerHTML;
                    if (this.str!=""){
                        _this.numDiv.innerHTML = this.str.substring(0,this.str.length-1);
                    }else{
                        _this.mdiv.style.display = 'block';
                    }
                }else{
                    _this.numDiv.innerHTML = _this.numDiv.innerHTML + v ;
                }
            }
            function clskey(){
                _this.content.style.display = 'none';
                _this.mdiv.style.display = 'none';
                window.scrollTo(0,0);
            }
        },
        keyShow:function(){
            var _this = this;
            _this.numDiv.onclick = function(){
                _this.content.style.display = 'block';
                _this.mdiv.style.display = 'block';
            };
        },
        /*光标闪动*/
        cursorFlash:function(obj){
            var _this = this;
            this.itv = setInterval(function(){
                if(_this.itvShow){
                    _this.itvShow = false;
                    obj.style.display = "block";
                }else{
                    _this.itvShow = true;
                    obj.style.display = "none";
                }
            },600);
            return this.itv;
        },
        /*点击改变背景色*/
        changeBgcolor:function(e){
            var _this = this;
            var el = null;
            for(var i = 0;i<_this.td.length;i++){
                _this.td[i].addEventListener('touchstart',changePro);
                _this.td[i].addEventListener('touchend',endEvent);
            }
            function changePro(e){
                var that = this;
                this.firstTouch = e.touches[0];
                el = this.firstTouch.target;
                this.bgc = this.style.backgroundColor;
                this.style.backgroundColor = '#ccc';
                setTimeout(function(){
                    that.style.backgroundColor = that.bgc;
                },50)
            }
            function endEvent(e){
                e.preventDefault();
                this.event = getEvent(el,e,'click');
                el.dispatchEvent(this.event);
            }
            function getEvent(el, e, type) {
                e = e.changedTouches[0];
                var event = document.createEvent('MouseEvents');
                event.initMouseEvent(type, true, true, window, 1, e.screenX, e.screenY, e.clientX, e.clientY, false, false, false, false, 0, null);
                event.forwardedTouchEvent = true;
                return event;
            }
        }
    };
    return definedKey;
})();