/**
 * MyPrism
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	//Used for texCoord
	this.incrementX = 1.0/this.slices;
	this.incrementY = 1.0/this.stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	var deltaAng = 2*Math.PI / this.slices;
	var deltaFi = Math.PI*0.5 / this.stacks;
 	this.vertices = [];
	this.indices = [];
	this.texCoords = [];
	this.normals = [];

	//cycle to push vertexes and normals (runs through "bases" from the bottom to the top; each slice of 1 "base" has 2 points, each with their normals)
	for(let i = 0; i<=this.stacks; i++)
	{
		for(let j = 0; j< this.slices; j++)
		{
			//We only add one vertex for each iteration
			//Vertex position
			let x = Math.cos(j*deltaAng) * Math.cos(i*deltaFi);
			let y = Math.sin(j*deltaAng) * Math.cos(i*deltaFi);
			let z = Math.sin(i*deltaFi);
			//Texture coordinates
			let tx = j*this.incrementX;
			let ty = i*this.incrementY;
			//Normal
			let nx = Math.cos(j*deltaAng) * Math.cos(i*deltaFi);
			let ny = Math.sin(j*deltaAng) * Math.cos(i*deltaFi);
			let nz = Math.sin(i*deltaFi);
			let norma = Math.sqrt(nx^2 + ny^2 + nz^2);
		
			this.vertices.push(x,y,z);
			this.texCoords.push(tx, ty);	
			this.normals.push(nx/norma, ny/norma, nz/norma);	
		
		}
	}
	
	//cycle to push indexes (runs through stacks from the bottom to the top; each slice of 1 stack has 4 points -> 2 triangles)
	for(let i = 0; i<this.stacks; i++)
	{
		for(let j = 0; j< this.slices; j++)
		{
			let currentStack = i*this.slices;		// sum of all points up to the start of this stack
			let point1 = j+currentStack;								//1st vertex of the current face
			let point2;
			let point3 = j+this.slices+currentStack;			//3rd vertex of the current face
			let point4;
			
			if(j!=this.slices-1) {
				point2 = j+1+currentStack;					//2nd vertex of the current face
				point4 = j+1+this.slices+currentStack;		//4th vertex of the current face
			}
			else {
				point2 = currentStack;					//2nd vertex of the current face
				point4 = this.slices+currentStack;		//4th vertex of the current face
			}
			this.indices.push(point1,point2,point3);
			this.indices.push(point3,point2,point4);
		}
	}
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
