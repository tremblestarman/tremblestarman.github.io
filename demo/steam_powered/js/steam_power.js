var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var cx = window.innerWidth / 2;
var cy = window.innerHeight / 2;

var difficulty = 1;

var theta = 0;
var size = 1;
var velocity = 1;

function MoneyPool() {
    var pool = new Array();
    this.pool = pool;
    this.update = function() {
        for (const i of pool) {
            i.update();
            if (i.x + i.vx >= window.innerWidth + 300 || i.y + i.vy >= window.innerHeight + 120 || i.x < -200 || i.y < -120)
                pool.splice(pool.indexOf(i), 1);
        }
    }
}
function Money(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;

    this.update = function() {
        c.fillStyle = "green";
        c.fillRect(this.x + this.vx, this.y + this.vy, 200, 120);
        c.fillStyle = "lime";
        c.fillRect(this.x + this.vx + 30, this.y + this.vy, 2, 120);
        c.fillStyle = "lime";
        c.fillRect(this.x + this.vx + 168, this.y + this.vy, 2, 120);
        c.beginPath();
        c.arc(this.x + this.vx + 100, this.y + this.vy + 60, 50, 0, Math.PI * 2);
        c.fill();
        c.fillStyle = "green";
        c.beginPath();
        c.arc(this.x + this.vx + 100, this.y + this.vy + 60, 40, 0, Math.PI * 2);
        c.fill();
        c.font = 'bolder 65px Georgia, Serif';
        c.fillStyle = "lime";
        c.fillText("$", this.x + this.vx + 80, this.y + this.vy + 80);
        this.vy += 0.2;
        this.x += this.vx;
        this.y += this.vy;
    }
}

var moneyPool = new MoneyPool(); //Money Animation Pool

animate();
function animate()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = window.innerWidth / 2;
    cy = window.innerHeight / 2;

    c.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    wheel_(size);
    money(size);
    gear_0(theta, size);
    gear_1(theta, size);
    arm_0(theta, size);
    arm_1(theta, size);
    clip_(theta, size);
    clip_arm(theta, size);
    moneyPool.update(); //MoneyFly Animation

    theta += 2 * velocity;
    if (theta > 360) {
        theta = 0;
    }

    if (clipping) { //When Clipping
        canvas.style.background = "gray";
        if (theta <= 60 && theta >= 50 && _suck_d == 0) //Clipping
        {
            money_suck(size);
            if (size < 2)
                size += 0.02 * difficulty;
            if (size < 1) size = 1;
            if (velocity <= 10)
                velocity += 0.05 * difficulty;
            if (velocity < 1) velocity = 1;
        }
    } else { canvas.style.background = "black"; }
}

