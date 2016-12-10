/*

          MINI SNIPER-----------------JavaScript

*/

var canvas= document. getElementById( "Canvas");
var c2d= canvas. getContext( "2d");
var rect= canvas. getBoundingClientRect();

var obj= [];
var sz= 0;

var player= {life: 3, score: 0};

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
  if( boundry== 1|| boundry== 3) newObj. x= generate( 0, canvas. width);
  if( boundry== 2|| boundry== 4) newObj. y= generate( 0, canvas. height);

  if( boundry== 1) newObj. y= canvas. height+ newObj. dim;
  if( boundry== 2) newObj. x= canvas. width+ newObj. dim;
  if( boundry== 3) newObj. y= 0.0- newObj. dim;
  if( boundry== 4) newObj. x= 0.0- newObj. dim;
  //

  //Setting angle.
  var ang= generate( 25, 65);
  if( newObj. x<= canvas. width/ 2 && newObj. y>= canvas. height/ 2) newObj. angle= ang;
  if( newObj. x>= canvas. width/ 2 && newObj. y>= canvas. height/ 2) newObj. angle= ang+ 90;
  if( newObj. x>= canvas. width/ 2 && newObj. y<= canvas. height/ 2) newObj. angle= ang+ 180;
  if( newObj. x<= canvas. width/ 2 && newObj. y<= canvas. height/ 2) newObj. angle= ang+ 270;
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
    newObj. speed= 1.5;
  }
  if( type> 5 && type<= 7)
  {
    newObj. effectOn= "score";
    newObj. effect= -20;
    newObj. speed= 1.5;
  }
  if( type> 7 && type<= 9)
  {
    newObj. effectOn= "life";
    newObj. effect= -1;
    newObj. speed= 1.5;
  }
  if( type> 9 && type<= 10)
  {
    newObj. effectOn= "life";
    newObj. effect= +1;
    newObj. speed= 1.5;
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

  if( toAlter. x- toAlter. dim>= canvas. width|| toAlter. x+ toAlter. dim<= 0) toAlter. active= false;
  if( toAlter. y- toAlter. dim>= canvas. height|| toAlter. y+ toAlter. dim<= 0) toAlter. active= false;
}

function draw()
{
  c2d. clearRect( 0, 0, canvas. width, canvas. height);

  sz= obj. length;
  for( var i= 0; i< sz; i++)
  {
    if( !obj[ i]. active) continue;

    c2d. beginPath();
    c2d. arc( obj[ i]. x, obj[ i]. y, obj[ i]. dim, 0, 2* Math. PI);
    c2d. lineWidth= 5;

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
  var x1= event. clientX- rect. left, y1= event. clientY- rect. top;

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
}


document. addEventListener( "mousedown", shootEvent);

setInterval( draw, 10);

setInterval( make, 1400);

setInterval( clean, 5000);
