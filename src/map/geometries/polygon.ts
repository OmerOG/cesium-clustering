import { Color, Entity as CesiumEntity, PolygonGraphics, Cartesian3, LabelGraphics } from "cesium";
import { Entity, EntityDesign } from "../types";
import { Polygon } from "geojson";
import { coordinatesToCartesian } from "../util";
import { toCesiumLabelDesign } from "./label";

export function toCesiumPolygonEntity(entity: Entity): CesiumEntity {
	const design = toCesiumPolygonDesign(entity.design);
	const labelDesign = toCesiumLabelDesign(entity.design?.label);
	const cartesians = geojsonPolygonToCartesians(entity.geometry as Polygon);

	return new CesiumEntity({
		id: entity.id,
		polygon: { hierarchy: cartesians, ...design },
		label: labelDesign,
	});
}

function toCesiumPolygonDesign(design: EntityDesign | undefined): PolygonGraphics.ConstructorOptions {
	const polygonDesign: PolygonGraphics.ConstructorOptions = {
		fill: false
	};
	if (!design) return polygonDesign;

	if (design.fillColor) {
		polygonDesign.fill = true;
		polygonDesign.material = Color.fromCssColorString(design.fillColor);
	}
	if (design.outlineColor) {
		polygonDesign.outline = true;
		polygonDesign.outlineColor = Color.fromCssColorString(design.outlineColor);
	}
	if (design.outlineWidth) {
		polygonDesign.outline = true;
		polygonDesign.outlineWidth = design.outlineWidth;
	}

	return polygonDesign;
}

function geojsonPolygonToCartesians(polygon: Polygon): Cartesian3[] {
	return polygon.coordinates[0].map(coordinates => coordinatesToCartesian(coordinates));
}
