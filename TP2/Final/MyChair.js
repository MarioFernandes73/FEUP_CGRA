function MyChair(scene) {
	CGFobject.call(this,scene);

	this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
};

MyChair.prototype = Object.create(CGFobject.prototype);
MyChair.prototype.constructor = MyChair;

MyChair.prototype.display = function () {
	//all translation logic applied here is the same as explained in MyTable
	
	//seat (dimensions: 2 x 0.1 x 2)
	this.scene.pushMatrix();
	this.scene.scale(2,0.1,2);
	this.scene.translate(0,2.6/0.1,0);//this translation allows the seat to be on top of the legs
	this.scene.woodMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//backrest (dimensions: 2 x 2.5 x 0.1)
	this.scene.pushMatrix();
	this.scene.scale(2,2.5,0.1);
	this.scene.translate(0,3.85/2.5,0.95/0.1);
	this.scene.woodMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	/*esquema das pernas no plano XZ
		Perna1		Perna 2
		Perna3		Perna 4
	*/
	// legs dimensions: 0.2 x 2.6 x 0.2
	//NOTA: A cadeira sera criada com um espacamento de 0.1 unidades entre cada perna e o limite do assento
	
	this.scene.pushMatrix();
	this.scene.scale(0.2,2.6,0.2);//este escalamento � comum a todas as pernas
	
	//subimos as pernas mais uma decima do que o suposto, pois o mesmo ja tinha sido feito com a mesa
	//Perna 1
	this.scene.pushMatrix();
	this.scene.translate(-0.8/0.2,1.31/2.6,-0.8/0.2);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//Perna 2
	this.scene.pushMatrix();
	this.scene.translate(0.8/0.2,1.31/2.6,-0.8/0.2);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//Perna 3
	this.scene.pushMatrix();
	this.scene.translate(-0.8/0.2,1.31/2.6,0.8/0.2);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//Perna 4
	this.scene.pushMatrix();
	this.scene.translate(0.8/0.2,1.31/2.6,0.8/0.2);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};