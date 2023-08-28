import { Entity } from "./types";
import { toCesiumPointEntity } from "./geometries/point";
import { toCesiumPolygonEntity } from "./geometries/polygon";
import { Entity as CesiumEntity } from "cesium";
import { SupportedGeoJsonTypes } from "./types";

export function toCesiumEntity(entity: Entity) {
	const converter = cesiumEntityConverterFactory(entity.geometry.type);
	const cesiumEntity = converter(entity);

	if (entity.showCentroid && entity.centroid) {
		const converter = cesiumEntityConverterFactory(entity.centroid.geometry.type);
		const cesiumCentroid = converter(entity.centroid);
		cesiumCentroid.parent = cesiumEntity;
	}

	return cesiumEntity;
}

function cesiumEntityConverterFactory(type: SupportedGeoJsonTypes): (entity: Entity) => CesiumEntity {
	switch (type) {
		case "Point":
			return toCesiumPointEntity;
		case "Polygon":
			return toCesiumPolygonEntity;
	}
}
