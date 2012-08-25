### Gazetteer of Planetary Nomenclature

This layer shows the named locations on Mars. The source for the dataset is the [International Astronomical Union (IAU) Working Group for Planetary System Nomenclature (WGPSN)][1]. 

### Processing

The longitude values were converted from +E (0-360) to standard -180 0 180 using the following formula:

if longitude > 180, -1*(360-longitude)

[1]: http://planetarynames.wr.usgs.gov/SearchResults?target=MARS