function Plane(scene, Divions, minS, maxS, minT, maxT)
{
	CGFobject.call(this,scene);


    this.minS = minS;
   	this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
	this.Divions = Divions;
	this.patchLength = 1.0 /Divions;
	this.texelLengthS = (maxS - minS) / Divions;
	this.texelLengthT = (maxT - minT) / Divions;
	this.initBuffers();
};

Plane.prototype = Object.create(CGFobject.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.initBuffers = function (){
	this.vertices = [];
	this.normals = [];
	this.texCoords = [];

	var yCoordinate = 0.5;
	var tCoordinate = this.minT;

	for (var j = 0; j <= this.Divions; j++) {
		var xCoordinate = -0.5;
		var sCoordinate = this.minS;
		
		for (var i = 0; i <= this.Divions; i++){
			this.vertices.push(xCoordinate, yCoordinate, 0);
			this.normals.push(0, 0, 1);
			this.texCoords.push(sCoordinate, tCoordinate);

			xCoordinate += this.patchLength;
			sCoordinate += this.texelLengthS;
		}
		
		yCoordinate -= this.patchLength;
		tCoordinate += this.texelLengthT;
	}

	this.indices = [];

	var ind = 0;

	for (var j = 0; j < this.Divions; j++) {
		for (var i = 0; i <= this.Divions; i++) {
			this.indices.push(ind);
			this.indices.push(ind + this.Divions + 1);

			ind++;
		}

		if (j+1 < this.Divions){
			this.indices.push(ind+this.Divions);
			this.indices.push(ind);
		}
	}
	
	this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	this.initGLBuffers();
};