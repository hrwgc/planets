# MOLA Data user's handbook
# http://ode.rsl.wustl.edu/mars/pagehelp/quickstartguide/index.html?mola.htm
# proj.4 general parameters http://trac.osgeo.org/proj/wiki/GenParms
# 
# Original File
# mola128_88Nto88S_Simp_clon0/mola128_oc0/hdr.adf
# File obtained from: ftp://pdsimage2.wr.usgs.gov/pub/pigpen/mars/mola/
# 
## generate color relief geotiff from the original file

gdaldem color-relief mola128_88Nto88S_Simp_clon0/mola128_oc0/hdr.adf mars-color-relief-rb.tif -of Gtiff -co COMPRESS=lzw

gdalwarp --config GDAL_CACHEMAX 500 -wm 500 zero/mars-color-relief-rb.tif -s_srs "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396190 +b=3396190 +units=m +no_defs" -t_srs EPSG:3785 -r bilinear -te -20037508.34 -20037508.34 20037508.34 20037508.34  -co COMPRESS=lzw -co TILED=YES -of GTiff zero/mars-color-relief-rb-3785.tif 
gdaladdo -r cubic zero/mars-color-relief-rb-3785.tif 2 4 8 16 32 64 128 256


## second lighter GeoTIFF
gdaldem color-relief mola128_88Nto88S_Simp_clon0/mola128_oc0/hdr.adf zero/mars_colorramp_red_lighten.txt zero/mars-color-relief-red.tif -of Gtiff -co COMPRESS=lzw
gdalwarp --config GDAL_CACHEMAX 500 -wm 500 zero/mars-color-relief-red.tif -s_srs "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396190 +b=3396190 +units=m +no_defs" -t_srs EPSG:3785 -r bilinear -te -20037508.34 -20037508.34 20037508.34 20037508.34  -co COMPRESS=lzw -co TILED=YES -of GTiff zero/mars-color-relief-red-3785.tif 
gdaladdo -r cubic zero/mars-color-relief-red-3785.tif 2 4 8 16 32 64 128 256

## clean up
rm zero/mars-color-relief-rb.tif
rm zero/mars-color-relief-red.tif


## generate purple color relief geotiff from the original file

gdaldem color-relief mola128_88Nto88S_Simp_clon0/mola128_oc0/hdr.adf ~/documents/mapbox/project/mars-zero-center/zero/mars_colorramp_purple.txt zero/mars-color-relief-purple.tif -of Gtiff -co COMPRESS=lzw

gdalwarp --config GDAL_CACHEMAX 500 -wm 500 zero/mars-color-relief-purple.tif -s_srs "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396190 +b=3396190 +units=m +no_defs" -t_srs EPSG:3785 -r bilinear -te -20037508.34 -20037508.34 20037508.34 20037508.34  -co COMPRESS=lzw -co TILED=YES -of GTiff zero/mars-color-relief-purple-3785.tif 

gdaladdo -r cubic zero/mars-color-relief-purple-3785.tif 2 4 8 16 32 64 128 256


## clean up
rm zero/mars-color-relief-rb.tif
rm zero/mars-color-relief-purple.tif

echo "Color Relief!"


gdaladdo -r average zero/mars-color-relief-gyr-3785.tif 2 4 8 16 32 64 128 256


gdaldem hillshade mola128_88Nto88S_Simp_clon0/mola128_oc0/hdr.adf zero/mars-hillshading.tif -z 3 -of Gtiff -co COMPRESS=lzw

gdalwarp --config GDAL_CACHEMAX 500 -wm 500 zero/mars-hillshading.tif -s_srs "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396190 +b=3396190 +units=m +no_defs" -t_srs EPSG:3785 -r bilinear -te -20037508.34 -20037508.34 20037508.34 20037508.34  -co COMPRESS=lzw -co TILED=YES -of GTiff zero/mars-hillshading-3785.tif 
gdaladdo -r cubic zero/mars-hillshading-3785.tif 2 4 8 16 32 64 128 256
## clean up 
rm zero/mars-hillshading.tif

echo "Hills shaded!"

gdaldem slope mola128_88Nto88S_Simp_clon0/mola128_oc0/hdr.adf  zero/mars-slope.tif -of Gtiff -co COMPRESS=lzw

gdaldem color-relief zero/mars-slope.tif slope_ramp.txt zero/mars-slopeshading.tif -of GTiff -co COMPRESS=lzw 

gdalwarp --config GDAL_CACHEMAX 500 -wm 500 -s_srs "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396190 +b=3396190 +units=m +no_defs" -t_srs EPSG:3785 -r bilinear -te -20037508.34 -20037508.34 20037508.34 20037508.34  -co COMPRESS=lzw -co TILED=YES -of GTiff zero/mars-slopeshading.tif zero/mars-slopeshading-3785.tif 

gdaladdo -r cubic zero/mars-slopeshading-3785.tif 2 4 8 16 32 64 128 256

## clean up 
rm zero/mars-slopeshading.tif zero/mars-slope.tif

echo "Slope shaded!"
echo "You may now begin mapping"
