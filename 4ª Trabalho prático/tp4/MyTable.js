function MyTable(scene)
{
    CGFobject.call(this, scene);

    this.quad = new MyUnitCubeQuad(this.scene);
    this.quad.initBuffers();
    
    this.woodMaterial = new CGFappearance(this.scene);
	this.woodMaterial.setAmbient(0.2, 0.2, 0.2, 1.0);
	this.woodMaterial.setDiffuse(0.9, 0.9, 0.9, 1.0);
	this.woodMaterial.setSpecular(0.2, 0.2, 0.2, 1.0);	
	this.woodMaterial.setShininess(40);
	this.woodMaterial.loadTexture("../resources/images/table.png");

	this.metalMaterial = new CGFappearance(this.scene);
	this.metalMaterial.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.metalMaterial.setDiffuse(0.4, 0.4, 0.4, 1.0);
	this.metalMaterial.setSpecular(0.6, 0.6, 0.6, 1.0);
	this.metalMaterial.setShininess(4);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor = MyTable;

MyTable.prototype.display = function ()
{
    // LEGS

    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75, 1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.metalMaterial.apply();
    this.quad.display();
    this.scene.popMatrix();

  
    this.scene.pushMatrix();
    this.scene.translate(2.35, 1.75, 1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.quad.display();
    this.scene.popMatrix();

    
    this.scene.pushMatrix();
    this.scene.translate(-2.35, 1.75, -1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.quad.display();
    this.scene.popMatrix();

 
    this.scene.pushMatrix();
    this.scene.translate(2.35, 1.75, -1.35);
    this.scene.scale(0.3, 3.5, 0.3);
    this.quad.display();
    this.scene.popMatrix();

    // TAMP
    
    this.scene.pushMatrix();
    this.scene.translate(0, 3.65, 0);
    this.scene.scale(5, 0.3, 3);
    this.woodMaterial.apply();
    this.quad.display();
    this.scene.popMatrix();
};