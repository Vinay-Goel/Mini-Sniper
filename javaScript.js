/*

          MINI SNIPER-----------------JavaScript

*/

var Canvas= document. getElementById( "Canvas");
var c2d= Canvas. getContext( "2d");

var playerCanvas= document. getElementById( "player");
var pc2d= playerCanvas. getContext( "2d");

var ruleCanvas= document. getElementById( "rules");
var rc2d= ruleCanvas. getContext( "2d");

var meCanvas= document. getElementById( "me");
var mc2d= meCanvas. getContext( "2d");



c2d. canvas. width= window. innerWidth/ 2;
c2d. canvas. height= window. innerHeight* 6/ 10;

pc2d. canvas. width= window. innerWidth* 15/ 100;
pc2d. canvas. height= window. innerHeight* 8/ 10;

rc2d. canvas. width= window. innerWidth* 15/ 100;
rc2d. canvas. height= window. innerHeight* 8/ 10;

mc2d. canvas. width= window. innerWidth* 6/ 10;
mc2d. canvas. height= window. innerHeight* 2/ 10;

Canvas. style. left= "25%";
Canvas. style. position= "fixed";

playerCanvas. style. top= "10%";
playerCanvas. style. position= "fixed";

ruleCanvas. style. right= "0%";
ruleCanvas. style. top= "10%";
ruleCanvas. style. position= "fixed";

meCanvas. style. left= "20%";
meCanvas. style. bottom= "0%";
meCanvas. style. position= "fixed";

var obj= [];
var sz= 0;

var player= {life: 3, score: 0};

var _end= false;

function generate( min, max)
{
  return Math. random()* (max- min+ 1)+ min;
}

function make()
{
  var newObj= {x: 0, y: 0, dim: 0, angle: 0, active: false, speed: 0, effectOn: "", effect: 0}


  /*
  *make() function is used to create a new object that moves on the canvas...
  *object has four main parameters x, y, dim, angle defining the position, size and trajectory.
  *if bomb is true then the object is a bomb....obviously :p.
  *active tells the state of the object. If false then it is already shot by player.
  *speed tells the relative change in the position when ever it is redrawn on screen. x= x+ speed* cos( angle), y= y- speed* sin( angle), since verticle axis increases as we move down.
  *score+= award on a hit.
  */

  //Setting dimension
  newObj. dim= Math. floor( generate( 30, 38));
  //

  //Setting x and y coordinates of new target/bomb.
  var boundry= Math. floor( generate( 1, 4) );
  if( boundry== 1|| boundry== 3) newObj. x= generate( 0, Canvas. width);
  if( boundry== 2|| boundry== 4) newObj. y= generate( 0, Canvas. height);

  if( boundry== 1) newObj. y= Canvas. height+ newObj. dim;
  if( boundry== 2) newObj. x= Canvas. width+ newObj. dim;
  if( boundry== 3) newObj. y= 0.0- newObj. dim;
  if( boundry== 4) newObj. x= 0.0- newObj. dim;
  //

  //Setting angle.
  var ang= generate( 25, 65);
  if( newObj. x<= Canvas. width/ 2 && newObj. y>= Canvas. height/ 2) newObj. angle= ang;
  if( newObj. x>= Canvas. width/ 2 && newObj. y>= Canvas. height/ 2) newObj. angle= ang+ 90;
  if( newObj. x>= Canvas. width/ 2 && newObj. y<= Canvas. height/ 2) newObj. angle= ang+ 180;
  if( newObj. x<= Canvas. width/ 2 && newObj. y<= Canvas. height/ 2) newObj. angle= ang+ 270;
  //

  //Defines if target/bomb is shot by the player, if yes active= false;
  newObj. active= true;
  //

  //
  var type= Math. floor( generate( 1, 10) );
  if( type<= 5)
  {
    newObj. effectOn= "score";
    newObj. effect= +50;
    newObj. speed= 2;
  }
  if( type> 5 && type<= 7)
  {
    newObj. effectOn= "score";
    newObj. effect= -20;
    newObj. speed= 2;
  }
  if( type> 7 && type<= 9)
  {
    newObj. effectOn= "life";
    newObj. effect= -1;
    newObj. speed= 2;
  }
  if( type> 9 && type<= 10)
  {
    newObj. effectOn= "life";
    newObj. effect= +1;
    newObj. speed= 3;
  }
  //

  //Finally add it to the working array of obj.
  obj. push( newObj);
  //

  //document. write( newObj. x+ " "+ newObj. y+ " "+ newObj. dim+ " "+ newObj. angle+ " "+ newObj. bomb+ " "+ newObj. active+ " "+ newObj. speed+ " "+ newObj. award);
}

