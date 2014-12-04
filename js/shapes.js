/*
    shapes.js
    This is where your code goes

    Write the code to create rectangle and circle classes that extend the
    Shape class defined in shape.js. Then create a couple of other subclasses that
    render different sorts of shapes using the HTML <canvas> functions.
    http://www.w3schools.com/tags/ref_canvas.asp

    You can use either the classical or the prototypal style to create your subclasses

    After you've written the code for the sublcasses, call either registerPrototypalShape()
    or registerClassicalShape() to register your new shapes with the application. See the
    app.js file for info on these functions.
 */


function Rectangle(left, top, width, height, stylesMap) {
    //Call Shape constructor
    Shape.call(this, left, top, width, height, stylesMap);

    //Overwrite rendershape
    this.renderShape = function(canvasCtx) {
        canvasCtx.fillRect(this.left, this.top, this.width, this.height);
    }
}

//Inherit methods
Rectangle.prototype = new Shape();


function Circle(left, top, width, height, stylesMap) {

    Shape.call(this, left, top, width, height, stylesMap);

    //Overwrite rendershape
    this.renderShape = function(canvasCtx) {
        canvasCtx.beginPath();
        var x = this.left + (width / 2);
        var y = this.top + (height / 2);

        //Width or height / 2 doesn't matter since it's a circle
        var radius = this.width  / 2;

        canvasCtx.arc(x, y, radius, 0, 2*Math.PI);

        canvasCtx.fill();
    }
}

Circle.prototype = new Shape();

function Borg(left, top, width, height, stylesMap) {

    Shape.call(this, left, top, 20, 20, {
        fillStyle: "green",
        stroke: stylesMap.stroke
    });

    this.rand = Math.floor(Math.random() * (5));
    this.renderShape = function(canvasCtx) {

        //Resistance is futile is less fun so it will come up less often. These ones won't animate
        //As they stick to the place where the user clicked. They also "flash" by being displayed 3/4
        //of the time
        if(this.rand == 0) {
            if(Math.floor(Math.random() * (5)))
                canvasCtx.fillText("resistance is futile", left, top);
        } else {
            canvasCtx.fillRect(this.left, this.top, 20, 20);
            canvasCtx.fillRect(this.left + 5, this.top + 5, 20, 20);

            //Draw a 3D square outline
            canvasCtx.beginPath();
            canvasCtx.moveTo(this.left, this.top);
            canvasCtx.lineTo(this.left + 5, this.top + 5);
            canvasCtx.lineTo(this.left + 25, this.top + 5);
            canvasCtx.lineTo(this.left + 20, this.top);
            canvasCtx.lineTo(this.left, this.top);
            canvasCtx.lineTo(this.left, this.top + 20);
            canvasCtx.lineTo(this.left + 5, this.top + 25);
            canvasCtx.lineTo(this.left + 5, this.top + 5);
            canvasCtx.moveTo(this.left + 25, this.top + 25);
            canvasCtx.lineTo(this.left + 5, this.top + 25);
            canvasCtx.moveTo(this.left + 25, this.top + 25);
            canvasCtx.lineTo(this.left + 25, this.top + 5);
            canvasCtx.stroke();

        }

        //
    }
}

Borg.prototype = new Shape();

registerClassicalShape('Circle', Circle);
registerClassicalShape('Rectangle', Rectangle);
registerClassicalShape('Borg', Borg);

