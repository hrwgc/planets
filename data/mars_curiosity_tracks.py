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
    solNumber = int(gj['properties']['startSol'])
    try:
        gj['properties']['image'] = siteList[solNumber]['urlList']
        gj['properties']['itemName'] = siteList[solNumber]['itemName'] + '&s=' + str(int(siteList[solNumber]['sol']))
    except:
        gj['properties']['image'] = ""
        gj['properties']['itemName'] = ""
    print gj['properties']['image']
    print gj['properties']['itemName']
    gj['geometry']['type'] = 'Point'
    gj['geometry']['coordinates'] = [float(gj['properties']['lon']),float( gj['properties']['lat'])]
    return gj

sites = 'http://mars.jpl.nasa.gov/msl-raw-images/image/image_manifest.json'
sitesData = urllib2.urlopen(sites).read()
sitesDict = json.JSONDecoder().decode(sitesData)
sols = sitesDict['sols']

siteList = {}

for i in range(0,len(sols)): 
    url = sols[i]['catalog_url']
    data = urllib2.urlopen(url).read()
    jd = json.JSONDecoder().decode(data)['images']
    for i in range(0,len(jd)):
        if jd[i]['instrument'] == 'MAST_RIGHT' or jd[i]['instrument'] == 'MAST_LEFT':
            if jd[i]['sampleType'] == 'subframe':
                parentKey = int(jd[i]['sol'])
                siteList[parentKey] = jd[i]

jsonData = JSONEncoderForHTML(ensure_ascii=False).encode(siteList)

f = open('images-by-sol.json', 'wb')
f.write(jsonData)
f.close()



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