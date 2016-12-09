/*

          MINI SNIPER-----------------JavaScript

*/

var canvas= document. getElementById( "Canvas");
var c2d= canvas. getContext( "2d");
var rect= canvas. getBoundingClientRect();

var obj= [];

var sz= 0;
var life= 3;
var score= 0;

function generate( min, max)
{
  return Math. random()* (max- min+ 1)+ min;
}

function make()
{
  var newObj= {x: 0, y: 0, dim: 0, angle: 0, bomb: false, active: false, speed: 0, award: 0}


  /*
  *make() function is used to create a new object that moves on the canvas...
  *object has four main parameters x, y, dim, angle defining the position, size and trajectory.
  *if bomb is true then the object is a bomb....obviously :p.
  *active tells the state of the object. If false then it is already shot by player.
  *speed tells the relative change in the position when ever it is redrawn on screen. x= x+ speed* cos( angle), y= y- speed* sin( angle), since verticle axis increases as we move down.
  *score+= award on a hit.
  */

  //Setting x and y coordinates of new target/bomb.
  var boundry= Math. floor( generate( 1, 4) );
  var loc= generate( 100, 400);

  if( boundry== 1|| boundry== 3) loc*= 2;

  newObj. x= loc;
  newObj. y= loc;

  if( boundry== 1) newObj. y= canvas. height+ 0.0;
  if( boundry== 2) newObj. x= canvas. width+ 0.0;
  if( boundry== 3) newObj. y= 0.0;
  if( boundry== 4) newObj. x= 0.0;
  //

  //Setting dimension
  newObj. dim= 15;
  //

  //Setting angle.
  var ang= generate( 15, 75);
  if( newObj. x<= canvas. width/ 2 && newObj. y>= canvas. height/ 2) newObj. angle= ang;
  if( newObj. x>= canvas. width/ 2 && newObj. y>= canvas. height/ 2) newObj. angle= ang+ 90;
  if( newObj. x>= canvas. width/ 2 && newObj. y<= canvas. height/ 2) newObj. angle= ang+ 180;
  if( newObj. x<= canvas. width/ 2 && newObj. y<= canvas. height/ 2) newObj. angle= ang+ 270;
  //

  //Defines if target/bomb is shot by the player, if yes active= false;
  newObj. active= true;
  //

  //1/3rd probability that new object is a bomb.
  var type= generate( 1, 3);
  if( type== 3) newObj. bomb= true;
  //

  //Default Speed= 1 is used. Can be modified for better gaming experience.
  newObj. speed= 5;
  //

  //Default score increment on a hit= 50. Can be modified for better gaming experience.
  newObj. award= 50;
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
    obj. push( tmp);
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

  /*
  c2d. beginPath();
  c2d. arc( x1, y1, 30, 0, 2* Math. PI);
  c2d. stroke();
  */

  sz= obj. length;
  for( var i= 0; i< sz; i++)
  {
    if( !obj[ i]. active) continue;

    if( check( obj[ i], x1, y1))
    {
        obj[ i]. active= false;

        if( obj[ i]. bomb)
        {
          life--;
          continue;
        }

        score+= obj[ i]. award;
    }
  }
}


document. addEventListener( "click", shootEvent);

setInterval( draw, 50);

setInterval( make, 1000);

//setInterval( clean, 5000);
