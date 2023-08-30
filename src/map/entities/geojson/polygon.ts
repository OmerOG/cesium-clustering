import { Polygon } from "geojson";
import { polygonToCartesians } from "./conversions";
import { CesiumEntity } from "../../../aliases";
import { Entity, IEntityConverter } from "../../types/entities";
import LabelDesignConverter from "../../design/label";
import PolygonDesignConverter from "../../design/polygon";

export function toCesiumEntity(entity: Entity<Polygon>): CesiumEntity {
	const design = PolygonDesignConverter.toCesiumDesign(entity.design);
	const labelDesign = LabelDesignConverter.toCesiumDesign(entity.design?.label);
	const cartesians = polygonToCartesians(entity.geometry);

	return new CesiumEntity({
		id: entity.id,
		polygon: { hierarchy: cartesians, ...design },
		label: labelDesign,
	});
}

const module: IEntityConverter<Polygon> = {
	toCesiumEntity,
};

export default module;
