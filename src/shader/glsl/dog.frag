#define THRESHOLD 0.0075
varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform float weight[25];

const float redScale   = 0.298912;
const float greenScale = 0.586611;
const float blueScale  = 0.114478;
const vec3  monochromeScale = vec3(redScale, greenScale, blueScale);

void main(){
    float tFrag = 1.0 / 1024.0;

    int index = 0;
    vec3 g3Color = vec3(0.0); 
    for(int y=-2;y <= 2;y++){
        for(int x=-2;x <= 2;x++){
            vec3 color = texture2D(tDiffuse,vUv + vec2(y,x)*tFrag).rgb;
            g3Color += weight[index] * color;
            index++;
        }
    }
    
    float monocolor = dot(g3Color,monochromeScale);
    float dist =  monocolor > THRESHOLD ? 0.0: (1.0-monocolor);
    gl_FragColor = vec4(vec3( dist), 1.0);
    
}