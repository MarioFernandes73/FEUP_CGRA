var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;
var BOARD_RATIO = BOARD_WIDTH/BOARD_HEIGHT;

var SLIDE_RATIO = 512/512;
var BOARD2_RATIO = 512.0/372;

var BOARD_A_DIVISIONS = 30; // boardA resolution's 30x30 divisions
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.update = function(currTime /*tempo atual*/) {
	this.clock.update(currTime);
};

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	//allow textures
	this.enableTextures(true);
	
	// Scene elements
	this.table = new MyTable(this);
	this.leftWall = new MyQuad(this, -1, 2, -1, 2);
	this.wall = new Plane(this);
	this.floor = new MyQuad(this, 0, 10, 0, 12); // this will allow the image to be reapeted 10 times on S axis and 12 on the T axis
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, SLIDE_RATIO, BOARD_RATIO);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, BOARD2_RATIO, BOARD_RATIO);

	this.chair = new MyChair(this);
	
	this.prism = new MyPrism(this, 8, 20); //8 slices, 20 stacks
	
	this.cylinder = new MyCylinder(this, 8, 20); //8 slices, 20 stacks
	
	this.lamp = new MyLamp(this, 8, 20); //8 slices, 20 stacks
	
	this.clock = new MyClock(this);
	
	this.paperPlane = new MyPaperPlane(this, 5, 3.65, 7); //On top of the left table
	
	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);
	
	this.woodMaterial = new CGFappearance(this);
	this.woodMaterial.setAmbient(0.3,0.3,0.3,1);
	this.woodMaterial.setDiffuse(0.34,0.18,0.05,1); // difusal componet set to brown color
	this.woodMaterial.setSpecular(0.1,0.1,0.1,1); // wood has a low specular component
	this.woodMaterial.setShininess(30); // wood shininess is low
	
	this.metalMaterial = new CGFappearance(this);
	this.metalMaterial.setAmbient(0.3,0.3,0.3,1);
	this.metalMaterial.setDiffuse(0.88,0.87,0.86,1); // difusal componet set to steel color
	this.metalMaterial.setSpecular(0.8,0.8,0.8,1); // metal has a high specular component
	this.metalMaterial.setShininess(150); // metal shininess is high
	
	// we will set a baby blue dim wall apect
	this.wallMaterial = new CGFappearance(this);
	this.wallMaterial.setAmbient(0.3,0.3,0.3,1);
	this.wallMaterial.setDiffuse(0.21,0.32,0.37,1); // difusal componet set to baby blue color
	this.wallMaterial.setSpecular(0.05,0.05,0.05,1); // dim has a low specular component
	this.wallMaterial.setShininess(10); // dim shininess is very low
	
	// we will set a dark floor
	this.floorMaterial = new CGFappearance(this);
	this.floorMaterial.setAmbient(0.3,0.3,0.3,1);
	this.floorMaterial.setDiffuse(0.1,0.1,0.1,1); // difusal componet set to dark color
	this.floorMaterial.setSpecular(0.5,0.5,0.5,1);
	this.floorMaterial.setShininess(100); 
	
	// table texture
	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1); // low specular component
	this.tableAppearance.setShininess(30); // low shininess
	this.tableAppearance.loadTexture("../resources/images/table.png");

	// floor texture
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT'); // (wrap mode in S axis, wrap mode in T axis);*/

	// window texture
	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE'); // (wrap mode in S axis, wrap mode in T axis);*/

	// slides texture
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1); // low specular component
	this.slidesAppearance.setShininess(30); // low shininess
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE'); // (wrap mode in S axis, wrap mode in T axis);*/
	
	// board texture
	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setDiffuse(0.25,0.25,0.25,1); // low difusal component
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1); // medium specular component
	this.boardAppearance.setShininess(150); // high shininess
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE'); // (wrap mode in S axis, wrap mode in T axis);*/

	// column texture
	this.columnAppearance = new CGFappearance(this);
	this.columnAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.columnAppearance.setSpecular(0.1,0.1,0.1,1); // low specular component
	this.columnAppearance.setShininess(30); // low shininess
	this.columnAppearance.loadTexture("../resources/images/column.png");

	// lamp texture
	this.lampAppearance = new CGFappearance(this);
	this.lampAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.lampAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.lampAppearance.setShininess(160); // high shininess
	this.lampAppearance.loadTexture("../resources/images/lamp.png");
	
	//clock texture
	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.clockAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.clockAppearance.setShininess(160); // high shininess
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	
	//red texture
	this.redAppearance = new CGFappearance(this);
	this.redAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.redAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.redAppearance.setShininess(160); // high shininess
	this.redAppearance.loadTexture("../resources/images/red.png");
	
	//black texture
	this.blackAppearance = new CGFappearance(this);
	this.blackAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.blackAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.blackAppearance.setShininess(160); // high shininess
	this.blackAppearance.loadTexture("../resources/images/black.png");

	this.setUpdatePeriod(100);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0); // remove ambient light
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(1, 5.3, 7.5, 1); // located in front of the window
	this.lights[4].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0); // light 0's specular component is pure yellow
	this.lights[0].enable(); // turn on light 0

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable(); // turn on light 1

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0); // kc
	this.lights[2].setLinearAttenuation(1.0); // kl
	this.lights[2].setQuadraticAttenuation(0); // kq
	this.lights[2].enable(); // turn on light 2

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[3].setConstantAttenuation(0); // kc
	this.lights[3].setLinearAttenuation(0); // kl
	this.lights[3].setQuadraticAttenuation(1.0); // kq
	this.lights[3].enable(); // turn on light 3

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[4].enable(); // turn on light 1
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallMaterial.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A (slide projection)
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B (white board)
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// First chair
	this.pushMatrix();
		this.translate(5, 0, 9.7);
		this.chair.display();
	this.popMatrix();
	
	// Second chair
	this.pushMatrix();
		this.translate(12, 0, 9.7);
		this.chair.display();
	this.popMatrix();
	
	//MyPrism located on first table
	this.pushMatrix();
		this.translate(5, 0, 13);
		this.rotate(90*degToRad, -1, 0, 0);
		this.scale(1,1,8);
		this.columnAppearance.apply();
		this.prism.display();
	this.popMatrix();
	
	//MyCylinder located on second table
	this.pushMatrix();
		this.translate(12, 0, 13);
		this.rotate(90*degToRad, -1, 0, 0);
		this.scale(1,1,8);
		this.columnAppearance.apply();
		this.cylinder.display();
	this.popMatrix();
	
	//MyLamp located on the middle of the ceilling
	this.pushMatrix();
		this.translate(7.5, 8, 7.5);
		this.rotate(-90*degToRad, -1, 0, 0);
		this.scale(1.5,1.5,1.5);
		this.lampAppearance.apply();
		this.lamp.display();
	this.popMatrix();
	
	//MyClock located between the two boards
	this.pushMatrix();
		this.translate(7.25, 7.5, 0);
		this.clock.display();
	this.popMatrix();
	
	//MyPaperPlane
	this.pushMatrix();
		this.paperPlane.move();
	this.popMatrix();
	
	// ---- END Primitive drawing section
};
