precision mediump float;
attribute vec3 position;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;


uniform float uTime;

void main() {
	gl_Position = projectionMatrix * viewMatrix*modelMatrix * vec4( position, 1.0 );
}