function wheel_(resize) //Wheel
{
    if (resize > 3.0) resize = 3.0;
    c.fillStyle = "#191970";
    c.beginPath();
    c.arc(cx, cy, 100 * resize, 0, Math.PI * 2, true);
    c.fill();
}
function gear_0(angle, resize) //Gear0
{
    angle -= 37.5;
    var x = (cx + 50 * Math.cos(angle / 180 * Math.PI) * resize);
    var y = (cy + 50 * Math.sin(angle / 180 * Math.PI) * resize);
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.arc(x, y, 37.5 * resize, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.fillStyle = "#191970";
    c.beginPath();
    c.arc(x, y, 25 * resize, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.arc(x, y, 18 * resize, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
}
function gear_1(angle, resize) //Gear1
{
    angle += 142.5;
    var x = (cx + 52 * Math.cos(angle / 180 * Math.PI) * resize);
    var y = (cy + 52 * Math.sin(angle / 180 * Math.PI) * resize);
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.arc(x, y, 28 * resize, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.fillStyle = "#191970";
    c.beginPath();
    c.arc(x, y, 21 * resize, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.arc(x, y, 15 * resize, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
}
function arm_0(angle, resize) //Arm0
{
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    angle += 11;
    var d = 37.5;
    c.moveTo(cx + Math.cos(angle / 180 * Math.PI) * resize * d, cy + Math.sin(angle / 180 * Math.PI) * resize * d);
    c.lineTo(cx + Math.cos((angle - 97) / 180 * Math.PI) * resize * d, cy + Math.sin((angle - 97) / 180 * Math.PI) * resize * d);
    angle += 162;
    d = 36;
    c.lineTo(cx + Math.cos(angle / 180 * Math.PI) * resize * d, cy + Math.sin(angle / 180 * Math.PI) * resize * d);
    c.lineTo(cx + Math.cos((angle - 61) / 180 * Math.PI) * resize * d, cy + Math.sin((angle - 61) / 180 * Math.PI) * resize * d);
    c.fill();
}
function arm_1(angle, resize) //Arm1
{
    angle += 142.5;
    var x = (cx + 52 * Math.cos(angle / 180 * Math.PI) * resize);
    var y = (cy + 52 * Math.sin(angle / 180 * Math.PI) * resize);
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.moveTo(x, y - 15 * resize);
    c.lineTo(x, y + 15 * resize);
    c.lineTo(x - 200 * resize, y + 15 * resize);
    c.lineTo(x - 200 * resize, y - 15 * resize);
    c.fill();
}

function clip_(angle, resize) //Clip
{
    angle += 142.5;
    var x = (cx + 52 * Math.cos(angle / 180 * Math.PI) * resize);
    var y = (cy + 52 * Math.sin(angle / 180 * Math.PI) * resize);
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.arc(x - 200 * resize, y, 28 * resize, Math.PI / 2 - Math.PI, Math.PI / 2);
    c.fill();
}
var _open_d = 28;
function clip_arm(angle, resize) //Clip Arm
{
    angle += 142.5;
    var x = (cx + 52 * Math.cos(angle / 180 * Math.PI) * resize);
    var y = (cy + 52 * Math.sin(angle / 180 * Math.PI) * resize);
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.moveTo(x - 199.5 * resize, y + _open_d * resize);
    c.lineTo(x - 230 * resize, y + (_open_d - 18) * resize);
    c.lineTo(x - 199.5 * resize, y + (_open_d - 18) * resize);
    c.fill();
    c.closePath();
    c.fillStyle = "#FFFFFF";
    c.beginPath();
    c.moveTo(x - 199.5 * resize, y - _open_d * resize);
    c.lineTo(x - 199.5 * resize, y - (_open_d - 20) * resize);
    c.arc(x - 199.5 * resize, y - _open_d * resize + 30 * resize, 30 * resize, Math.PI, Math.PI / 2 - Math.PI);
    c.fill();
    c.closePath();
}

canvas.onclick = function()
{
    clipped();
}
var clipping = false;
function clipped() //When Clicked
{
    if (_open_d < 24) {
        _open_d = 28;
        return;
    }
    if (_open_d > 25 && _open_d < 26.5) clipping = true;
    else clipping = false;
    requestAnimationFrame(clipped);
    _open_d -= 0.6;
}

var _suck_d = 0; //Money Animation x-distance
var delay = 0; //Delay
var count = 1; //Count
var fill_speed = 1; //Speed
function money(resize)
{
    if (_suck_d == -100) return; //When Sucked
    c.fillStyle = "green";
    c.fillRect(cx - (400 - _suck_d) * resize, cy - 2 * count, 130 * resize, 4 * count);
    c.fillStyle = "lime";
    c.fillRect(cx - (370 - _suck_d) * resize, cy - 2 * count, 2 * resize, 4 * count);
    c.fillStyle = "lime";
    c.fillRect(cx - (302 - _suck_d) * resize, cy - 2 * count, 2 * resize, 4 * count);
    blocked(resize);
}
function money_suck()
{
    if (_suck_d > 70) {
        moneyPool.pool.push(new Money(cx - (302 - _suck_d) * size, cy - 60 * size, 3, -10)); //Drop Animation
        _suck_d = -100;
        money_summon(); //Reload
        return;
    }
    requestAnimationFrame(money_suck);
    _suck_d += fill_speed;
}
function money_summon()
{
    if (delay > 0) delay --;
    else if (delay == 1) _suck_d = -70;
    else {
        _suck_d += fill_speed;
        if (_suck_d > -1) return;
    }
    requestAnimationFrame(money_summon);
}
function blocked(resize)
{
    c.fillStyle = "black";
    if (clipping) c.fillStyle = "gray";
    c.fillRect(cx - 500 * resize, cy - 3 * count, 150 * resize, 6 * count);
}
/*
Chageable Values:
* difficulty (related to velocity & thea)
* count (related to Amount of Money)
* delay (related to Delay of Money Occurrence)
* fill_speed (related to Speed of Money Occurrence)

Plan
1.Money Fly Animation
2.Adaptable Size
3.Scores
 * Money you got
 * Discount you made
4.Random Events
 * Bad Effect :
    * Complaint
    * 
*/