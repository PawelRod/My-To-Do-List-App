// LOADING PAGE ON-LOAD

window.addEventListener('load', function(){
  const loading = document.querySelector('.loading-page');
});

// ADD TASK & VALIDATION

const html = document.querySelector('html');
let placeholder = document.querySelector('input[type=text]');

html.onclick = function() {
  value.style.borderBottom = ".4px solid black";
  placeholder.classList.remove('red-placeholder');
  placeholder.placeholder = "Write here...";
}

const addForm = document.forms['add-task'];
const list = document.querySelector("#list ol")
const value = addForm.querySelector('input[type="text"]');

addForm.addEventListener('submit', function(f){

  f.preventDefault();

  const valueOfValue = addForm.querySelector('input[type="text"]').value;

  if(valueOfValue == "") {

    value.style.borderBottom = ".4px solid red";
    placeholder.classList.add('red-placeholder');
    placeholder.placeholder = "Type text first!";
    
    return false;

  } else {

    value.value = "";

    const p = document.createElement('p');
    const li = document.createElement('li');
    const taskName = document.createElement('div');
    const deleteBtn = document.createElement('span');
    const doneBtn = document.createElement('span');
  
    li.appendChild(taskName);
    li.appendChild(deleteBtn);
    li.appendChild(doneBtn);
    li.appendChild(p);
  
    deleteBtn.textContent = 'X';
    doneBtn.nextElementSibling.textContent = 'V';
    taskName.textContent = valueOfValue;
  
    taskName.classList.add('list-border');
    deleteBtn.classList.add('delete-button', 'no-print');
    doneBtn.classList.add('done-button');

    list.appendChild(li);

  }
});


// DELETE TASK

list.addEventListener('click', function(e){
  if (e.target.className == 'delete-button no-print') {
    const li = e.target.parentElement;
    list.removeChild(li);
  }
})


// CHECKBOXES

const ol = document.querySelector('ol');

ol.addEventListener('click', function(d){
  if(d.target.className == 'done-button') {
    const li = d.target.parentElement;
    const v = d.target.nextElementSibling;
    li.classList.toggle('checked');
    v.classList.toggle('green-initial-display');
  }
});


// CLEAR 'EXAMPLE' ELEMENT FROM LIST

const button = document.querySelector('button');
const exampleTask = document.querySelector('li.example-task')

button.addEventListener('click', function(){
  if(ol.children[0].className == 'example-task' || ol.children[0].className == 'example-task checked'){
    exampleTask.classList.remove('example-task');
    ol.removeChild(exampleTask);
  } else {
    return true;
  }
});

// PDF SCREENSHOT

function genPDF() {
  html2canvas(document.getElementById('list'), {
    onrendered: function(canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF("p", "mm", "a4");
      var width = doc.internal.pageSize.width;    
      var height = doc.internal.pageSize.height;
      doc.addImage(img, 'JPEG', 8, 0, width, height);
      doc.save('my-to-do-list.pdf');
    }
  });
}


// PRINT

const print = document.getElementById("print");
print.addEventListener("click", function() {
  window.print();
});


// DATE TOP

var dt = new Date();
document.getElementById("datetime").innerHTML = (("0"+dt.getDate()).slice(-2)) +"/"+ (("0"+(dt.getMonth()+1)).slice(-2)) +"/"+ (dt.getFullYear());


// CLOCK

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}