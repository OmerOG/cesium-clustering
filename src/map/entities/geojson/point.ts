import { Point } from "geojson";
import { pointToCartesian } from "./conversions";
import { CesiumEntity } from "../../../aliases";
import PointDesignConverter from "../../design/point";
import LabelDesignConverter from "../../design/label";
import { Entity, IEntityConverter } from "../../types/entities";

export function toCesiumEntity(entity: Entity<Point>): CesiumEntity {
	const design = PointDesignConverter.toCesiumDesign(entity.design);
	const labelDesign = LabelDesignConverter.toCesiumDesign(entity.design?.label);
	const cartesian = pointToCartesian(entity.geometry);

	return new CesiumEntity({
		id: entity.id,
		position: cartesian,
		point: design,
		label: labelDesign,
	});
}

const module: IEntityConverter<Point> = {
	toCesiumEntity,
};

export default module;
