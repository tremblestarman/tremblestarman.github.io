var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
animate();

var cx = window.innerWidth / 2;
var cy = window.innerHeight / 2;

var theta = 0;
var size = 1;
function animate()
{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "#000000";
    cx = window.innerWidth / 2;
    cy = window.innerHeight / 2;

    c.clearRect(0, 0, innerWidth, innerHeight);
    requestAnimationFrame(animate);

    wheel_(size);
    gear_0(theta, size);
    gear_1(theta, size);
    arm_0(theta, size);
    arm_1(theta, size);
    clip_(theta, size);
    clip_arm(theta, size);

    theta += 2;
    if (theta > 360) {
        theta = 0;
    }

    if (clipping) { //When Clipping
        canvas.style.background = "gray";
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
    /**/
    if (size < 3)
        size += 0.05;
}
var clipping = false;
function clipped()
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