import { Point } from "geojson";
import { CesiumEntity } from "../../aliases";
import { SupportedGeoJson } from "./geojson";
import { BaseDesign, EntityDesign } from "./design";

export interface IEntityConverter<T extends SupportedGeoJson> {
	toCesiumEntity: (entity: Entity<T>) => CesiumEntity;
}

export interface Entity<T extends SupportedGeoJson = SupportedGeoJson> extends BaseEntity<T> {
	centroid?: BaseEntity<Point>;
	showCentroid?: boolean;
	design?: EntityDesign;
}

interface BaseEntity<T extends SupportedGeoJson> {
	id: string;
	geometry: T;
	design?: BaseDesign;
}
