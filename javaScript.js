var canvas= document. getElementById( "Canvas");
var c2d= canvas. getContext( "2d");

var x= 0, y= 0;

function draw()
{
  c2d. clearRect( 0, 0, canvas. width, canvas. height);

  c2d. beginPath();

  c2d. rect( x++, y++, 40, 40);

  c2d. fill();

  c2d. closePath();
}

function shootEvent( event)
{
  var rect= canvas. getBoundingClientRect();

  var x1= event. clientX- rect. left, y1= event. clientY- rect. top;

  if( (x1>= x) && (x1<= x+ 40) && (y1>= y) && (y1<= y+ 40) )
  {
    document. write( "hi");

    c2d. beginPath();

    c2d. rect( 0, 0, 20, 20);

    c2d. fill();

    c2d. closePath();
  }
}

document. addEventListener( "click", shootEvent);

setInterval( draw, 10);
