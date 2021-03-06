enchant();

window.onload = function(){
    var game = new Core(320, 320);
    game.fps = 15;
    game.preload("images/chara1.png");
    game.onload = function(){
        var bear = new Sprite(32, 32);
        bear.image = game.assets["images/chara1.png"];
        bear.x = 0;
        bear.y = 0;
        bear.addEventListener(enchant.Event.TOUCH_START, function(e){
      		originX = e.x - this.x;
      		originY = e.y - this.y;
      	});
      	bear.addEventListener(enchant.Event.TOUCH_MOVE, function(e){
      		this.x = e.x - originX;
      		this.y = e.y - originY;
      	});
        game.rootScene.addChild(bear);
    };
    game.start();

    msgArea = document.getElementById("msg");
};

// 1.イベントとコールバックの定義
var socketio = io.connect('http://localhost:3000');

socketio.on("connected", function(name) {});
socketio.on("publish", function (data) { addMessage(data.value); });
socketio.on("disconnect", function () {});

// 2.イベントに絡ませる関数の定義
function start(name) {
  socketio.emit("connected", name);
}

function publishMessage() {
  var textInput = document.getElementById('msg_input');
  var msg = "[" + myName + "] " + textInput.value;
  socketio.emit("publish", {value: msg});
  textInput.value = '';
}

function addMessage (msg) {
  var domMeg = document.createElement('div');
  domMeg.innerHTML = new Date().toLocaleTimeString() + ' ' + msg;
  msgArea.appendChild(domMeg);
}

// 3.開始処理
var msgArea = document.getElementById("msg");
var myName = Math.floor(Math.random()*100) + "さん";
addMessage("貴方は" + myName + "として入室しました");
start(myName);
