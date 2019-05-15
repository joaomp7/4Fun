context = document.getElementById("folha").getContext("2d");

var HTMLIdShapes = ["triangle_cyan", "triangle_orange", "triangle_blue", "triangle_yellow",
                "triangle_green", "polygon", "square"];

var shapes = [];

for(var i = 0; i < HTMLIdShapes.length; i++)
    shapes[i] = document.getElementById(HTMLIdShapes[i]);

var coordsX = [20, 60, 20, 80, 20, 80, 20];
var coordsY = [20, 80, 20, 80, 20, 80, 80];

var chooseShapeByNumber;

var inclinationDegrees = [0, 0, 0, 0, 0, 0, 0];

window.onload = function()
{

    document.addEventListener("keydown", function(event)
    {
        selectShape(event);
        movimentShape(event, chooseShapeByNumber)
        rotateShape(event, chooseShapeByNumber);
    });
}

function drawShape()
{
    for(var i = 0; i < shapes.length; i++)
        context.drawImage(shapes[i], coordsX[i], coordsY[i]);
}

function selectShape(event)
{
    switch(event.key)
    {
        case "1":
            console.log("1");
            chooseShapeByNumber = 1;
        break;
        case "2":
            console.log("2");
            chooseShapeByNumber = 2;
        break;
        case "3":
            console.log("3");
            chooseShapeByNumber = 3;
        break;
        case "4":
            console.log("4");
            chooseShapeByNumber = 4;
        break;
        case "5":
            console.log("5");
            chooseShapeByNumber = 5;
        break;
        case "6":
            console.log("6");
            chooseShapeByNumber = 6;
        break;
        case "7":
            console.log("7");
            chooseShapeByNumber = 7;
        break;
    }
}

function movimentShape(event, indexShape)
{
    indexShape--;

    switch(event.keyCode)
    {
        case 37:
            coordsX[indexShape]--;
            context.clearRect(0, 0, 600, 600);
            drawShape();
        break;
        
        case 38:
            coordsY[indexShape]++;
            context.clearRect(0, 0, 600, 600);
            drawShape();        
        break;
        
        case 39:
            coordsX[indexShape]++;
            context.clearRect(0, 0, 600, 600);
            drawShape();        
        break;
        
        case 40:
            coordsY[indexShape]--;
            context.clearRect(0, 0, 600, 600);
            drawShape();        
        break;
    }
}

function rotateShape(event, indexShape)
{
    indexShape--;

    inclinationDegrees[indexShape]++;

    if(event.key === "a")
    {
        context.clearRect(0, 0, 600, 600);
        context.save();
        context.translate( coordsX[indexShape], coordsY[indexShape] );
        context.rotate(inclinationDegrees[indexShape] * Math.PI / 180);
        context.translate( -coordsX[indexShape], -coordsY[indexShape] );
        context.drawImage(shapes[indexShape], coordsX[indexShape], coordsX[indexShape]);
        context.restore();

        for(var i = 0; i < shapes.length; i++)
        {
            if(i !== indexShape)
            {
               context.drawImage(shapes[i], coordsX[i], coordsY[i]);
            }
        }
    }
}
