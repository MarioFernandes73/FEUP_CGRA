var degToRad = Math.PI / 180.0;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.doSomething = function() {
	console.log("Doing something...");
};

LightingScene.prototype.update = function(currTime) {
	if(!this.pause)
		this.clock.update(currTime);
		
	this.submarine.update();
	
	var lightsArray = [this.luz1, this.luz2, this.luz3, this.luz4, this.luz5];
	for (i = 0; i < lightsArray.length; i++)
	{
		if(lightsArray[i])
		{
			this.lights[i].enable();
		}
		else
		{
			this.lights[i].disable();
		}
	}	
};

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(28/255, 107/255, 160/255, 1.0); // ocean blue color
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	//allow textures
	this.enableTextures(true);
	
	this.currSubmarineAppearance;
	this.submarineAppearances;
	
	// Scene elements
	this.submarine = new MySubmarine(this);
	this.ocean = new MyQuad(this, 0, 3);
	this.clock = new MyClock(this);
	this.cylinder = new MyCylinder(this, 8, 1); //8 slices, 1 stack

	this.target1 = new MyTarget(this, 5, 1, 5, 0);
	this.target2 = new MyTarget(this, -4, 0.5, 3, 1);
	this.target3 = new MyTarget(this, -2, 0.5, 2, 2);
	this.targetList = [this.target1, this.target2, this.target3];
	this.nextTargetIndex = 0; //represents the index of the next target to be destroyed by a torpedo
	
	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.brownAppearance = new CGFappearance(this);
	this.brownAppearance.setAmbient(0.3,0.3,0.3,1);
	this.brownAppearance.setDiffuse(0.34,0.18,0.05,1); // difusal componet set to brown color
	this.brownAppearance.setSpecular(0.1,0.1,0.1,1); // wood has a low specular component
	this.brownAppearance.setShininess(30); // wood shininess is low
	
	this.metalAppearance = new CGFappearance(this);
	this.metalAppearance.setAmbient(0.3,0.3,0.3,1);
	this.metalAppearance.setDiffuse(105/255,105/255,105/255,1); // difusal componet set to steel color
	this.metalAppearance.setSpecular(0.8,0.8,0.8,1); // metal has a high specular component
	this.metalAppearance.setShininess(150); // metal shininess is high
	
	// baby blue dim appearance
	this.babyBlueAppearance = new CGFappearance(this);
	this.babyBlueAppearance.setAmbient(0.3,0.3,0.3,1);
	this.babyBlueAppearance.setDiffuse(0.21,0.32,0.37,1); // difusal componet set to baby blue color
	this.babyBlueAppearance.setSpecular(0.05,0.05,0.05,1); // dim has a low specular component
	this.babyBlueAppearance.setShininess(10); // dim shininess is very low 
	
	// table texture
	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1); // low specular component
	this.tableAppearance.setShininess(30); // low shininess
	this.tableAppearance.loadTexture("../resources/images/table.png");

	// column texture
	this.marbleAppearance = new CGFappearance(this);
	this.marbleAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.marbleAppearance.setSpecular(0.1,0.1,0.1,1); // low specular component
	this.marbleAppearance.setShininess(130); // low shininess
	this.marbleAppearance.loadTexture("../resources/images/column.png");
	
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

	//ocean appearance
	this.oceanAppearance = new CGFappearance(this);
	this.oceanAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.oceanAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.oceanAppearance.setShininess(160); // high shininess
	this.oceanAppearance.loadTexture("../resources/images/ocean.png");
	this.oceanAppearance.setTextureWrap('REPEAT', 'REPEAT');
	
	//magma appearance
	this.magmaAppearance = new CGFappearance(this);
	this.magmaAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.magmaAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.magmaAppearance.setShininess(160); // high shininess
	this.magmaAppearance.loadTexture("../resources/images/magma.png");
	
	//ray appearance
	this.rayAppearance = new CGFappearance(this);
	this.rayAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.rayAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.rayAppearance.setShininess(160); // high shininess
	this.rayAppearance.loadTexture("../resources/images/ray.png");
	
	//fade appearance
	this.fadeAppearance = new CGFappearance(this);
	this.fadeAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.fadeAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.fadeAppearance.setShininess(160); // high shininess
	this.fadeAppearance.loadTexture("../resources/images/fade.png");
	
	//explosion appearance
	this.explosionAppearance = new CGFappearance(this);
	this.explosionAppearance.setDiffuse(0.8,0.8,0.8,1); // high difusal component
	this.explosionAppearance.setSpecular(0.9,0.9,0.9,1); // high specular component
	this.explosionAppearance.setShininess(160); // high shininess
	this.explosionAppearance.loadTexture("../resources/images/explosion.png");
	
	this.setUpdatePeriod(100);
	
	this.luz1 = true;
	this.luz2 = true;
	this.luz3 = true;
	this.luz4 = true;
	this.luz5 = true;
	
	this.pause = false;
	
	this.textura = 'castanho';
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0); // remove ambient light
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	//this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	//this.lights[2].setVisible(true); // show marker on light position (different from enabled)

	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	this.lights[4].setPosition(1, 5.3, 7.5, 1); // located in front of the window
	//this.lights[4].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0, 1.0); // light 0's specular component is pure yellow

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0); // kc
	this.lights[2].setLinearAttenuation(1.0); // kl
	this.lights[2].setQuadraticAttenuation(0); // kq

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 0, 1.0);
	this.lights[3].setConstantAttenuation(0); // kc
	this.lights[3].setLinearAttenuation(1.0); // kl
	this.lights[3].setQuadraticAttenuation(0); // kq

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
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
	
	//define submarine texture
	this.submarineAppearances = [this.brownAppearance, this.metalAppearance, this.babyBlueAppearance, this.marbleAppearance, this.magmaAppearance, this.rayAppearance, this.fadeAppearance];
	var submarineAppearanceList = new Map();
	submarineAppearanceList.set('castanho', 0);
	submarineAppearanceList.set('metal', 1);
	submarineAppearanceList.set('azul bebé', 2);
	submarineAppearanceList.set('mármore', 3);
	submarineAppearanceList.set('magma', 4);
	submarineAppearanceList.set('ray', 5);
	submarineAppearanceList.set('fade', 6);
	this.currSubmarineAppearance = submarineAppearanceList.get(this.textura);

	//submarine
	this.pushMatrix();
		this.submarineAppearances[this.currSubmarineAppearance].apply();
		this.submarine.display();
	this.popMatrix();
	
	//bottom of the ocean
	this.pushMatrix();
		this.rotate(Math.PI/4, 0, 1, 0);
		this.rotate(-Math.PI/2, 1, 0, 0);
		this.scale(20, 25, 1);
		this.oceanAppearance.apply();
		this.ocean.display();
	this.popMatrix();
	
	//clock on a post
	this.pushMatrix();
		this.translate(8, 5, 0);
		this.rotate(Math.PI/4, 0, 1, 0);
		this.clock.display();
	this.popMatrix();
	this.pushMatrix();
		this.translate(8, 0, 0);
		this.scale(0.2,5,0.2);
		this.rotate(90*degToRad, -1, 0, 0);
		this.marbleAppearance.apply();
		this.cylinder.display();
	this.popMatrix();
	
	//targets
	for (i = 0; i < this.targetList.length; i++)
	{  
		this.targetList[i].index = i; //update target index, just in case it has been changed
		this.pushMatrix();
			this.translate(this.targetList[i].xCoord, this.targetList[i].yCoord, this.targetList[i].zCoord);
			this.targetList[i].display();
		this.popMatrix();
	}
	// ---- END Primitive drawing section
};
