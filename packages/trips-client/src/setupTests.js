global.google = window.google = {
  maps: {
    Map: class {
      setCenter() {}
      setOptions() {}
      setZoom() {}
    },
    Geocoder: class {},
    places: {
      SearchBox: class {
        setBounds() {}
      },
    },
    event: {
      addListener() {},
      removeListener() {},
    }
  },
};
