$(document).ready(function(){
    var storage =["yoshi","mario","luigi","zelda","link","bowser","starfox","icarus","snorlax","pikachu","captain falcon","donkey kong","princess peach"];
    var cpus ="";
    var hu ="";
    var p1 ="";
    var p2 ="";
    var p =0;
    var g ="";
    var w=0;
    var t=0;
    var s=0;
    var sl=0;
    var p2Can=0;
    var answers =[];
    $(".wletters").hide();
    $("#gprompt").hide();
    $(".players").hide();
    $("#start").click(function(){
        $("#start").hide();
        $("#hangman").hide();
        $(".players").fadeIn("slow");
        $("#p1").click(function(){
            p1Start();
        });
        $("#p2").click(function(){
            p2Start();
        });
        
    });





var p1Start = function(){
    p=1;
    $(".players").hide();
    p1=prompt("Please enter your name");
    if(p1==null){
      location.reload();
    } 
    else if (p1.length>10){
      alert("You've entered too many characters")
      p1Start();
    }
    else if(p1){
      Guess();
    }
   
    else{
      p1Start();
    }
   
};




var p2Start = function(){
    p=2;
    $(".players").hide();
    if(p2Can===0){
      p1=prompt("Player 1, you will be guessing. Please enter your name");
        if(p1==null){
        location.reload();
        }
        else if(p1===""){
          p2Start();
        }
        else if(p1.length>10){
          alert("You've entered too many characters")
          p2Start();
        }
        else if(p1){
          p2=prompt("Player 2, please enter your name");
            if(p2==null){
              location.reload();
            }
            else if(p2===""){
              p2Can=1;
              p2Start();
            }
            else if(p2.length>10){
              alert("You've entered too many characters");
              p2Can=1;
              p2Start();
            }
          else if(p2){
            confirm("Please make sure the screen is not visable to " + p1 + " before clicking OK");
            if(confirm==null){
              location.reload();
            }
            else{
              huValid();
            }
          }
        }
      
    }
    else if(p2Can===1){
        p2=prompt("Player 2, please enter your name");
        if(p2==null){
          location.reload();
        }
        else if(p2===""){
          p2Can=1;
          p2Start();
        }
        else if(p2.length>10){
          alert("You've entered too many characters");
          p2Can=1;
          p2Start();
        }
        else if(p2){
          confirm("Please make sure the screen is not visable to " + p1 + " before clicking OK");
          if(confirm==null){
            location.reload();
          }
          else{
            huValid();
          }
        }
        
    }
    
    
    
    
};

var huValid = function(){
  hu=prompt(p2 + ", please enter your word or phrase, it must be 3-14 characters including spaces").toLowerCase();
  console.log("hu is " + hu);
    if (hu==null){
      location.reload();
    }
    else if (hu.length > 14 || hu.length < 4 || hu.match(/[^a-z ]/)){
      alert("Must be 3 - 14 characters long, including spaces without punctuation");
      huValid();
    }
    else if(hu){
      Guess();
    }
    else{
      alert("field left blank");
      huValid();
    }
};




var Guess = function(){
    if (p===1){
        alert(p1 + ", get ready to play!");
        $("#gprompt").fadeIn("slow");
        $("#g").select();
        Cpu();
    }
    else if(p===2){
        alert(p1 + ", time for you to guess!");
        $("#gprompt").fadeIn("slow");
        Hu();
    }
    else{
        alert("Something went wrong");
    }
};



var Cpu = function(){
    cpus = storage[Math.floor(Math.random() * storage.length)];
    var length = cpus.length;
    
    for (var i =0; i< cpus.length;i++){
        if(cpus[i].match(/[a-z]/)){
            $("#w"+i).show();
        }
        else if (cpus[i].match(/[ ]/)){
            $("#w"+i).removeClass("wletters");
            $("#w"+i).addClass("spaces");
            $("<br>").insertAfter("#w"+i);
            $("#w"+i).show();
            s+=1;
        }
    }
};

var Hu = function(){
  for (var i =0; i< hu.length; i++){
    if(hu[i].match(/[a-z]/)){
      $("#w"+i).show();
    }
    else if(hu[i].match(/[ ]/)){
      $("#w"+i).removeClass("wletters");
      $("#w"+i).addClass("spaces");
      $("<br>").insertAfter("#w"+i);
      $("#w"+i).show();
      s+=1;
    }
  }
  
};


$("button").click(function(){
    $("#g").select();
    g= $("#g").val().toLowerCase();
    if(answers.indexOf(g) !==-1){
      alert("You already chose that letter!");
    }
    else{
      answers.push(g);
      var r=0;
    if (p===1){
          for (var x =0; x< cpus.length; x++){
              if(cpus[x]===g){
                gU=g.toUpperCase();
                  $("#w"+x).append(gU);
                  r+=1;
                  t+=1;
              }
        
          }
          if (r===0){
              w+=1;
              wAnswers(g);
              drawMan(w);
          }
          if (w===11){
              alert("You lost!");
              $(".wletters").effect("explode");
              location.reload();

          }
          else if(t===cpus.length-s){
              alert("Congratulations, " + p1 + ". You won!");
              $(".wletters").effect("explode");
              location.reload();
          }
    }
    else if(p===2){
      for (var i =0; i< hu.length; i++){
        if(hu[i]===g){
          gU=g.toUpperCase();
          $("#w"+i).append(gU);
          r+=1;
          t+=1;
        }
      }
      if (r===0){
        w+=1;
        wAnswers(g);
        drawMan(w);
      }
      if (w===11){
        alert(p2 + " wins!");
        $(".wletters").effect("explode");
        location.reload();
      }
      else if(t===hu.length-s){
        alert(p1 + " wins!");
        $(".wletters").effect("explode");
        location.reload();
      }
    }
  }


});

var wAnswers = function(letter){
  var my_canvas = document.getElementById("a");
  var ctx = my_canvas.getContext("2d");
  ctx.font = "16px Comic Sans MS";
  ctx.fillStyle=("red");
  ctx.fillText(g,15+sl,400);
  sl+=20;
};


var drawMan = function(number){
  var my_canvas = document.getElementById("a");
  var ctx = my_canvas.getContext("2d");
  switch(number){
    case 1:
    ctx.beginPath();
    ctx.fillStyle=("black");
    ctx.fillRect(95,300,275,10);
    break;
    case 2:
    ctx.fillStyle=("black");
    ctx.fillRect(95,300,10,-250);
    break;
    case 3:
    ctx.fillStyle=("black");
    ctx.fillRect(95,40,150,10);
    break;
    case 4:
    ctx.fillStyle=("black");
    ctx.fillRect(240,40,10,50);
    break;
    case 5:
    ctx.fillStyle=("black");
    ctx.arc(245,120,30,0,2*Math.PI);
    ctx.stroke();
    break;
    case 6:
    ctx.fillStyle=("black");
    ctx.fillRect(245,150,1,75);
    break;
    case 7:
    ctx.fillStyle=("black");
    ctx.moveTo(200, 200);
    ctx.lineTo(245, 155);
    ctx.stroke();
    break;
    case 8:
    ctx.fillStyle=("black");
    ctx.moveTo(290, 200);
    ctx.lineTo(245, 155);
    ctx.stroke();
    break;
    case 9:
    ctx.fillStyle=("black");
    ctx.moveTo(200, 280);
    ctx.lineTo(245, 225);
    ctx.stroke();
    break;
    case 10:
    ctx.fillStyle=("black");
    ctx.moveTo(290, 280);
    ctx.lineTo(245, 225);
    ctx.stroke();
    ctx.closePath();
    break;
    case 11:
    ctx.fillStyle=("black");
    ctx.beginPath();
    ctx.arc(245,140,10,0,Math.PI,true);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(230, 120);
    ctx.lineTo(240, 110);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(240, 120);
    ctx.lineTo(230, 110);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250, 120); //first number across
    ctx.lineTo(260, 110); //first number across
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(260, 120);
    ctx.lineTo(250, 110);
    ctx.stroke();
    break;
  }
};



});

//wAnswers canvas
//push to answer array
