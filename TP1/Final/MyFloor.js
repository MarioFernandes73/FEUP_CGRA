function MyFloor(scene) {
	CGFobject.call(this,scene);

	this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
};

MyFloor.prototype = Object.create(CGFobject.prototype);
MyFloor.prototype.constructor = MyFloor;

MyFloor.prototype.display = function () {
	
	this.scene.pushMatrix();
	this.scene.scale(8,0.1,6);
	//temos de subir o chao 0.05 unidades para que ele assente no plano XZ subir o chao 0.05 unidades, com uma escala de 0.1 em y corresponde a subir 0.05/0.1 unidades.
	this.scene.translate(0,0.05/0.1,0);
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
};