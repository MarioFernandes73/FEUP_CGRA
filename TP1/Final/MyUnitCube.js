function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            0.5, 0.5, 0.5,	 //V�rtice 1� octante
            0.5, 0.5, -0.5,  //V�rtice 5� octante
            -0.5, 0.5, -0.5, //V�rtice 6� octante
            -0.5, 0.5, 0.5,  //V�rtice 2� octante
			0.5, -0.5, 0.5,  //V�rtice 4� octante
			0.5, -0.5, -0.5, //V�rtice 8� octante
			-0.5, -0.5, -0.5,//V�rtice 7� octante
			-0.5, -0.5, 0.5  //V�rtice 3� octante
			];

	this.indices = [
		//Face superior
            0, 1, 2, 
			0, 2, 3,
			
		//Face inferior
			6, 5, 4,
			6, 4, 7,
			
		//Face frontal
			3, 7, 4,
			0, 3, 4,
			
		//Face traseira
			2, 5, 6,
			2, 1, 5,
			
		//Face lateral direita
			0, 4, 5,
			1, 0, 5,
			
		//Face lateral esquerda
			3, 2, 6,
			3, 6, 7
			
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};