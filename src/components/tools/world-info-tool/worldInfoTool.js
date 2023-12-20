'use client';
import React, { useState, useRef } from "react";
import WorldMap from "@/components/worldMap";
import countryCodes from "@/app/json/countryCodes.json";
import SubSpinner from "@/components/reusable-items/loaders/spinners/sub-spinner/subSpinner";

const WorldInfoTool = () => {
    const [position, setPosition] = useState({ zoom: 0.75, center: [0, 0] });
    const [selectedCountry, setSelectedCountry] = useState('');
    const [flagImageUrl, setFlagImageUrl] = useState('');
    const [isLoadingFlag, setIsLoadingFlag] = useState(false);
    const [graticule, setGraticule] = useState(false);
    const [isProjection3D, setProjection3D] = useState(false);
    const zoomIntervalRef = useRef(null);

    const minZoom = 0.75;
    const maxZoom = 75;

    const roundToNearestQuarter = zoom => {
        return Math.round(zoom * 4) / 4;
    };

    const zoomIn = () => {
        setPosition(prevPosition => {
            let currentZoom = roundToNearestQuarter(prevPosition.zoom)
            let newZoom = Math.min(currentZoom + 0.25, maxZoom);
            return { ...prevPosition, zoom: newZoom };
        });
    };

    const zoomOut = () => {
        setPosition(prevPosition => {
            let currentZoom = roundToNearestQuarter(prevPosition.zoom)
            let newZoom = currentZoom - 0.25;
            if (newZoom <= minZoom) {
                newZoom = minZoom;
                return { zoom: newZoom, center: [0, 0] };
            } else {
                return { ...prevPosition, zoom: newZoom };
            }
        });
    };

    const holdZoomIn = () => {
        zoomIn();
        zoomIntervalRef.current = setInterval(zoomIn, 50);
    }

    const holdZoomOut = () => {
        zoomOut();
        zoomIntervalRef.current = setInterval(zoomOut, 50);
    }

    const stopZoom = () => {
        clearInterval(zoomIntervalRef.current);
    };

    const getMapClassName = () => {
        return position.zoom === minZoom ? "world-map zoomed-out" : "world-map zoomed-in";
    };

    const handleCountrySelect = (countryName) => {
        setFlagImageUrl('');
        setSelectedCountry(countryName);
        fetchFlagImageUrl(countryName);
    };

    const clearCountry = () => {
        setSelectedCountry('');
        setFlagImageUrl('');
    }

    const getCountryCodeByName = (countryName) => {
        // Find the key in the countryCodes object where the value matches the country name
        const entry = Object.entries(countryCodes).find(([code, name]) => name.toLowerCase() === countryName.toLowerCase());
        return entry ? entry[0] : null; // Return the country code if found
    };

    const fetchFlagImageUrl = async (countryName) => {
        setIsLoadingFlag(true); // Start loading
        try {
            const countryCode = getCountryCodeByName(countryName);
            const imageUrl = countryCode ? `https://flagsapi.com/${countryCode}/shiny/64.png` : '';
            setFlagImageUrl(imageUrl); // Set the fetched image URL
        } catch (error) {
            console.error('Failed to fetch flag image:', error);
        }
        setIsLoadingFlag(false);
    };

    const handleGraticuleChange = (event) => {
        setGraticule(event.target.checked);
    };
    
    const handleProjectionChange = (event) => {
        setProjection3D(event.target.checked);
    }
    return (
        <>
            <div className="map-wrapper">
                <div className={getMapClassName()}>
                    <WorldMap
                        position={position}
                        onPositionChange={setPosition}
                        onCountrySelect={handleCountrySelect}
                        selectedCountry={selectedCountry}
                        graticuleBool={graticule}
                        projection3DBool={isProjection3D}
                    />
                </div>
                <div className="info">
                    <div className="zoom-container">
                        <div className="zoom-settings">
                            <h2>Zoom Settings</h2>
                            <div className="zoom-buttons">
                                <button
                                    onMouseDown={holdZoomOut} 
                                    onMouseUp={stopZoom} 
                                    onMouseLeave={stopZoom}
                                    id="zoom-out">
                                    -
                                </button>
                                <button
                                    onMouseDown={holdZoomIn} 
                                    onMouseUp={stopZoom} 
                                    onMouseLeave={stopZoom}
                                    id="zoom-in">
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="zoom-value">
                            Zoom:&nbsp;x{position.zoom.toFixed(2)}
                        </div>
                    </div>
                    <div className="country-details">
                        {isLoadingFlag ? (
                            <SubSpinner/> // Show spinner while loading flags
                        ) : (
                            <img src={flagImageUrl} alt={selectedCountry} />
                        )}
                        <div className="selected-country-info">
                            Selected Country: {selectedCountry}
                        </div>
                        <button 
                            onClick={clearCountry}
                            id="clear-country">
                            Clear
                        </button>
                    </div>

                    <div className="display-settings">
                        <div className="graticule">
                            <input
                                type="checkbox"
                                id="graticule"
                                name="graticule"
                                checked={graticule}
                                onChange={handleGraticuleChange}
                            >
                            </input>
                            <label htmlFor="graticule">Graticule</label>
                        </div>
                        <div className="projection">
                            <label htmlFor="projection"></label>
                            <span>2D</span>
                            <input
                                type="checkbox"
                                id="projection"
                                name="projection"
                                checked={isProjection3D}
                                onChange={handleProjectionChange}
                            >
                            </input>
                            <span>3D</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WorldInfoTool;