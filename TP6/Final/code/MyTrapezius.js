function MyTrapezius(scene, basesRatio) {
 	CGFobject.call(this,scene);
	
	this.basesRatio = basesRatio;

 	this.initBuffers();
 };

 MyTrapezius.prototype = Object.create(CGFobject.prototype);
 MyTrapezius.prototype.constructor = MyTrapezius;

 MyTrapezius.prototype.initBuffers = function() {
	 
 	this.vertices = [
		-0.5, 0, 0.5,
		-0.5, 0, -0.5,
		
		0.5, 0, 0.5,
		0.5, 0, -0.5,
		
		-1.0/(2.0*this.basesRatio), 1, 0.5,
		-1.0/(2.0*this.basesRatio), 1, -0.5,
		
		1.0/(2.0*this.basesRatio), 1, 0.5,
		1.0/(2.0*this.basesRatio), 1, -0.5,
	];
	
	this.indices = [
		//faces
		// bottom
		0, 1, 3,
		0, 3 , 2,
		// up
		4, 6, 7,
		4, 7, 5,
		// left
		0, 4, 1,
		1, 4, 5,
		// right
		2, 3, 7,
		2, 7, 6,
		// front
		0, 2, 6,
		0, 6, 4,
		// back
		5, 7, 1,
		7, 3, 1
	];
	
	
	let c1 = 0.5-1/(2*this.basesRatio);
	let c2 = 1;
	let h = Math.sqrt(Math.pow(c1,2)+Math.pow(c2,2));
	
	let normal0Size = Math.sqrt(Math.pow(-c2/h,2)+Math.pow(c1/h-1,2)+Math.pow(1,2));
	let normal4Size = Math.sqrt(Math.pow(-c2/h,2)+Math.pow(c1/h+1,2)+Math.pow(1,2));
	this.normals = [
		// lets first define the normals for each trapezius face
		// bottom = (0, -1, 0)
		// top = (0, 1, 0)
		// left = (-cos(delta) = -c2/h, sin(delta) = c1/h, 0)
		// right = (cos(delta) = c2/h, sin(delta) = c1/h, 0)
		// front = (0, 0, 1)
		// back = (0, 0, -1)
		
		//Vertice 0 = front + left + bottom
		(-c2/h)/normal0Size, (c1/h-1)/normal0Size, 1/normal0Size,
		
		//Vertice 1 = back + left + bottom
		(-c2/h)/normal0Size, (c1/h-1)/normal0Size, -1/normal0Size,
		
		//Vertice 2 = front + right + bottom
		(c2/h)/normal0Size, (c1/h-1)/normal0Size, 1/normal0Size,
		
		//Vertice 3 = back + right + bottom
		(c2/h)/normal0Size, (c1/h-1)/normal0Size, -1/normal0Size,
		
		//Vertice 4 = front + left + top
		(-c2/h)/normal4Size, (c1/h+1)/normal4Size, 1/normal4Size,
		
		//Vertice 5 = back + left + top
		(-c2/h)/normal4Size, (c1/h+1)/normal4Size, -1/normal4Size,
		
		//Vertice 6 = front + right + top
		(c2/h)/normal4Size, (c1/h+1)/normal4Size, 1/normal4Size,
		
		//Vertice 7 = back + right + top
		(c2/h)/normal4Size, (c1/h+1)/normal4Size, -1/normal4Size
	];
	
	this.texCoords = [
		0, 1,
		0.75, 1,
		0.25, 1,
		0.5, 1,
		0, 0,
		0.75, 0,
		0.25, 0,
		0.5, 0
	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };