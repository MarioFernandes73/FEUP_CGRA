 function MyExplosion(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.semishpere = new MyLamp(this.scene, slices, stacks);
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.display = function() {
	 
	var deltaAng = 2*Math.PI / this.slices;
	var deltaFi = Math.PI*0.5 / this.stacks;

	for(let i = 0; i<=this.stacks; i++)
	{
		for(let j = 0; j< this.slices; j++)
		{
			//Vertex position
			let x = Math.cos(j*deltaAng) * Math.cos(i*deltaFi);
			let y = Math.sin(j*deltaAng) * Math.cos(i*deltaFi);
			let z = Math.sin(i*deltaFi);	
			
			//we will draw a shpere in each point
			this.scene.pushMatrix();
				this.scene.translate(x, y, z);
				this.scene.scale(0.2,0.2,0.2);
				this.scene.explosionAppearance.apply();
				this.semishpere.display();
			this.scene.popMatrix();
			this.scene.pushMatrix();
				this.scene.translate(x, y, z);
				this.scene.rotate(Math.PI,0,1,0);
				this.scene.scale(0.2,0.2,0.2);
				this.semishpere.display();
			this.scene.popMatrix();
		}
	}
 };
