import "./main.css";
import { MapInstance } from "./map/mapInstance";
import { randomPolygon } from "./random";
import { Point, Polygon } from "geojson";
import { v4 as uuid } from "uuid";
import viewer from "./map/viewer";
import { Clusterer } from "./map/clusterer";
import centroid from "@turf/centroid";

const NUM_SECONDS = 0.1;

const clusterer = new Clusterer(50, 24);
clusterer.isEnabled = true;
const map = new MapInstance(viewer, clusterer);

setInterval(() => {
	const polygon = randomPolygon(
		4,
		0.1,
		[34.45866566130721, 31.427733384846306, 34.55552426717682, 31.55254242667192]
	);

	map.add({
		id: uuid(),
		geometry: polygon,
		centroid: {
			id: uuid(),
			geometry: calculateCentroid(polygon),
		},
		design: {
			outlineColor: "#FFFFFF",
			outlineWidth: 10,
		},
	});
}, NUM_SECONDS * 1000);

function calculateCentroid(geometry: Polygon): Point {
	return centroid(geometry).geometry;
}
