/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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


 	var alfa = 2 * Math.PI / this.slices;

 	var inc_stack = 1 / this.stacks;

 	var inc = 0;

 	for (var i = 0; i < this.slices; i++) {

        for(var j = 0; j <= this.stacks; j++){

			this.vertices.push(Math.cos(i*alfa),Math.sin(i*alfa),j * inc_stack);
			this.vertices.push(Math.cos(i*alfa + alfa),Math.sin(i*alfa + alfa),j * inc_stack);

			this.normals.push(Math.cos(i*alfa + alfa/2),Math.sin(i*alfa + alfa/2),0);
			this.normals.push(Math.cos(i*alfa + alfa/2),Math.sin(i*alfa + alfa/2),0);

			if(j!=0){
					this.indices.push(3+i*(2*this.stacks+2)+2*(j-1),2+i*(2*this.stacks+2)+2*(j-1),0+i*(2*this.stacks+2)+2*(j-1));
					this.indices.push(3+i*(2*this.stacks+2)+2*(j-1) ,0+i*(2*this.stacks+2)+2*(j-1),1+i*(2*this.stacks+2)+2*(j-1));
			}

        }

     }
 

	
 

   	console.log(this.vertices);
    console.log(this.indices.length);

 	




 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
