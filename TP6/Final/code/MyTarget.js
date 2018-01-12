function MyTarget(scene, x, y, z, index) {
	CGFobject.call(this,scene);

	this.xCoord = x;
	this.yCoord = y;
	this.zCoord = z;
	this.index = index;//index represents the position on the targetList
	
	this.semisphere = new MyLamp(this.scene, 20, 10); //20 slices 10 stacks
};

MyTarget.prototype = Object.create(CGFobject.prototype);
MyTarget.prototype.constructor = MyTarget;

MyTarget.prototype.display = function () {
	//the target will be a sphere
	this.scene.pushMatrix();
		this.scene.scale(0.5,0.5,0.5);
		this.scene.redAppearance.apply();
		this.semisphere.display();
	this.scene.popMatrix();
	this.scene.pushMatrix();
		this.scene.rotate(Math.PI, 0, 1, 0);
		this.scene.scale(0.5,0.5,0.5);
		this.semisphere.display();
	this.scene.popMatrix();
};