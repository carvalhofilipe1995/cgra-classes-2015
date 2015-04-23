
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;


 MyLamp.prototype.initBuffers = function() {
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


	
    var raio = 1;
    var R = 1/(this.slices-1);
    var S = 1/(this.stacks-1);

    for(var r = 0; r < this.slices/2; r++){
         for(var s = 0; s < this.stacks; s++) {

             this.vertices.push((Math.cos(2*Math.PI * s * S) * Math.sin( Math.PI * r * R ))*raio);
             this.vertices.push(Math.sin(-Math.PI/2 + Math.PI * r * R)*raio);
             this.vertices.push((Math.sin(2*Math.PI * s * S) * Math.sin( Math.PI * r * R ))*raio);

             this.normals.push(Math.cos(2*Math.PI * s * S) * Math.sin( Math.PI * r * R ));
             this.normals.push(Math.sin(-Math.PI/2 + Math.PI * r * R));
             this.normals.push(Math.sin(2*Math.PI * s * S) * Math.sin( Math.PI * r * R ));
             }

         } 


       for(r = 0; r < (this.slices/2)-1; r++){
         for(s = 0; s < (this.stacks)-1; s++) {
         		var curRow = r * this.stacks;
    			var nextRow = (r+1) * this.stacks;


    			this.indices.push(curRow + s);
    			this.indices.push(nextRow + s);
    			this.indices.push(nextRow + (s+1));

    			this.indices.push(curRow + s);
    			this.indices.push(nextRow + (s+1));
    			this.indices.push(curRow + (s+1));
        }
    }
 

   	console.log(this.vertices);
    console.log(this.indices.length);


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
