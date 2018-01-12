var framesPerSecond = 10;
var tIncrement;
var X = 0;
var Y = 1;
var Z = 2;
var explosionTimeLimit = 1.5*framesPerSecond; // the explosion will last 1.5 seconds

function MyTorpedo(scene, x, y, z, target, orientationVector) {
	CGFobject.call(this,scene);

	//the point which represents the torepedo is located on its front
	this.xCoord = x;
	this.yCoord = y;
	this.zCoord = z;
	this.orientationVector = orientationVector;
	this.target = target;
	this.t = 0;
	this.P1 = [x, y, z];
	this.P2 = [x+orientationVector[X], y+orientationVector[Y], z+orientationVector[Z]];
	this.P3 = [target.xCoord, target.yCoord+3, target.zCoord];
	this.P4 = [target.xCoord, target.yCoord, target.zCoord];
	
	var x1 = this.orientationVector[X];
	var y1 = this.orientationVector[Y];
	var z1 = this.orientationVector[Z];
	var N1 = Math.sqrt(Math.pow(x1,2) + Math.pow(y1,2)+ Math.pow(z1,2));
	this.xOzAngle = Math.atan2(x1, z1);
	this.yOzAngle = Math.asin(y1/N1);

	this.explosionTime = 0;
	this.explosionRadius = 0;
	this.explosion = new MyExplosion(this.scene, 20 ,10); //20 slices, 10 stacks
	this.animationEnd = false;
	
	var targetDistance = Math.sqrt(Math.pow(this.xCoord-target.xCoord,2) + Math.pow(this.yCoord-target.yCoord,2) + Math.pow(this.zCoord-target.zCoord,2));
	tIncrement = 1/(targetDistance*framesPerSecond);
	console.log(targetDistance);
	this.cylinder = new MyCylinder(this.scene, 20, 10); //20 slices 10 stacks
	this.semisphere = new MyLamp(this.scene, 20, 10); //20 slices 10 stacks
	this.trapezius = new MyTrapezius(this.scene, 2.34/1.64);
};

MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor = MyTorpedo;

MyTorpedo.prototype.move = function() {

	var begginingExplosionRadius = 0.5;
	//check if the torpedo trajectory ended
	if(this.t + tIncrement >= 1)
	{  
		this.explosionRadius = (this.explosionRadius == 0) ? begginingExplosionRadius : this.explosionRadius; //the the explosion begins we have to set its radius to an intial value
		this.explode();
		return;
	}
	
	//save the old variables
	var oldX = this.Q(this.t, X);
	var oldY = this.Q(this.t, Y);
	var oldZ = this.Q(this.t, Z);

	//update position coordinates
	this.t += tIncrement;
	this.xCoord = this.Q(this.t, X);
	this.yCoord = this.Q(this.t, Y);
	this.zCoord = this.Q(this.t, Z);
	
	//calculate orientation vector using position coordinates of the next movement
	this.orientationVector = [this.xCoord - oldX, this.yCoord - oldY, this.zCoord - oldZ];

	//calculate angles for torpedo inclination
	var x = this.orientationVector[X];
	var y = this.orientationVector[Y];
	var z = this.orientationVector[Z];
	var N = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)+ Math.pow(z,2));

	this.xOzAngle = Math.atan2(x, z);
	this.yOzAngle = Math.asin(y/N);
};

MyTorpedo.prototype.Q = function(t, coord) {
	var tMatrix = [Math.pow(t, 3), Math.pow(t, 2), t, 1];
	var bezierMatrix = [ [-1, 3, -3, 1],
						 [3, -6, 3, 0],
						 [-3, 3, 0, 0],
						 [1, 0, 0, 0] ];
	var geometricMatrix = [this.P1[coord],
						  this.P2[coord],
						  this.P3[coord],
						  this.P4[coord]];

	var TM = [0, 0, 0, 0];
	for (i = 0; i < TM.length; i++)
	{  
		 for (j = 0; j < tMatrix.length; j++)
		 {  
		 	 TM[i] += tMatrix[j]*bezierMatrix[j][i];
		 }
	}

	var returnValue = 0;
	for (i = 0; i < TM.length; i++)
	{  
		returnValue += TM[i]*geometricMatrix[i];
	}
	return returnValue;
};

MyTorpedo.prototype.explode = function() {
	var explosionRadiusIncrement = 0.05;
	if(this.explosionTime < explosionTimeLimit)//if the explosion hasn't ended yet
	{  	
		this.explosionRadius += explosionRadiusIncrement;
		this.explosionTime++;
	}
	else//if the explosion ended
	{
		this.scene.targetList.splice(this.target.index, 1);//eliminate target from the list
		this.scene.nextTargetIndex--;
		this.animationEnd = true;
	}
};

MyTorpedo.prototype.display = function () {
	//the torpedo will be a submarine body copy
	this.scene.pushMatrix();
		this.scene.translate(0,0,-1);
		this.scene.scale(0.2, 0.2, 0.2); //this will reduce the submarine body copy length to 1 while keeping dimension ratio
		
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
	
	//back horizontal fin
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.17+0.29);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(2.34, 0.29, 0.1);
		this.trapezius.display();
	this.scene.popMatrix();

	//back vertical fin
	this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.17+0.29);
		this.scene.rotate(Math.PI/2, 0, 0, 1);
		this.scene.rotate(Math.PI/2, 1, 0, 0);
		this.scene.scale(2.34, 0.29, 0.1);
		this.trapezius.display();
	this.scene.popMatrix();
		
	this.scene.popMatrix();


};