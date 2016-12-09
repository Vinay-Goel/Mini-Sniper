var canvas= document. getElementById( "Canvas");
var c2d= canvas. getContext( "2d");
var rect= canvas. getBoundingClientRect();

var obj= [];

var life, score;

function init()
{
  life= 3;
  score= 0;
}

function clean()
{

}

function make()
{
  var boundry= generate( 1, 4);
  var type= generate( 0, 10);
  var ang= generate( 15, 75);
  var loc= generate( 100, 400);
  if( boundry== 1|| boundry== 3) loc*= 2;

  var newObj= {angle: 0, x: 0, y: 0, bomb: false, active: 0, counter: 0, refreshRate: 0, award: 0}

  newObj. active= 1;
  if( type== 10) newObj. bomb= true;

  newObj. x= loc;
  newObj. y= loc;
  newObj. angle= ang;

  if( boundry== 1) newObj. y= canvas. height+ rect. top;
  if( boundry== 2) newObj. x= canvas. width+ rect. left;
  if( boundry== 3) newObj. y= 0;
  if( boundry== 4) newObj. x= 0;
}

function generate( min, max)
{
  return Math. floor( Math. random()* (max- min+ 1))+ min;
}

function alter( toAlter)
{

}

function draw()
{
  c2d. clearRect( 0, 0, canvas. width, canvas. height);

  for( var i= 0; i< obj. length; i++)
  {
    if( obj[ i]. x> canvas. width|| obj[ i]. y> canvas. height) obj[ i]. active= false;

    if( !obj[ i]. active) continue;

    c2d. beginPath();
    c2d. rect( obj[ i]. x ,obj[ i]. y, 20, 20);
    alter( obj[ i]);
    c2d. fill();
    c2d. closePath();
  }
}

function compare( toComp, x1, y1)
{

}

function shootEvent( event)
{
  var x1= event. clientX- rect. left, y1= event. clientY- rect. top;

  for( var i= 0; i< obj. length; i++)
  {
    if( !obj[ i]. active) continue;

    if( compare( obj[ i], x1, y1))
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

init();

setInterval( draw, 10);

setInterval( make, 50);

setInterval( clean, 10000);
