/**
 * MyPrism
 * @constructor
 */
 function MyCilinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCilinder.prototype = Object.create(CGFobject.prototype);
 MyCilinder.prototype.constructor = MyCilinder;

 MyCilinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];
 	this.normals = [];
 	this.indices = [];


	var degtorad=Math.PI/180.0;
  var angulo = 360/this.slices;
  var inc_z = 1/this.stacks;
  var a_rad = angulo*degtorad;
 
  // Cálculo vértices e normais
  for(var j = 0; j < this.stacks+1; j++){
    for(var i = 0; i < this.slices; i++){
     this.vertices.push(Math.cos(a_rad*i), Math.sin(a_rad*i),0.5-(inc_z*j));
     this.normals.push(Math.cos(a_rad*i),Math.sin(a_rad*i),0);
   }
 }
 
 // Cálculo Indices
 for(var j = 0; j < this.stacks; j++){
   for(var i = 0; i < this.slices; i++){
    this.indices.push(i + j*this.slices, i + (j+1)*this.slices, (i + 1)%(this.slices) + (j+1)*this.slices);
    this.indices.push(i + j*this.slices, (i + 1)%(this.slices) + (j+1)*this.slices, (i + 1)%(this.slices) + j*this.slices);
   }
 }


   	console.log(this.vertices.length);
    console.log(this.normals.length);
    console.log(this.indices.length);


 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
