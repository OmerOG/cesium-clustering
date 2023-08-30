import { Color, PolygonGraphics } from "cesium";
import { EntityDesign, IDesignConverter } from "../types/design";

function toCesiumDesign(design: EntityDesign | undefined): PolygonGraphics.ConstructorOptions {
	const polygonDesign: PolygonGraphics.ConstructorOptions = {
		fill: false,
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

const module: IDesignConverter = {
	toCesiumDesign,
};

export default module;
