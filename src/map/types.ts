import { HorizontalOrigin, NearFarScalar, VerticalOrigin } from "cesium";
import { Point, Polygon } from "geojson";

export type SupportedGeoJson = Point | Polygon;
export type SupportedGeoJsonTypes = SupportedGeoJson["type"];

export interface Entity extends BaseEntity<SupportedGeoJson> {
	centroid?: BaseEntity<Point>;
	showCentroid?: boolean;
	design?: EntityDesign;
}

interface BaseEntity<T extends SupportedGeoJson> {
	id: string;
	geometry: T;
	design?: BaseDesign;
}

export interface EntityDesign extends BaseDesign {
	label?: LabelDesign;
}

export interface LabelDesign extends BaseDesign {
	text?: string;
	fontFamily?: string;
	horizontalOrigin?: HorizontalOrigin;
	verticalOrigin?: VerticalOrigin;
}

export interface BaseDesign {
	fillColor?: string;
	outlineColor?: string;
	outlineWidth?: number;
	pixelSize?: number;
	scaleByDistance?: NearFarScalar;
}
