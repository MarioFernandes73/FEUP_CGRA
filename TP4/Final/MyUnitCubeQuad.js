function MyUnitCubeQuad(scene) {
	CGFobject.call(this,scene);

	this.quad = new MyQuad(this.scene);
	this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor=MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function () {
	
	//Face frontal
	this.scene.pushMatrix();
	this.scene.translate(0,0,0.5);
	this.quad.display();
	this.scene.popMatrix();
	
	//Face traseira
	this.scene.pushMatrix();
	this.scene.translate(0,0,-0.5);
	this.scene.rotate(Math.PI,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Face lateral direita
	this.scene.pushMatrix();
	this.scene.translate(0.5,0,0);
	this.scene.rotate(Math.PI/2,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Face lateral esquerda
	this.scene.pushMatrix();
	this.scene.translate(-0.5,0,0);
	this.scene.rotate(- Math.PI/2,0,1,0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Face superior
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,0);
	this.scene.rotate(- Math.PI/2,1,0,0);
	this.quad.display();
	this.scene.popMatrix();
	
	//Face inferior
	this.scene.pushMatrix();
	this.scene.translate(0,-0.5,0);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.quad.display();
	this.scene.popMatrix();
};