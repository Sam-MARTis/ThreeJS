precision mediump float;
attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;


uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
// varying vec3 vUV;


void main() {
    vPosition = position;
    vNormal = normal;
    vUv = uv;

	gl_Position = projectionMatrix * viewMatrix*modelMatrix * vec4( position, 1.0 );
}

