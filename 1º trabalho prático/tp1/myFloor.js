/*
 * My Floor
 */


 function myFloor(scene) {

	CGFobject.call(this,scene);
	this.floor= new MyUnitCubeQuad(this.scene);
	this.floor.initBuffers();

};


myFloor.prototype = Object.create(CGFobject.prototype);
myFloor.prototype.constructor = myFloor;



myFloor.prototype.display = function (){
    
    // floor
    this.scene.pushMatrix();
    this.scene.translate(4,-0.1,3);
    this.scene.scale(8,0.1,6);
    this.floor.display();
    this.scene.popMatrix();
};