 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	//Used for texCoord
	this.incrementX = 1.0/this.slices;
	this.incrementY = 1.0/this.stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
	var deltaAng = 2*Math.PI / this.slices;
 	this.vertices = [];
	this.indices = [];
	this.texCoords = [];
	this.normals = [];

	//cycle to push vertexes and normals (runs through "bases" from the bottom to the top; each slice of 1 "base" has 2 points, each with their normals)
	for(let i = 0; i<=this.stacks; i++)
	{
		for(let j = 0; j<= this.slices; j++)
		{
			//We only add one vertex for each iteration
			//Vertex position
			let x = Math.cos(j*deltaAng);
			let y = Math.sin(j*deltaAng);
			//Texture coordinates
			let tx = j*this.incrementX;
			let ty = 1 - (i*this.incrementY);
			//Normal
			let nx = Math.cos(j*deltaAng);
			let ny = Math.sin(j*deltaAng);
			let nz = 0;
			let norma = Math.sqrt(Math.pow(nx,2) + Math.pow(ny,2) + Math.pow(nz,2));
		
			this.vertices.push(x,y, i/this.stacks);	
			this.texCoords.push(tx, ty);
			this.normals.push(nx/norma, ny/norma, nz/norma);	
		
		}
	}
	
	//cycle to push indexes (runs through stacks from the bottom to the top; each slice of 1 stack has 4 points -> 2 triangles)
	for(let i = 0; i<this.stacks; i++)
	{
		for(let j = 0; j< this.slices; j++)
		{
			let currentStack = i*(this.slices+1);			// sum of all points up to the start of this stack
			let point1 = j+currentStack;					//1st vertex of the current face
			let point2 = j+1+currentStack;					//2nd vertex of the current face
			let point3 = j+(this.slices+1)+currentStack;	//3rd vertex of the current face
			let point4 = j+1+(this.slices+1)+currentStack;	//4th vertex of the current face
			
			//creates outside faces
			this.indices.push(point1,point2,point3);
			this.indices.push(point3,point2,point4);
		}
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
