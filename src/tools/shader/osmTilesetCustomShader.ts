/* OSM Tiles 自定義的閃光材質 */
export const fragmentShaderText = `
// Color tiles by distance to the camera
void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
{
  float _baseHeight = -250.0;
  float _heightRange = 80.0;
  float _glowRange = 300.0;
  float vtxf_height = fsInput.attributes.positionMC.z-_baseHeight;
  float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
  float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.01;
  material.diffuse *= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
  float vtxf_a13 = fract(czm_frameNumber /360.0);
  float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
  vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
  float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
  material.diffuse += material.diffuse * (1.0 - vtxf_diff);
}
`
