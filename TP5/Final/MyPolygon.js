	function MyPolygon(scene, slices) {
	CGFobject.call(this,scene);

	this.slices = slices;

	this.initBuffers();
	};

	MyPolygon.prototype = Object.create(CGFobject.prototype);
	MyPolygon.prototype.constructor=MyPolygon;

	MyPolygon.prototype.initBuffers = function () {

	var deltaAng = 2*Math.PI / this.slices;
	this.vertices = [];
	this.indices = [];
	this.texCoords = [];
	this.normals = [];

	//Central point
	this.vertices.push(0,0,0);
	this.texCoords.push(0.5,0.5);
	this.normals.push(0,0,1);

	for(let j = 0; j< this.slices; j++)
	{
		//We only add one vertex for each iteration
		//Vertex position
		let x = Math.cos(j*deltaAng);
		let y = Math.sin(j*deltaAng);
		let z = 0;
		//Texture coordinates
		let tx = x/2 + 0.5;
		let ty = 1 - (y/2 + 0.5);

		this.vertices.push(x,y,z);
		this.texCoords.push(tx,ty);
		this.normals.push(0,0,1);
	}

	//Vertex indeces
	for(let j = 1; j <= this.slices; j++)
	{
		let centrePoint = 0;
		let point1 = j;
		let point2 = (j==this.slices)? 1 : j+1;
		this.indices.push(0, point1, point2);
	}

	this.primitiveType=this.scene.gl.TRIANGLES;
	
	this.initGLBuffers();
	};