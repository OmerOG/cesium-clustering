import { Cartesian3 } from "cesium";
import { Point, Polygon } from "geojson";

export function polygonToCartesians(polygon: Polygon): Cartesian3[] {
	return polygon.coordinates[0].map(coordinates => coordinatesToCartesian(coordinates));
}

export function pointToCartesian(point: Point): Cartesian3 {
	return coordinatesToCartesian(point.coordinates);
}

export function coordinatesToCartesian(coordinates: number[]): Cartesian3 {
	const [lon, lat, height] = coordinates;
	const cartesian = Cartesian3.fromDegrees(lon, lat, height);
	return cartesian;
}
