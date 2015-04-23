var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;
var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() 
{
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) 
{
	CGFscene.prototype.init.call(this, application);

	this.enableTextures(true);
	this.initCameras();
	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0.0, 1.0);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0.0, 1.0, 0.0, 1.0);
	this.floor = new MyQuad(this, 0.0, 10.0, 0, 12.0);
	this.table = new MyTable(this);
	this.wall1 = new MyQuad(this, -1.0, 2.0, -0.5, 1.5);
	this.wall2 = new MyQuad(this, 0.0, 2.0, 0.0, 2.0);
	this.materialDefault = new CGFappearance(this);
	this.cylinder = new MyCylinder(this, 32, 64);
	
	this.slides = new CGFappearance(this);
	this.slides.setAmbient(0.5, 0.5, 0.5, 1.0);
	this.slides.setDiffuse(0.8, 0.8, 0.8, 0.8);
	this.slides.setSpecular(0.2, 0.2, 0.2, 0.2);
   	this.slides.loadTexture("../resources/images/slides.png");
   	this.slides.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");
   	
	this.board = new CGFappearance(this);
	this.board.setSpecular(1.0, 1.0, 1.0, 0.8);
	this.board.setAmbient(0.3, 0.3, 0.3, 1.0);
	this.board.setDiffuse(0.6, 0.6, 0.6, 0.6);
	this.board.setShininess(60);
   	this.board.loadTexture("../resources/images/board.png");
   	this.board.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");



   	this.floorApp = new CGFappearance(this);
    this.floorApp.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.floorApp.setDiffuse(0.8, 0.8, 0.8, 1.0);
    this.floorApp.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.floorApp.loadTexture("../resources/images/floor.png");
    this.floorApp.setTextureWrap("REPEAT", "REPEAT");

   	this.window = new CGFappearance(this);
   	this.window.setAmbient(0.5, 0.5, 0.5, 1.0);
    this.window.setDiffuse(0.8, 0.8, 0.8, 1.0);
    this.window.setSpecular(0.1, 0.1, 0.1, 1.0);
   	this.window.loadTexture("../resources/images/window.png");
   	this.window.setTextureWrap("CLAMP_TO_EDGE", "CLAMP_TO_EDGE");

   	this.wall = new CGFappearance(this);
    this.wall.setSpecular(0.1, 0.1, 0.1, 1.0);
    this.wall.setAmbient(0.3, 0.3, 0.3, 1.0);
    this.wall.setDiffuse(0.8, 0.8, 0.8, 1.0);
};

LightingScene.prototype.initCameras = function() 
{
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() 
{
	this.setGlobalAmbientLight(0.0, 0.0, 0.0, 1.0);
	this.shader.bind();
	
	this.lights[0].setPosition(4.0, 4.5, 2.0, 1.0);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(1.0, 4.0, 7.5, 1.0);

	this.lights[0].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 0.8);
	this.lights[0].setSpecular(0.4, 0.4, 0.4, 0.2);
	this.lights[0].enable();

	this.lights[1].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0.0, 0.0, 0.0, 1.0);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 0.2);
	this.lights[2].setConstantAttenuation(0.0);
	this.lights[2].setLinearAttenuation(0.2);
	this.lights[2].setQuadraticAttenuation(0.0);
	this.lights[2].enable();
	
	this.shader.unbind();
};


LightingScene.prototype.display = function() 
{
	this.shader.bind();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
 	for (i = 0; i < this.lights.length; i++)
    {
        this.lights[i].update();
    }

	// Draw axis
	this.axis.display();
	this.materialDefault.apply();

	// ---- END Background, camera and axis setup
	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorApp.apply();
		this.floor.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wall.apply();
		this.wall2.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.window.apply();
		this.wall1.display();
	this.popMatrix();

	// Table 1
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Table 2
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slides.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.board.apply();
		this.boardB.display();
	this.popMatrix();

	// first cylinder
	this.pushMatrix();
		this.translate(-0.5,0,-10);
		this.rotate(90 * degToRad, 1, 0, 0);
		this.translate(0,0.5,0);
		this.scale(1, 1, -8);
		this.translate(2.5,12.5,0);
		this.cylinder.display();
	this.popMatrix();

	// second cylinder
	this.pushMatrix();
		this.translate(-0.5,0,0.5);
		this.rotate(90 * degToRad, 1, 0, 0);
		this.translate(0,0.5,0);
		this.scale(1, 1, -8);
		this.translate(2.5,12.5,0);
		this.cylinder.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	this.shader.unbind();
};