export default {
  rain1: `
    uniform sampler2D colorTexture;//Input scene rendering photo
      varying vec2 v_textureCoordinates;
     
      float hash(float x){
           return fract(sin(x*133.3)*13.13);
      }
      
      void main(void){
       
          float time = czm_frameNumber / 60.0;
          vec2 resolution = czm_viewport.zw;
      
          vec2 uv=(gl_FragCoord.xy*2.-resolution.xy)/min(resolution.x,resolution.y);
          vec3 c=vec3(.6,.7,.8);
          float a=-.4;
          float si=sin(a),co=cos(a);
          uv*=mat2(co,-si,si,co);
          uv*=length(uv+vec2(0,4.9))*.3+1.;
      
          float v=1.-sin(hash(floor(uv.x*100.))*2.);
          float b=clamp(abs(sin(20.*time*v+uv.y*(5./(2.+v))))-.95,0.,1.)*20.;
          c*=v*b; //The color of the rain on the screen
      
          gl_FragColor = mix(texture2D(colorTexture, v_textureCoordinates), vec4(c,1), 0.5); //Fusion of rain and 3D scene
      }`,
  rain2:
    'float getDistance(sampler2D depthTexture, vec2 texCoords) \n' +
    '{ \n' +
    '    float depth = czm_unpackDepth(texture2D(depthTexture, texCoords)); \n' +
    '    if (depth == 0.0) { \n' +
    '        return czm_infinity; \n' +
    '    } \n' +
    '    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); \n' +
    '    return -eyeCoordinate.z / eyeCoordinate.w; \n' +
    '} \n' +
    'float interpolateByDistance(vec4 nearFarScalar, float distance) \n' +
    '{ \n' +
    '    float startDistance = nearFarScalar.x; \n' +
    '    float startValue = nearFarScalar.y; \n' +
    '    float endDistance = nearFarScalar.z; \n' +
    '    float endValue = nearFarScalar.w; \n' +
    '    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); \n' +
    '    return mix(startValue, endValue, t); \n' +
    '} \n' +
    'vec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) \n' +
    '{ \n' +
    '    return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); \n' +
    '} \n' +
    'uniform sampler2D colorTexture; \n' +
    'uniform sampler2D depthTexture; \n' +
    'uniform vec4 fogByDistance; \n' +
    'uniform vec4 fogColor; \n' +
    'varying vec2 v_textureCoordinates; \n' +
    'void main(void) \n' +
    '{ \n' +
    '    float distance = getDistance(depthTexture, v_textureCoordinates); \n' +
    '    vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates); \n' +
    '    float blendAmount = interpolateByDistance(fogByDistance, distance); \n' +
    '    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); \n' +
    '    gl_FragColor = alphaBlend(finalFogColor, sceneColor); \n' +
    '} \n',
}
