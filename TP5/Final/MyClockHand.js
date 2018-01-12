 function MyClockHand(scene) {
 	CGFobject.call(this,scene);
	this.angle; //In grades
 	this.initBuffers();
 };

 MyClockHand.prototype = Object.create(CGFobject.prototype);
 MyClockHand.prototype.constructor = MyClockHand;

 MyClockHand.prototype.setAngle = function(angle) {
	 this.angle = angle;
 };
 
 MyClockHand.prototype.initBuffers = function() {
	var x1 = Math.cos(Math.PI/2 - 0.01);
	var y1 = Math.sin(Math.PI/2 - 0.01);
	
	var x2 = Math.cos(Math.PI/2 + 0.01);
	var y2 = Math.sin(Math.PI/2 + 0.01);
	
 	this.vertices = [
		0, 0, 0,
		x1, y1, 0,
		x2, y2, 0
	];
	this.indices = [
		0, 1, 2
	];
	this.texCoords = [ // the texture will all be the same color, so this points are a random portion of the texture
		0.5, 0.9,
		0.9, 0.1,
		0.1, 0.1
	];
	this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
