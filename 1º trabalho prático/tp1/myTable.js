/*
 * My table
 */

function myTable(scene) {

	CGFobject.call(this,scene);
	this.table = new MyUnitCubeQuad(this.scene);
	this.table.initBuffers();

};

myTable.prototype = Object.create(CGFobject.prototype);
myTable.prototype.constructor = myTable;


myTable.prototype.display = function (){

       
       // tampo
       this.scene.pushMatrix();
       this.scene.translate(4,3.5,3);
       this.scene.scale(5,0.3,3);
       this.table.display();
       this.scene.popMatrix();

       // pernas
       this.scene.pushMatrix();
       this.scene.translate(2,1.625,2);
       this.scene.scale(0.3,3.5,0.3);
       this.table.display();
       this.scene.popMatrix();

       this.scene.pushMatrix();
       this.scene.translate(2,1.625,4);
       this.scene.scale(0.3,3.5,0.3);
       this.table.display();
       this.scene.popMatrix();

       this.scene.pushMatrix();
       this.scene.translate(6,1.625,4);
       this.scene.scale(0.3,3.5,0.3);
       this.table.display();
       this.scene.popMatrix();

       this.scene.pushMatrix();
       this.scene.translate(6,1.625,2);
       this.scene.scale(0.3,3.5,0.3);
       this.table.display();
       this.scene.popMatrix();
       
};