<script setup>
let yaMap = null

let scriptYandexMap = document.createElement('script');
scriptYandexMap.setAttribute('src', 'https://api-maps.yandex.ru/3.0/?lang=ru_RU&apikey=9a74ccbe-ff50-45b7-89c8-363048b8c216');
document.head.appendChild(scriptYandexMap);
const initializeYandexMap = async () => {
  await ymaps3.ready
  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapControls, YMapControlButton, YMapControl,
    YMapCollection,
    YMapDefaultFeaturesLayer,
    YMapMarker,
  } = await ymaps3;
  const {YMapZoomControl, YMapGeolocationControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
  const {YMapOpenMapsButton} = await ymaps3.import('@yandex/ymaps3-controls-extra');
  const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

  const map = new YMap(document.getElementById('test1'), {
    location: {
      center: [37.64, 55.76],
      zoom: 10
    },
    behaviors: ['drag', 'mouseRotate', 'mouseTilt', 'magnifier', 'pinchRotate', 'panTilt']
  })
  function rotateCamera(angle) {
    map.update({
      camera: {
        azimuth: map.azimuth + angle,
        tilt: map.tilt,
        duration: 1000,
      }
    });
  }
  function tiltCamera(angle) {
    map.update({
      camera: {
        azimuth: map.azimuth,
        tilt: map.tilt + angle,
        duration: 1000,
      }
    });
  }
  const changeAzimuthLeft = new YMapControlButton({
    text: 'Повернуть влево',
    onClick: () => rotateCamera(Math.PI / 2)
  });
  const threeD = new YMapControlButton({
    text: 'В 3д',
    onClick: () => tiltCamera(Math.PI / 2)
  })
  const twoD = new YMapControlButton({
    text: 'В 2д',
    onClick: () => tiltCamera(Math.PI / -2)
  })
  const changeAzimuthRight = new YMapControlButton({
    text: 'Повернуть вправо',
    onClick: () => rotateCamera(Math.PI / -2)
  });
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());
  map.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({easing: 'ease-in'})))
  map.addChild(new YMapControls({position: 'top left'}).addChild(changeAzimuthLeft))
  map.addChild(new YMapControls({position: 'top right'}).addChild(changeAzimuthRight))
  map.addChild(new YMapControls({position: 'bottom left'}).addChild(new YMapOpenMapsButton({})))
  map.addChild(new YMapControls({position: 'bottom'}).addChild(threeD))
  map.addChild(new YMapControls({position: 'bottom right'}).addChild(twoD))

  const myMarkerElement = document.createElement('div');
  myMarkerElement.className = 'my-marker-class';
  myMarkerElement.innerText = "I'm marker!";

  map.addChild(
      new YMapDefaultMarker({
        coordinates: [37.64, 55.76],
        title: 'Hello World!',
        subtitle: 'kind and bright',
        color: 'blue'
      })
  );
}
onMounted(() => {
  scriptYandexMap.addEventListener("load", initializeYandexMap);
})
</script>

<template>
<div id="test1" ref="yaMap" style="width: 100%; height: 350px;">
</div>
</template>

<style scoped>

</style>
