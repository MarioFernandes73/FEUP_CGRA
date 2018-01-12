function MyTable(scene) {
	CGFobject.call(this,scene);

	this.unitCubeQuad = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function () {
	
	//Tampo
	this.scene.pushMatrix();
	this.scene.scale(5,0.3,3);
	this.scene.translate(0,3.5/0.3,0);//esta translacao permite que o tampo fique em cima das pernas
	this.scene.woodMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	/*esquema das pernas no plano XZ
		Perna1		Perna 2
		Perna3		Perna 4
	*/
	//NOTA: A mesa ser� criada com um espa�amento de 0.1 unidades entre cada perna e o limite do tampo
	
	this.scene.pushMatrix();
	this.scene.scale(0.3,3.5,0.3);//este escalamento é comum a todas as pernas
	
	// if we want to move the table's leg upwards by 1.75 units, if we have a scale of 3.5 on the y axis, that corresponds to a translation of 0.5 (3.5 * x = 1.75; x = 0.5) the same logic aplies to a translation in any other axis(x = translation/scale)
	//subimos as pernas mais uma decima do que o suposto, para nao causar um efeito visual estranho ao coincidir com a parte debaixo do chao  
	//Perna 1
	this.scene.pushMatrix();
	this.scene.translate(-2.25/0.3,1.76/3.5,-1.25/0.3);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//Perna 2
	this.scene.pushMatrix();
	this.scene.translate(2.25/0.3,1.76/3.5,-1.25/0.3);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//Perna 3
	this.scene.pushMatrix();
	this.scene.translate(-2.25/0.3,1.76/3.5,1.25/0.3);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();
	
	//Perna 4
	this.scene.pushMatrix();
	this.scene.translate(2.25/0.3,1.76/3.5,1.25/0.3);
	this.scene.metalMaterial.apply();
	this.unitCubeQuad.display();
	this.scene.popMatrix();

	this.scene.popMatrix();
};