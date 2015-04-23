function MyUnitCubeQuad(scene)
{
    CGFobject.call(this, scene);

	this.quad = new MyQuad(this.scene);
    this.quad.initBuffers();
};

MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

MyUnitCubeQuad.prototype.display = function ()
{
	// front
	this.scene.pushMatrix();
	this.scene.translate(0, 0, 0.5);
	this.quad.display();
	this.scene.popMatrix();

	// back
	this.scene.pushMatrix();
	this.scene.translate(0, 0, -0.5);
	this.scene.rotate(-Math.PI, 0, 1, 0);
	this.quad.display();
	this.scene.popMatrix();

	// left
	this.scene.pushMatrix();
	this.scene.translate(-0.5, 0, 0);
	this.scene.rotate(-Math.PI/2, 0, 1, 0);
	this.quad.display();
	this.scene.popMatrix();

	// right
	this.scene.pushMatrix();
	this.scene.translate(0.5, 0, 0);
	this.scene.rotate(Math.PI/2, 0, 1, 0);
	this.quad.display();
	this.scene.popMatrix();

	// up
	this.scene.pushMatrix();
	this.scene.translate(0, 0.5, 0);
	this.scene.rotate(-Math.PI/2, 1, 0, 0);
	this.quad.display();
	this.scene.popMatrix();

	// down
	this.scene.pushMatrix();
	this.scene.translate(0, -0.5, 0);
	this.scene.rotate(Math.PI/2, 1, 0, 0);
	this.quad.display();
	this.scene.popMatrix();
};