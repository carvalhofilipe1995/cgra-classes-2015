/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.delta = 0;
	this.lastCurrTime = 0;
	
	this.first = 0;

	this.slices = slices;
	this.stacks = stacks;

	this.cilindro = new MyCylinder(this.scene, this.slices, this.stacks);
	this.cilindro.initBuffers();

	this.tampo = new MyCircle(this.scene, this.slices);
	this.tampo.initBuffers();

	this.horas = new MyClockHand(this.scene);
	this.horas.initBuffers();
	this.segundos = new MyClockHand(this.scene);
	this.segundos.initBuffers();
	this.minutos = new MyClockHand(this.scene);
	this.minutos.initBuffers();

	this.minutos.setAngle(180);
	this.horas.setAngle(90);
	this.segundos.setAngle(270);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.loadTexture("clock.png");
	this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.clockAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.clockAppearance.setShininess(10);
	this.clockAppearance.setDiffuse(0.8, 0.8, 0.8, 1);

	this.material = new CGFappearance(this.scene);
	this.material.setAmbient(0.5, 0.5, 0.5, 1);
	this.material.setDiffuse(0.5, 0.5, 0.5, 1);
	this.material.setSpecular(0.5, 0.5, 0.5, 1);
	this.material.setShininess(40);

 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {

	this.scene.pushMatrix();
	this.clockAppearance.apply();
	this.tampo.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.material.apply();
	this.scene.scale(1, 1, 0.3);
	this.cilindro.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.material.apply();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.rotate(-this.segundos.angle * Math.PI / 180, 0, 0, 1);
	this.segundos.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.material.apply();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.rotate(-this.minutos.angle * Math.PI / 180, 0, 0, 1);
	this.scene.scale(1, 0.7, 1);
	this.minutos.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.material.apply();
	this.scene.rotate(Math.PI, 1, 0, 0);
	this.scene.rotate(-this.horas.angle * Math.PI / 180, 0, 0, 1);
	this.scene.scale(1, 0.4, 1);
	this.horas.display();
	this.scene.popMatrix();

 };

MyClock.prototype.update = function(currTime) {
	
	this.delta = currTime - this.lastCurrTime;
    this.lastCurrTime = currTime;

	if (this.first == 0)
	{
		this.delta = 0;
		this.first = 1;
	}
 	this.segundos.setAngle(this.segundos.angle + 360 / 60 * (this.delta / 1000));
 	this.minutos.setAngle(this.minutos.angle + 360 / (60 * 60) * (this.delta / 1000));
 	this.horas.setAngle(this.horas.angle + 360 / (60 * 60 * 60) * (this.delta / 1000));
};

