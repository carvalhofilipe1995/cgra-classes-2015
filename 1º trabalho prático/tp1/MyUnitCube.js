/**
 * MyUnityCube
 */

function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};


MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;



MyUnitCube.prototype.initBuffers = function (){

    this.vertices = [
                0.5, -0.5, 0.5,
                0.5, 0.5, 0.5,
                0.5, -0.5, -0.5,
                0.5, 0.5, -0.5,
                -0.5, -0.5, 0.5,
                -0.5, 0.5, 0.5,
                -0.5, 0.5, -0.5,
                -0.5, -0.5, -0.5
    ];

    this.indices = [
      0, 1, 5, 		// -> face
      0, 5, 4,		// da frente

      7, 6, 3,      // -> face 
      3, 2, 7,		// de trás

      0, 3, 1,		// -> face
      0, 2, 3,		// lateral direita

      4, 6, 7,		// -> face
      4, 5, 6,		// lateral esquerda

	  1, 6, 5,		// -> face
	  6, 1, 3,		// cima

	  2, 0, 4,		// -> face
	  2, 4, 7		// baixo 
    ];

    this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};