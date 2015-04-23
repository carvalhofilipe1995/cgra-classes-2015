/**
 * MyAeroplane
 * @constructor
 */
 function MyAeroplane(scene) {
 	CGFobject.call(this,scene);
 	this.initBuffers();
 };

 MyAeroplane.prototype = Object.create(CGFobject.prototype);
 MyAeroplane.prototype.constructor = MyAeroplane;

 MyAeroplane.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];

	// TRIANGULO DA ESQUERDA
 	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, 1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(2, 1, 0);

 	// TRIANGULO DA DIREITA

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, -1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);
	this.normals.push(0, 1, 0);

 	this.indices.push(3, 4, 5);

	// 1 TRIANGULO DE BAIXO

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, -0.3, 0);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(6, 7, 8);

 	// 2 TRIANGULO DE BAIXO

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, -0.3, 0);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);
	this.normals.push(0, 0, -1);

 	this.indices.push(11, 10, 9);

 	// 2 TRIANGULO DA ESQUERDA
 	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, 1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

 	this.indices.push(12, 13, 14);

 	// 2 TRIANGULO DA DIREITA

	this.vertices.push(0, 0, 0);
 	this.vertices.push(0, 0, -1);
 	this.vertices.push(-1, 0, 0);
 	
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

 	this.indices.push(17, 16, 15);

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };

 MyAeroplane.prototype.setTravelTime = function(travelTime) {
 	this.travelTime = travelTime;
 };