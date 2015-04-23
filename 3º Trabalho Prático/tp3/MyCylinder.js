
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
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

 	// Vértices e normais

 	for (var i = 0; i < this.slices; i++) {
	
		for(var j = 0; i <= this.stacks; j++){

			this.vertices.push(Math.cos(i*alfa + alfa), Math.sin(i*alfa + alfa), j*inc_stack);

			this.normals.push(Math.cos(i*alfa), Math.sin(i*alfa),0)

			if(j != 0){
				this.indices.push(3+i*(2*this.stacks+2)+2*(j-1),2+i*(2*this.stacks+2)+2*(j-1),0+i*(2*this.stacks+2)+2*(j-1));
				this.indices.push(3+i*(2*this.stacks+2)+2*(j-1) ,0+i*(2*this.stacks+2)+2*(j-1),1+i*(2*this.stacks+2)+2*(j-1));
			}
				
		}
		
    }
		
	console.log(this.vertices);

     // Indices

     for(var j = 0; j < this.stacks; j++){

     }

	

 
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
