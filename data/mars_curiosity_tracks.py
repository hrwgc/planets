#!/usr/bin/env python

import json
from xml.dom import minidom
import urllib2
import xmltodict
import simplejson
try:
    from simplejson import JSONEncoderForHTML
except:
    from simplejson.encoder import JSONEncoderForHTML

def MakeFeatureCollection(data):
    """group individual POIs into a feature collection for event."""
    featureCollection = {}
    featureCollection['type'] = 'FeatureCollection'
    featureCollection['features'] = data
    return JSONEncoderForHTML(ensure_ascii=False).encode(featureCollection)

def toGeoJSON(record):
    gj = {}
    gj['type'] = 'Feature'
    gj['geometry'] = {}
    gj['properties'] = {}
    gj['properties'] = json.loads(json.dumps(xmltodict.parse(record.toxml()).get('location')))
    gj['geometry']['type'] = 'Point'
    gj['geometry']['coordinates'] = [float(gj['properties']['lon']),float( gj['properties']['lat'])]
    return gj



locs = 'http://mars.jpl.nasa.gov/msl-raw-images/locations.xml'

data = urllib2.urlopen(locs).read()
xmldoc = minidom.parseString(data)
covs = xmldoc.getElementsByTagName('location')

featureCollection = []

for cov in covs:
    geoJson = toGeoJSON(cov)
    featureCollection.append(geoJson)
    GeoJSON = MakeFeatureCollection(featureCollection)
f = open('locations.geojson', 'wb')
f.write(GeoJSON)
f.close()