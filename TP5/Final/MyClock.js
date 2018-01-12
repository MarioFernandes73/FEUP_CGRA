var degToRad = Math.PI / 180.0;

var secondIncrement = 360.0/600;
var minuteIncrement = 360.0/36000;
var hourIncrement = 360.0/432000;

function MyClock(scene) {
	CGFobject.call(this,scene);

	this.cylinder = new MyCylinder(this.scene, 12, 1); //the cylinder will 12 slices and 1 stack
	this.polygon = new MyPolygon(this.scene, 12); //the polygon on top of the cylinder will also have 12 slices
	
	//3h30min45sec
	this.hours = 3;
	this.minutes = 30;
	this.seconds = 45;
	
	this.handHours = new MyClockHand(this.scene);
	this.handHours.setAngle(this.hours*(360/12) + ((this.seconds+this.minutes*60)/(60*60))*(360/12));
	
	this.handMinutes = new MyClockHand(this.scene);
	this.handMinutes.setAngle(this.minutes*(360/60) + (45/60)*(360/60));
	
	this.handSeconds = new MyClockHand(this.scene);
	this.handSeconds.setAngle(this.seconds*(360/60));

	this.currentTime;
};

MyClock.prototype = Object.create(CGFobject.prototype);
MyClock.prototype.constructor = MyClock;

MyClock.prototype.update = function(currTime) {
	if(currTime/1000 != this.currentTime) {
		this.handHours.setAngle((this.handHours.angle + hourIncrement) % 360);
		this.handMinutes.setAngle((this.handMinutes.angle + minuteIncrement) % 360);
		this.handSeconds.setAngle((this.handSeconds.angle + secondIncrement) % 360);
		this.currentTime = currTime/1000;
	}
};

MyClock.prototype.display = function () {
	
	//Cylinder
	this.scene.pushMatrix();
		this.scene.scale(1,1,0.2);
		this.scene.tableAppearance.apply();
		this.cylinder.display();
	this.scene.popMatrix();
	
	//Polygon
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.201);
		this.scene.clockAppearance.apply();
		this.polygon.display();
	this.scene.popMatrix();
	
	//Clock hands
	//Hours indicator
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.206);
		this.scene.rotate(-degToRad*this.handHours.angle,0,0,1);
		this.scene.scale(1,0.5,1);
		this.scene.blackAppearance.apply();
		this.handHours.display();
	this.scene.popMatrix();
	//Minutes indicator
	this.scene.pushMatrix();
		this.scene.translate(0,0,0.205);
		this.scene.rotate(-degToRad*this.handMinutes.angle,0,0,1);
		this.scene.scale(1,0.9,1);
		this.scene.blackAppearance.apply();
		this.handMinutes.display();
	this.scene.popMatrix();
	//Seconds indicator
	this.scene.pushMatrix();//Meter a vermelho
		this.scene.translate(0,0,0.204);
		this.scene.rotate(-degToRad*this.handSeconds.angle,0,0,1);
		this.scene.scale(1,0.9,1);
		this.scene.redAppearance.apply();
		this.handSeconds.display();
	this.scene.popMatrix();
	
};