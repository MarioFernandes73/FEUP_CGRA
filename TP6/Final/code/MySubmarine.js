 var A_KEY_PRESSED = 97;
 var A_KEY_UP = 65;
 var W_KEY_PRESSED = 119;
 var S_KEY_PRESSED = 115;
 var D_KEY_PRESSED = 100;
 var D_KEY_UP = 68;
 var Q_KEY_PRESSED = 113;
 var Q_KEY_UP = 81;
 var E_KEY_PRESSED = 101;
 var E_KEY_UP = 69;
 var P_KEY_PRESSED = 112;
 var L_KEY_PRESSED = 108;
 var F_KEY_PRESSED = 102;
 
 var movementAcceleration = 0.1;
 var verticalMovementVelocity = 0.3;
 var periscopeMovementVelocity = 0.03;
 var rotationVelocity = 0.1; //represents the submarine turning angle increment
 var verticalRotationVelocity = 0.1; //represents the submarine up/down angle increment
 var framesPerSecond = 10;
 var finOpenAngle = Math.PI/4;
 
 function MySubmarine(scene) {
 	CGFobject.call(this,scene);

	this.directionAngle = 0;
	this.verticalAngle = 0;
	this.movementVelocity = 0;
	this.xCoord = 0;
	this.yCoord = 1.5;
	this.zCoord = 0;
	this.propellerAngle = 0;
	this.verticalFinAngle = 0;
	this.horizontalFinAngle = 0;
	this.periscopeYcoord = 0.77;
	
	this.torpedoList = [];
	
	this.cylinder = new MyCylinder(this.scene, 20, 10); //20 slices 10 stacks
	this.insideCylinder = new MyInsideCylinder(this.scene, 20, 10); //20 slices 10 stacks
	this.semisphere = new MyLamp(this.scene, 20, 10); //20 slices 10 stacks
	this.polygon = new MyPolygon(this.scene, 20); //20 slices
	this.cube = new MyUnitCubeQuad(this.scene);
	this.trapezius = new MyTrapezius(this.scene, 2.34/1.64);
 };

 MySubmarine.prototype = Object.create(CGFobject.prototype);
 MySubmarine.prototype.constructor = MySubmarine;

 MySubmarine.prototype.update = function() {
 	if(this.yCoord + this.movementVelocity*Math.sin(this.verticalAngle) > 0.5) //we only update the submarine coordinates if it doesnt go beyond the ocean limit 
 	{ 
		this.xCoord += this.movementVelocity*Math.sin(this.directionAngle)*Math.cos(this.verticalAngle);
		this.zCoord += this.movementVelocity*Math.cos(this.directionAngle)*Math.cos(this.verticalAngle);
		this.yCoord += this.movementVelocity*Math.sin(this.verticalAngle);
 	}
	
	//propeller rotation
	var propellerRPS = this.movementVelocity/movementAcceleration; //movementAcceleration represents the minimum velocity
	var propellerAngularVelocity = (propellerRPS*2*Math.PI)/framesPerSecond;
	this.propellerAngle = (this.propellerAngle + propellerAngularVelocity) % (Math.PI * 2);

	for (k = 0; k < this.torpedoList.length; k++)
	{ 	
		this.torpedoList[k].move();	
		if(this.torpedoList[k].animationEnd)
			this.torpedoList.splice(k, 1);
			
	}
 };

 MySubmarine.prototype.move = function(keyPressed) {
 	switch (keyPressed)
	{
		case (A_KEY_PRESSED):
			if(this.movementVelocity != 0)
			{
				this.directionAngle = (this.directionAngle + rotationVelocity) % (Math.PI * 2);
				this.verticalFinAngle = -finOpenAngle;
			}
			break;

		case (W_KEY_PRESSED):
			this.movementVelocity += movementAcceleration;
			break;

		case (S_KEY_PRESSED):
			this.movementVelocity -= movementAcceleration;
			break;

		case (D_KEY_PRESSED):
			if(this.movementVelocity != 0)
			{
				this.directionAngle = (this.directionAngle - rotationVelocity) % (Math.PI * 2);
				this.verticalFinAngle = finOpenAngle;
			}
			break;
			
		case (Q_KEY_PRESSED):
			this.verticalAngle += verticalRotationVelocity;
			this.horizontalFinAngle = finOpenAngle;
			break;
		
		case (E_KEY_PRESSED):
			this.verticalAngle -= verticalRotationVelocity;
			this.horizontalFinAngle = -finOpenAngle;
			break;

		case (P_KEY_PRESSED):
			var topCylinderCoverYcoord = 1.17;
			this.periscopeYcoord = (this.periscopeYcoord + periscopeMovementVelocity <= topCylinderCoverYcoord) ? this.periscopeYcoord + periscopeMovementVelocity : topCylinderCoverYcoord;
			break;

		case (L_KEY_PRESSED):
			var topCylinderCoverYcoord = 1.17;
			var periscopeLength = 1;
			this.periscopeYcoord = (this.periscopeYcoord - periscopeMovementVelocity >= topCylinderCoverYcoord - periscopeLength*0.8) ? this.periscopeYcoord - periscopeMovementVelocity : topCylinderCoverYcoord - periscopeLength*0.8;
			break;
		
		case (F_KEY_PRESSED):
			if(this.scene.targetList.length > 0 && this.scene.nextTargetIndex < this.scene.targetList.length)//if the target list is not empty and there are targets which dont have a torpedo locked to them
			{   
				var directionX = Math.sin(this.directionAngle)*Math.cos(this.verticalAngle);
				var directionZ = Math.cos(this.directionAngle)*Math.cos(this.verticalAngle);
				var directionY = Math.sin(this.verticalAngle);
				var torpedoX = this.xCoord + 3*directionX;
				var torpedoY = (this.yCoord - 0.75) + 3*directionY;
				var torpedoZ = this.zCoord + 3*directionZ;
				var orientationVector = [6*directionX, 6*directionY, 6*directionZ];//this orientation vector is 6 units long and points to the submarine direction
				this.torpedoList.push(new MyTorpedo(this.scene, torpedoX, torpedoY, torpedoZ, this.scene.targetList[this.scene.nextTargetIndex], orientationVector));
				this.scene.nextTargetIndex++;
			}
			break;
	};

	//this is here to avoid rounding calculations which don't allow the value to be exactly zero
	this.movementVelocity = (this.movementVelocity < 0.00001 && this.movementVelocity > -0.00001) ? 0 : this.movementVelocity;
	
 };
 
 MySubmarine.prototype.stopRotation = function(keyUp) {
 	if (keyUp == A_KEY_UP || keyUp == D_KEY_UP)
		this.verticalFinAngle = 0;

	if(keyUp == Q_KEY_UP || keyUp == E_KEY_UP)
		this.horizontalFinAngle = 0;
 };
 
 MySubmarine.prototype.display = function() {
 	this.scene.pushMatrix();
		this.scene.translate(this.xCoord, this.yCoord , this.zCoord);
		this.scene.rotate(this.directionAngle, 0, 1, 0);
		this.scene.rotate(-this.verticalAngle, 1, 0, 0);

	//main cylinder
	this.scene.pushMatrix();
		this.scene.translate(0, 0, (5.00-4.08)/2.00);
		this.scene.scale(0.73/2.0, 1.2/2.0, 4.08);
		this.cylinder.display();
	this.scene.popMatrix();

	//front semisphere
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 4.08 + ((5.00-4.08)/2.00) );
		this.scene.scale(0.73/2.0, 1.2/2.0, (5.00-4.08)/2.00);
		this.semisphere.display();
	this.scene.popMatrix();
 	
 	//back semisphere
 	this.scene.pushMatrix();
		this.scene.translate(0, 0, (5.00-4.08)/2.00);
		this.scene.scale(0.73/2.0, 1.2/2.0, (5.00-4.08)/2.00);
		this.scene.rotate(Math.PI, 1, 1, 0);
		this.semisphere.display();
	this.scene.popMatrix();

	//top cylinder
	this.scene.pushMatrix();
		this.scene.translate(0, 1.17-1.0, 5.0*0.6);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.6/2.0, 0.88/2.0, 1.0);
		this.cylinder.display();
	this.scene.popMatrix();

	//top cylinder cover
	this.scene.pushMatrix();
		this.scene.translate(0, 1.17, 5.0*0.6);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.6/2.0, 0.88/2.0, 1.0);
		this.polygon.display();
	this.scene.popMatrix();

	//periscope
	var periscopeLength = 1;
	this.scene.pushMatrix();
		this.scene.translate(0, this.periscopeYcoord, 5.0*0.6+0.3);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(0.03, 0.03, periscopeLength);
		this.cylinder.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.translate(0, this.periscopeYcoord+periscopeLength-0.03, 5.0*0.6+0.3-0.03);
		this.scene.scale(0.03, 0.03, 0.1);
		this.cylinder.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.translate(0, this.periscopeYcoord+periscopeLength-0.03, 5.0*0.6+0.3-0.03+0.1);
		this.scene.scale(0.03, 0.03, 1);
		this.polygon.display();
	this.scene.popMatrix();
	
	//left propeller
	//helice
	this.scene.pushMatrix();
		this.scene.translate(-0.73/2.00-0.2,-0.3, (5.00-4.08)/2.00+(5.00-4.08)/8.00);
		this.scene.rotate(-this.propellerAngle, 0, 0, 1);
		this.scene.scale(0.07,0.35,0.01);
		this.cube.display();
	this.scene.popMatrix();
	////cylinder that can be seen from inside and outside
	//outside cylinder
	this.scene.pushMatrix();
		this.scene.translate(-0.73/2.00-0.2,-0.3, (5.00-4.08)/2.00);
		this.scene.scale(0.4/2.00, 0.4/2.00, (5.00-4.08)/4.00);
		this.cylinder.display();
	this.scene.popMatrix();
	//inside cylinder
	this.scene.pushMatrix();
		this.scene.translate(-0.73/2.00-0.2,-0.3, (5.00-4.08)/2.00);
		this.scene.scale(0.4/2.00, 0.4/2.00, (5.00-4.08)/4.00);
		this.insideCylinder.display();
	this.scene.popMatrix();
	//semisphere
	this.scene.pushMatrix();
		this.scene.translate(-0.73/2.00-0.2,-0.3, (5.00-4.08)/2.00 + (5.00-4.08)/8.00);
		this.scene.scale(0.07/2.0, 0.07/2.0, 0.05);
		this.scene.rotate(Math.PI, 1, 1, 0);
		this.scene.rotate(-this.propellerAngle, 0, 0, 1);
		this.semisphere.display();
	this.scene.popMatrix();
	
	//right propeller
	//helice
	this.scene.pushMatrix();
		this.scene.translate(0.73/2.00+0.2,-0.3, (5.00-4.08)/2.00+(5.00-4.08)/8.00);
		this.scene.rotate(this.propellerAngle, 0, 0, 1);
		this.scene.scale(0.07,0.35,0.01);
		this.cube.display();
	this.scene.popMatrix();
	//cylinder that can be seen from inside and outside
	//outside cylinder
	this.scene.pushMatrix();
		this.scene.translate(0.73/2.00+0.2,-0.3, (5.00-4.08)/2.00);
		this.scene.scale(0.4/2.00, 0.4/2.00, (5.00-4.08)/4.00);
		this.cylinder.display();
	this.scene.popMatrix();
	//inside cylinder
	this.scene.pushMatrix();
		this.scene.translate(0.73/2.00+0.2,-0.3, (5.00-4.08)/2.00);
		this.scene.scale(0.4/2.00, 0.4/2.00, (5.00-4.08)/4.00);
		this.insideCylinder.display();
	this.scene.popMatrix();
	//semisphere
	this.scene.pushMatrix();
		this.scene.translate(0.73/2.00+0.2,-0.3, (5.00-4.08)/2.00 + (5.00-4.08)/8.00);
		this.scene.scale(0.07/2.0, 0.07/2.0, 0.05);
		this.scene.rotate(Math.PI, 1, 1, 0);
		this.scene.rotate(this.propellerAngle, 0, 0, 1);
		this.semisphere.display();
	this.scene.popMatrix();
	
	//top cylinder fin
	this.scene.pushMatrix();
		this.scene.translate(0, 0.89, 5.0*0.6);
		this.scene.rotate(this.horizontalFinAngle, 1, 0, 0);
		this.scene.rotate(-Math.PI/2, 1, 0, 0);
		this.scene.scale(1.53, 0.29, 0.06);
		this.trapezius.display();
	this.scene.popMatrix();

	//back horizontal fin
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.17);
		this.scene.translate(0, 0, 0.29);
		this.scene.rotate(this.horizontalFinAngle, 1, 0, 0);
		this.scene.translate(0, 0, -0.29);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(2.34, 0.29, 0.1);
		this.trapezius.display();
	this.scene.popMatrix();

	//back vertical fin
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.17);
		this.scene.translate(0, 0, 0.29);
		this.scene.rotate(this.verticalFinAngle, 0, 1, 0);
		this.scene.translate(0, 0, -0.29);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(2.34, 0.29, 0.1);
		this.trapezius.display();
	this.scene.popMatrix();
	
	this.scene.popMatrix();
	
	//torpedos and explosions
	for (i = 0; i < this.torpedoList.length; i++)
	{ 
		this.scene.pushMatrix();
			this.scene.translate(this.torpedoList[i].xCoord, this.torpedoList[i].yCoord, this.torpedoList[i].zCoord);
			this.scene.rotate(this.torpedoList[i].xOzAngle, 0, 1, 0);
			this.scene.rotate(-this.torpedoList[i].yOzAngle, 1, 0, 0);
			this.scene.submarineAppearances[this.scene.currSubmarineAppearance].apply();
			this.torpedoList[i].display();
		this.scene.popMatrix();
		if(this.torpedoList[i].explosionRadius > 0)
		{
			//top half of the explosion
			this.scene.pushMatrix();
				this.scene.translate(this.torpedoList[i].xCoord,this.torpedoList[i].yCoord,this.torpedoList[i].zCoord);
				this.scene.rotate(-Math.PI/2, 1,0,0);
				this.scene.scale(this.torpedoList[i].explosionRadius,this.torpedoList[i].explosionRadius,this.torpedoList[i].explosionRadius);
				this.torpedoList[i].explosion.display();
			this.scene.popMatrix();
			//bottom half of the explosion
			this.scene.pushMatrix();
				this.scene.translate(this.torpedoList[i].xCoord,this.torpedoList[i].yCoord,this.torpedoList[i].zCoord);
				this.scene.rotate(Math.PI/2, 1,0,0);
				this.scene.scale(this.torpedoList[i].explosionRadius,this.torpedoList[i].explosionRadius,this.torpedoList[i].explosionRadius);
				this.torpedoList[i].explosion.display();
			this.scene.popMatrix();
		}
	}
 };

