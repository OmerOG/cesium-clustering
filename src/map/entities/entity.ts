import { CesiumEntity } from "../../aliases";
import PointEntityConverter from "./geojson/point";
import PolygonEntityConverter from "./geojson/polygon";
import { SupportedGeoJsonTypes } from "../types/geojson";
import { Entity, IEntityConverter } from "../types/entities";

export function toCesiumEntity(entity: Entity): CesiumEntity {
	const converter = cesiumEntityConverterFactory(entity.geometry.type);
	const cesiumEntity = converter.toCesiumEntity(entity);

	if (entity.showCentroid && entity.centroid) {
		const cesiumCentroid = PointEntityConverter.toCesiumEntity(entity.centroid);
		cesiumCentroid.parent = cesiumEntity;
	}

	return cesiumEntity;
}

function cesiumEntityConverterFactory<T extends SupportedGeoJsonTypes>(type: T): IEntityConverter<any> {
	switch (type) {
		case "Point":
			return PointEntityConverter;
		case "Polygon":
			return PolygonEntityConverter;
		default:
			throw new Error("Unimplemented converter error");
	}
}
