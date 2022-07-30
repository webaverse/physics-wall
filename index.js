import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {usePhysics, useApp, useFrame, useLocalPlayer} = metaversefile;
export default () => {
  const app = useApp();
  const physics = usePhysics();
  const localPlayer = useLocalPlayer();

  let cubeArray = [];
  let initialized = false;

  function makeWall(xWallCoord, yWallCoord, wallLength, WallWidth, blockX, blockY, blockZ, blockDist) {
    var xPos = xWallCoord;
    var yPos = yWallCoord;
    for (var x = 0; x < wallLength; x++) {
      for (var y = 0; y < WallWidth; y++) {

        const geometry = new THREE.BoxGeometry(blockX, blockY, blockZ);
        const material = new THREE.MeshStandardMaterial();
        material.color = new THREE.Color( 0xffffff ).setHex( Math.random() * 0xffffff );

        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = xPos;
        cube.position.y = yPos;
        let physicsObject = physics.addBoxGeometry(cube.position, cube.quaternion, new THREE.Vector3().copy(cube.scale).multiplyScalar(0.5), true);
        cube.physicsObject = physicsObject;
        
        
        app.add(cube);

        cubeArray.push(cube);
        xPos += blockX + blockDist;
      }
      yPos += blockY + blockDist;
      xPos = 0;
    }
    initialized = true;
  }

  // const height = app.getComponent('height') ? app.getComponent('height') : 5;
  // const width = app.getComponent('width') ? app.getComponent('width') : 5;

  // const sizeX = app.getComponent('sizeX') ? app.getComponent('sizeX') : 1;
  // const sizeY = app.getComponent('sizeY') ? app.getComponent('sizeY') : 1;
  // const sizeZ = app.getComponent('sizeZ') ? app.getComponent('sizeZ') : 1;

  //const blockDistance = app.getComponent('blockDistance') ? app.getComponent('blockDistance') : 0;

  //console.log(app);

  makeWall(0, 0, 6, 40, 1, 1, 1, 0);

  useFrame(({timestamp}) => {

    // if(!initialized) {
    //   return
    // }


    for(var i = 0; i < cubeArray.length; i++) {
      cubeArray[i].position.copy(cubeArray[i].physicsObject.position);
      cubeArray[i].quaternion.copy(cubeArray[i].physicsObject.quaternion);
      cubeArray[i].updateMatrixWorld();
    }
  });
  return app;
};
