'use client';
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Sphere, Graticule, Annotation } from 'react-simple-maps';
import { geoCentroid, geoOrthographic, geoEqualEarth } from 'd3-geo';
import worldGeoJSON from '@/app/json/worldMap.json'; 


const WorldMap = ({ position, rotation, onPositionChange, onCountrySelect, selectedCountry, graticuleBool, projection3DBool }) => {
    const minX = -100, maxX = 900, minY = -100, maxY = 700;
    const [annotation, setAnnotation] = useState({ name: "", coordinates: [0, 0], visible: false });
    const mapRef = useRef(null);
    const projection = useMemo(() => {
        const width = 800;
        const height = 600;
        let proj = null;
        if (projection3DBool) {
            proj = geoOrthographic();
            proj.rotate([rotation.x,rotation.y]).translate([width / 2, height / 2]).clipAngle(90);
        } else {
            proj = geoEqualEarth();
            proj.translate([width / 2, height / 2]);
        }
        return proj;
    }, [projection3DBool, rotation.x, rotation.y]);

    const handleMoveEnd = (newPosition) => {
        if (onPositionChange) {
            onPositionChange({ zoom: newPosition.zoom, center: newPosition.coordinates });
        }
    };

    const handleMouseEnter = (geo, event) => {
        const centroid = calculateCentroid(geo);
        setAnnotation({ 
            name: geo.properties.NAME, 
            coordinates: centroid,
            visible: true 
        });
    };
    const handleMouseLeave = () => {
        setAnnotation({ name: "", coordinates: [0, 0], visible: false });
    };

    const calculateCentroid = (geo) => {
        return geoCentroid(geo);
    };
    const getAnnotationScaleAndPosition = (zoom) => {
        const scale = (Math.max(1 / zoom, 0.025)*2);
        const offset = 20 * scale;
        return { scale, offset };
    };
    const { scale, offset } = getAnnotationScaleAndPosition(position.zoom);
    const handleCountryClick = (geo) => {
        let newCountry = geo.properties.NAME;
        if (onCountrySelect) {
            onCountrySelect(newCountry);
        }
    };
    const geographyStyle = useCallback((geo) => {
        return {
            default: {
                outline: 'none',
                fill: geo.properties.NAME === selectedCountry ? 'blue' : 'green',
                stroke: "black", 
                strokeWidth: 0.05
            },
            hover: {
                fill: '#F53',
                outline: 'none',
                cursor: 'pointer'
            }
        };
    }, [selectedCountry]);

    return (
        <>
            <ComposableMap id="react-map" projection={projection} ref={mapRef}>
                <ZoomableGroup 
                    zoom={position.zoom}
                    minZoom={0.75}
                    maxZoom={75}
                    center={position.center}
                    onMoveEnd={handleMoveEnd}
                    translateExtent={[[minX, minY], [maxX, maxY]]}
                    id="globe"
                >
                    <Sphere stroke="#F53" strokeWidth={2} fill="lightblue"/>
                    {graticuleBool && <Graticule stroke="#F20" strokeWidth="0.25"/>}
                    <Geographies geography={worldGeoJSON}>
                    {({ geographies }) =>
                        geographies.map(geo => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo} 
                                style={geographyStyle(geo)}
                                onMouseEnter={(event) => handleMouseEnter(geo, event)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCountryClick(geo)}
                            />
                        ))
                    }
                    </Geographies>
                    {annotation.visible && (
                        <Annotation
                            subject={annotation.coordinates}
                            dx={-offset}
                            dy={-20 * scale}
                            style={{ pointerEvents: "none" }}
                            connectorProps={{
                                stroke: "purple",
                                strokeWidth: 1 * scale,
                                strokeLinecap: "round"
                            }}
                        >
                            <rect
                                x={-(annotation.name.length * 8 * scale) / 2}
                                y={-10 * scale}
                                width={annotation.name.length * 8 * scale}
                                height={20 * scale}
                                rx={10 * scale} 
                                ry={10 * scale}
                                fill="white"
                                stroke="purple"
                                strokeWidth={1 * scale}
                            />
                            <text
                                x={0}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fill="purple"
                                style={{ fontSize: `${12 * scale}px` }}
                            >
                                {annotation.name}
                            </text>
                        </Annotation>
                    )}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

export default WorldMap;
