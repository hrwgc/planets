/*  Purple   */
/*
#colorreliefr {
  [zoom < 6] { raster-opacity:0; raster-comp-op:lighten; }
}

#slope,
#hillshade,
#colorreliefp {
  raster-comp-op:multiply;
}


#hillshade {
  raster-scaling:lanczos;
  raster-opacity:.61;
  [zoom >= 8]{ raster-scaling:bicubic;}
}

#slope {
  [zoom < 4] { raster-opacity:.4; raster-scaling:lanczos;}
  [zoom >= 4] {
    raster-scaling:lanczos;
    raster-opacity:.41;
    raster-comp-op: multiply;
    ::burn[zoom > 4] {
      raster-opacity:.3;
      raster-comp-op:color-burn;
    }
  }
}
#colorreliefp {
  raster-scaling:lanczos;
  raster-opacity:1;
  [zoom >= 8]{ raster-scaling:gaussian; }
  ::highlight[zoom = 3] { raster-comp-op:color-dodge; raster-opacity:.1;}
  ::highlight[zoom = 4] { raster-comp-op:color-dodge; raster-opacity:.2;}
  ::highlight[zoom = 5] { raster-comp-op:color-dodge; raster-opacity:.4;}
  ::highlight[zoom >= 6] { raster-comp-op:color-dodge; raster-opacity:.5;}
}*/


/*  The red planet map   */

#hillshade,
#slope {
  raster-comp-op:multiply;
}
#colorreliefr {
  [zoom < 4] { raster-opacity:1; raster-comp-op:lighten; }
  [zoom >= 4] {
    raster-scaling:lanczos;
    raster-opacity:1;
    raster-comp-op:plus;
  }
}

#hillshade {
  [zoom < 4] { raster-opacity:.6; raster-scaling:lanczos;}
  [zoom >= 4] {
    raster-scaling:lanczos;
    raster-opacity:.41;
    raster-comp-op: multiply;
    raster-filter-factor:1;
  }
}

#slope {
  [zoom < 4] { raster-opacity:.4; raster-scaling:lanczos;}
  [zoom >= 4] {
    raster-scaling:lanczos;
    raster-opacity:.41;
    raster-comp-op: multiply;
    ::burn[zoom > 4] {
      raster-opacity:.3;
      raster-comp-op:color-burn;
    }
  }
}
#inverted {
  raster-scaling:lanczos;
  raster-comp-op:color;
  raster-opacity:.41;
  ::contrast[zoom > 2] {
    raster-comp-op:color;
    raster-scaling:gaussian;
    raster-opacity:.41;
  } 
}
