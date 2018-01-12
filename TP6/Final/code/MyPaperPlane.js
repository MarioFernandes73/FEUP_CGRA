var degToRad = Math.PI / 180.0;

var planeState = {
  FLYING: 0,
  FALLING: 1,
  LANDED: 2,
}

var xIncrement;
var yIncrement;
var zIncrement;
var rotationIncrement;

function MyPaperPlane(scene, begX, begY, begZ) {
 	CGFobject.call(this,scene);
	this.height = 0.75;
	this.width = 1;
	this.length = 3;
	this.desfazamento = 1;
	this.wingSpace = 0.4;
	
	//To allow animation
	this.state = planeState.FLYING; //the plane always starts in flying mode
	this.xCoord = begX;
	this.yCoord = begY;
	this.zCoord = begZ;
	this.fallingRotation = 0;
	
 	this.initBuffers();
 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.move = function() {

 	switch(this.state) {

 		case planeState.FLYING:
 			xIncrement = -0.05;
			yIncrement = 0.02;
			zIncrement = -0.01;
			rotationIncrement = 0;
			if(this.xCoord < 0.3)
 				this.state = planeState.FALLING;
			break;

		case planeState.FALLING:
 			xIncrement = 0;
			yIncrement = -0.1;
			zIncrement = 0;
			rotationIncrement = Math.PI/20;
			if(this.yCoord < 0.1)
 				this.state = planeState.LANDED;
			break;
		case planeState.LANDED:
			xIncrement = 0;
			yIncrement = 0;
			zIncrement = 0;
			break;
 	}


	this.xCoord += xIncrement;
	this.yCoord += yIncrement;
	this.zCoord += zIncrement;
	this.fallingRotation = (this.fallingRotation + rotationIncrement) % (Math.PI * 2);

 	this.scene.pushMatrix();
 		this.scene.translate(this.xCoord, this.yCoord, this.zCoord);
 		switch(this.state) { 
 			case planeState.FALLING:
 				this.scene.rotate(this.fallingRotation, 0, 1, 0);
 				this.scene.rotate(-Math.PI/2, 1, 0, 0);
 				break;

 			case planeState.FLYING:
 				this.scene.rotate(Math.PI/2, 0, 1, 0);
 				break;

 			case planeState.LANDED:
 				this.scene.rotate(Math.PI/4, 0, 1, 0);
 				this.scene.rotate(degToRad*34.9, 0, 0, 1);
 				break;
 		}
 		this.display();
 	this.scene.popMatrix();
 	console.log(this.state);
 };
 
 MyPaperPlane.prototype.initBuffers = function() {
 	this.vertices = [
		0, 0, 0,
        //LeftSide
		this.wingSpace/2, this.height, this.desfazamento,
		this.wingSpace/2, this.height, this.length,
		0, 0, this.length,
		//LeftWing
		this.width, this.height, this.desfazamento,
		this.width, this.height, this.length,
		//RighSide
		-this.wingSpace/2, this.height, this.desfazamento,
		-this.wingSpace/2, this.height, this.length,
		//RightWing
		-this.width, this.height, this.desfazamento,
		-this.width, this.height, this.length
		];

	this.indices = [ //each face will be visible on both sides
        //LeftSide
		0, 1, 2,	2, 1, 0,
		0, 2, 3,	3, 2, 0,
		//LeftWing
		4, 1, 2,	2, 1, 4,
		4, 2, 5,	5, 2, 4,
		//RightSide
		0, 6, 7,	7, 6, 0,
		0, 7, 3,	3, 7, 0,
		//RithWing
		6, 8, 9,	9, 8, 6,
		6, 9, 7,	7, 9, 6
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;

	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };