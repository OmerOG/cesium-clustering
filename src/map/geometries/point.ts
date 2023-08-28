import { Color, Entity as CesiumEntity, PointGraphics, Cartesian3 } from "cesium";
import { Entity, EntityDesign } from "../types";
import { Point } from "geojson";
import { coordinatesToCartesian } from "../util";
import { toCesiumLabelDesign } from "./label";

export function toCesiumPointEntity(entity: Entity): CesiumEntity {
	const design = toCesiumPointDesign(entity.design);
	const labelDesign = toCesiumLabelDesign(entity.design?.label);
	const cartesian = geojsonPointToCartesian(entity.geometry as Point);

	return new CesiumEntity({
		id: entity.id,
		position: cartesian,
		point: design,
		label: labelDesign,
	});
}

function toCesiumPointDesign(design: EntityDesign | undefined): PointGraphics.ConstructorOptions {
	const pointDesign: PointGraphics.ConstructorOptions = {};
	if (!design) return pointDesign;

	if (design.fillColor) pointDesign.color = Color.fromCssColorString(design.fillColor);
	if (design.outlineColor) pointDesign.outlineColor = Color.fromCssColorString(design.outlineColor);
	if (design.outlineWidth) pointDesign.outlineWidth = design.outlineWidth;
	if (design.pixelSize) pointDesign.pixelSize = design.pixelSize;
	if (design.scaleByDistance) pointDesign.scaleByDistance = design.scaleByDistance;

	return pointDesign;
}

function geojsonPointToCartesian(point: Point): Cartesian3 {
	return coordinatesToCartesian(point.coordinates);
}
