/**
 * MyAeroplaneHandlerHandler
 * @constructor
 */
 function MyAeroplaneHandler(scene) {
 	CGFobject.call(this,scene);
	
	this.delta_plane = 0;
	this.lastCurrTime_plane = 0;

	this.first = 0;

	this.distanceX = 14;
	this.rotacao = Math.PI/100;
	this.distanceY = 4.5;
 	this.plane = new MyAeroplane(this.scene);
 	this.plane.setTravelTime(1);
 	this.initBuffers();
 };

 MyAeroplaneHandler.prototype = Object.create(CGFobject.prototype);
 MyAeroplaneHandler.prototype.constructor = MyAeroplaneHandler;

MyAeroplaneHandler.prototype.display = function() {
	
	this.scene.pushMatrix();
	if (this.distanceX - 1 <= this.plane.travelTime) {
		if (this.distanceY + this.distanceX - 2 <= this.plane.travelTime)
		{
			this.scene.translate(-this.distanceX 	 + 1, -this.distanceY + 0.5, 0);
		}
		else
		{	
			this.scene.translate(-this.distanceX + 1, 0, 0);
			this.scene.rotate(Math.PI / 2, 0, 0, 1);
			this.scene.rotate(this.rotacao, 1, 0, 0);
			this.scene.translate(-this.plane.travelTime + this.distanceX - 1, 0, 0);
			this.rotacao+= Math.PI/100;
		}
	}
	else
	{
		this.scene.translate(-this.plane.travelTime, 0, 0);
	}
	this.plane.display();
	this.scene.popMatrix();
	
};

 MyAeroplaneHandler.prototype.update = function(currTime) {
 		
	this.delta_plane = currTime - this.lastCurrTime_plane;
    this.lastCurrTime_plane = currTime;

	if (this.first == 0)
	{
		this.delta_plane = 0;
		this.first = 1;
	}
 	this.plane.setTravelTime(this.plane.travelTime + 2 * (this.delta_plane / 1000));
};