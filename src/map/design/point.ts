import { Color, PointGraphics } from "cesium";
import { EntityDesign, IDesignConverter } from "../types/design";

function toCesiumDesign(design: EntityDesign | undefined): PointGraphics.ConstructorOptions {
	const pointDesign: PointGraphics.ConstructorOptions = {};
	if (!design) return pointDesign;

	if (design.fillColor) pointDesign.color = Color.fromCssColorString(design.fillColor);
	if (design.outlineColor) pointDesign.outlineColor = Color.fromCssColorString(design.outlineColor);
	if (design.outlineWidth) pointDesign.outlineWidth = design.outlineWidth;
	if (design.pixelSize) pointDesign.pixelSize = design.pixelSize;
	if (design.scaleByDistance) pointDesign.scaleByDistance = design.scaleByDistance;

	return pointDesign;
}

const module: IDesignConverter = {
	toCesiumDesign,
};

export default module;
