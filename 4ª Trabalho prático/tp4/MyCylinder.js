function MyCylinder(scene, slices, stacks) {

    CGFobject.call(this, scene);

    this.slices = slices;
    this.stacks = stacks;
    this.initBuffers();
};

MyCylinder.prototype = Object.create(CGFobject.prototype);
MyCylinder.prototype.constructor = MyCylinder;

MyCylinder.prototype.initBuffers = function () {

    this.normals = [];
    this.vertices = [];

    var angle = 0;
    var angleIncrement = (2 * Math.PI) / this.slices;
    var stackIncrement = 1.0 / this.stacks;

    for (var i = 0; i <= this.slices; i++) {

        var x = Math.cos(angle);
        var y = Math.sin(angle);
        var z = 0;

        for (var j = 0; j <= this.stacks; j++) {
            this.vertices.push(x, y, z);
            this.normals.push(x, y, 0);
            z += stackIncrement;
        }
        angle += angleIncrement;
    }

   

    var vertex = 1;

    this.indices = [];

    for (var i = 0; i < this.slices; i++) {

        for (var j = 0; j < this.stacks; j++) {

            this.indices.push(vertex, vertex + this.stacks, vertex + this.stacks + 1);
            this.indices.push(vertex + this.stacks, vertex, vertex - 1);
            this.indices.push(vertex + this.stacks + 1, vertex + this.stacks, vertex);
            this.indices.push(vertex, vertex + this.stacks, vertex - 1);
            vertex++;
        }

        vertex += 1;
    }

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};