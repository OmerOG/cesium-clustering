import { HorizontalOrigin, NearFarScalar, VerticalOrigin } from "cesium";

export interface IDesignConverter {
	toCesiumDesign: (design: BaseDesign | undefined) => any;
}

export interface EntityDesign extends BaseDesign {
	label?: LabelDesign;
}

export interface LabelDesign extends BaseDesign {
    fontFamily?: string;
    text?: string;
	horizontalOrigin?: HorizontalOrigin;
	verticalOrigin?: VerticalOrigin;
}

export interface BaseDesign {
	fillColor?: string;
	outlineColor?: string;
	outlineWidth?: number;
	pixelSize?: number;
	scaleByDistance?: NearFarScalar;
}
