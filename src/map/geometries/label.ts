import { Color, HorizontalOrigin, LabelGraphics, VerticalOrigin } from "cesium";
import { LabelDesign } from "../types";

const DEFAULT_LABEL_PROPS: LabelGraphics.ConstructorOptions = {
	font: "16px sans-serif",
	disableDepthTestDistance: Number.POSITIVE_INFINITY,
	horizontalOrigin: HorizontalOrigin.CENTER,
	verticalOrigin: VerticalOrigin.CENTER,
};

export function toCesiumLabelDesign(design: LabelDesign | undefined): LabelGraphics.ConstructorOptions {
	const labelDesign: LabelGraphics.ConstructorOptions = { ...DEFAULT_LABEL_PROPS };
	if (!design) return labelDesign;

	if (design.fillColor) labelDesign.fillColor = Color.fromCssColorString(design.fillColor);
	if (design.outlineColor) labelDesign.outlineColor = Color.fromCssColorString(design.outlineColor);
	if (design.outlineWidth) labelDesign.outlineWidth = design.outlineWidth;
	if (design.pixelSize || design.fontFamily) labelDesign.font = `${design.pixelSize ?? 14}px ${design.fontFamily}`;
	if (design.text) labelDesign.text = design.text;
	if (design.horizontalOrigin) labelDesign.horizontalOrigin = design.horizontalOrigin;
	if (design.verticalOrigin) labelDesign.verticalOrigin = design.verticalOrigin;
	if (design.scaleByDistance) labelDesign.scaleByDistance = design.scaleByDistance;

	return labelDesign;
}
