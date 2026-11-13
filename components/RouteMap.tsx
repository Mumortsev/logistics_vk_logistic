'use client';
import {MapContainer,TileLayer,GeoJSON,Marker,useMap} from 'react-leaflet';
import {useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
const marker=L.divIcon({className:'route-pin',html:'<span></span>',iconSize:[20,20]});
function Fit({geometry}:{geometry:any}){const map=useMap();useEffect(()=>{if(geometry?.coordinates?.length){const points=geometry.coordinates.map(([lng,lat]:number[])=>[lat,lng]);map.fitBounds(L.latLngBounds(points),{padding:[32,32],maxZoom:11})}},[geometry,map]);return null}
export default function RouteMap({geometry,origin,destination}:{geometry:any,origin?:number[],destination?:number[]}){return <MapContainer center={[55.75,37.62]} zoom={4} scrollWheelZoom={false} className="map" ><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>{geometry&&<><GeoJSON key={JSON.stringify(geometry.coordinates?.[0]) + geometry.coordinates?.length} data={geometry} style={{color:'#d5a53a',weight:5,opacity:.95}}/><Fit geometry={geometry}/>{origin&&<Marker position={[origin[1],origin[0]]} icon={marker}/>}{destination&&<Marker position={[destination[1],destination[0]]} icon={marker}/>}</>}</MapContainer>}
