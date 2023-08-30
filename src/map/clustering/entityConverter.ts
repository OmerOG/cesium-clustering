import { AnyProps, ClusterFeature, PointFeature } from "supercluster";
import { mapToRange } from "../util";
import { Entity } from "../types/entities";
import { v4 as uuid } from "uuid";
import { NearFarScalar } from "cesium";
import { EntityDesign, LabelDesign } from "../types/design";

const scaleByDistanceScalar = new NearFarScalar(5000, 1, 8.0e6, 0.0);
const MIN_CLUSTER_SIZE = 30;
const MAX_CLUSTER_SIZE = 80;
const DEFAULT_LABEL_DESIGN: LabelDesign = {
	fillColor: "#000000",
	scaleByDistance: scaleByDistanceScalar,
};
const DEFAULT_CLUSTER_DESIGN: EntityDesign = {
	fillColor: "#FFFFFF",
	pixelSize: 10,
	scaleByDistance: scaleByDistanceScalar,
	label: DEFAULT_LABEL_DESIGN,
};

export function toEntity(cluster: PointFeature<AnyProps> | ClusterFeature<AnyProps>): Entity {
	let dynamicClusterDesign: EntityDesign = {};

	if (cluster.properties.cluster) {
		const pointsClusteredCount = cluster.properties.point_count;
		const pointsClusteredText = cluster.properties.point_count_abbreviated.toString();

		dynamicClusterDesign = {
			fillColor: getClusterColor(pointsClusteredCount),
			pixelSize: getClusterSize(pointsClusteredCount, MIN_CLUSTER_SIZE, MAX_CLUSTER_SIZE),
			label: {
				text: pointsClusteredText,
				...DEFAULT_LABEL_DESIGN,
			},
		};
	}

	return {
		id: (cluster.id as string) ?? uuid(),
		geometry: cluster.geometry,
		design: {
			...DEFAULT_CLUSTER_DESIGN,
			...dynamicClusterDesign,
		},
	};
}

function getClusterColor(value: number): string {
	const mappedValue = mapToRange(value, 1, 100, 0, 1);
	const hue = (1 - mappedValue) * 120;

	return "hsl(" + hue + ",100%,50%)";
}

function getClusterSize(
	clusterPoints: number,
	minSize: number,
	maxSize: number,
	minClusterPoints: number = 1,
	maxClusterPoints: number = 100
): number {
	return mapToRange(clusterPoints, minClusterPoints, maxClusterPoints, minSize, maxSize);
}