function clean()
{
  //To remove non-active objects
  var tmp= [];

  for( var i= 0; i< sz; i++)
  {
    if( obj[ i]. active) tmp. push( obj[ i]);
  }

  obj. length= 0;
  sz= tmp. length;

  for( var i= 0; i< sz; i++)
  {
    obj. push( tmp[ i]);
  }

  tmp. length= 0;
}

function toRadian( angle)
{
  return angle* Math. PI/ 180;
}

function alter( toAlter)
{
  //x+= speed* cos( angle), y-= speed* sin( angle), since verticle axis is flipped.

  toAlter. x+= toAlter. speed* Math. cos( toRadian( toAlter. angle));
  toAlter. y-= toAlter. speed* Math. sin( toRadian( toAlter. angle));

  if( toAlter. x- toAlter. dim>= Canvas. width|| toAlter. x+ toAlter. dim<= 0) toAlter. active= false;
  if( toAlter. y- toAlter. dim>= Canvas. height|| toAlter. y+ toAlter. dim<= 0) toAlter. active= false;
}

function draw()
{
  if( _end) return;

  c2d. clearRect( 0, 0, Canvas. width, Canvas. height);

  sz= obj. length;
  for( var i= 0; i< sz; i++)
  {
    if( !obj[ i]. active) continue;

    c2d. beginPath();
    c2d. arc( obj[ i]. x, obj[ i]. y, obj[ i]. dim, 0, 2* Math. PI);
    c2d. lineWidth= 3;

    if( obj[ i]. effectOn== "life")
    {
      c2d. fillStyle= "#170000";
      if( obj[ i]. effect<= 0) c2d. strokeStyle= "blue";
      if( obj[ i]. effect> 0) c2d. strokeStyle= "orange";
    }

    if( obj[ i]. effectOn== "score")
    {
      c2d. fillStyle= "#170000";
      if( obj[ i]. effect>= 0) c2d. strokeStyle= "aqua";
      if( obj[ i]. effect< 0) c2d. strokeStyle= "green";
    }

    c2d. fill();
    c2d. stroke();

    alter( obj[ i]);
  }
}

function check( toComp, x1, y1)
{
  //to check if the object lies in the target area.

  var dist= (x1- toComp. x)* (x1- toComp. x)+ (y1- toComp. y)* (y1- toComp. y);

  if( dist<= toComp. dim* toComp. dim) return true;

  return false;
}

function shootEvent( event)
{
  if( _end) return;

  var x1= event. clientX- window. innerWidth/ 4, y1= event. clientY;

  sz= obj. length;
  for( var i= 0; i< sz; i++)
  {
    if( !obj[ i]. active) continue;

    if( check( obj[ i], x1, y1))
    {
        obj[ i]. active= false;

        player[ obj[ i]. effectOn]+= obj[ i]. effect;
    }
  }

  drawPlayer();

  if( player. life== 0)
  {
    _end= true;
    c2d. font= "50px Verdana";
    c2d. fillText( "GAME OVER!", Canvas. width/ 4, Canvas. height/ 2);
  }
}

function drawPlayer()
{
  pc2d. clearRect( 0, 0, playerCanvas. width, playerCanvas. height);
  pc2d. font= "20px Verdana";
  pc2d. fillText( "Player Stats::", 10, 50);
  pc2d. fillText( "Life Left: "+ player. life, 10, 150);
  pc2d. fillText( "Total Score: "+ player. score, 10, 200);
}


document. addEventListener( "mousedown", shootEvent);

drawPlayer();

setInterval( draw, 10);

setInterval( make, 400);

setInterval( clean, 5000);
