/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

	var deltaAng = 2*Math.PI / this.slices;
 	this.vertices = [];
	this.indices = [];
	this.normals = [];
	

	//cycle to push vertexes and normals (runs through "bases" from the bottom to the top; each slice of 1 "base" has 2 points, each with their normals)
	for(let i = 0; i<=this.stacks; i++)
	{
		for(let j = 0; j< this.slices; j++)
		{
			//1st vertex
			//position of the 1st vertex of the current slice: (x1,y1)
			let x1 = Math.cos(j*deltaAng);
			let y1 = Math.sin(j*deltaAng);
			
			//2nd vertex
			//position of the 2nd vertex of the current slice: (x2,y2)
			let x2 = Math.cos((j+1)*deltaAng);
			let y2 = Math.sin((j+1)*deltaAng);
			
			//the normal will be the same to both vertices
			let nx = Math.cos(deltaAng/2 + j*deltaAng);
			let ny = Math.sin(deltaAng/2 + j*deltaAng);
			let nz = 0;
			let norma = Math.sqrt(nx^2,ny^2,nz^2);

			this.vertices.push(x1, y1, i/this.stacks);	//1st vertex
			this.normals.push(nx/norma, ny/norma, nz/norma);	// normal of 1st vertex
		
			this.vertices.push(x2,y2, i/this.stacks);	//2nd vertex
			this.normals.push(nx/norma, ny/norma, nz/norma);	// normal of 2nd vertex
		
		}
	}
	
	//cycle to push indexes (runs through stacks from the bottom to the top; each slice of 1 stack has 4 points -> 2 triangles)
	for(let i = 0; i<this.stacks; i++)
	{
		for(let j = 0; j< this.slices; j++)
		{
			let currentStack = (i*2*this.slices);		// sum of all points up to the start of this stack
			let point1 = (j*2)+currentStack;								//1st vertex of the current face
			let point2 = (j*2+1)+currentStack;							//2nd vertex of the current face
			let point3 = (j*2+this.slices*2)+currentStack;			//3rd vertex of the current face
			let point4 = (j*2+1+this.slices*2)+currentStack;		//4th vertex of the current face
			this.indices.push(point1,point2,point3);						//1st triangle
			this.indices.push(point3,point2,point4);						//2nd triangle
		}
	}
	

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
