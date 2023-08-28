import { AnyProps, ClusterFeature, PointFeature } from "supercluster";
import { mapToRange } from "./util";
import { Entity, EntityDesign } from "./types";
import { v4 as uuid } from "uuid";
import { NearFarScalar } from "cesium";

const scaleByDistanceScalar = new NearFarScalar(5000, 1, 8.0e6, 0.0);

export function toEntity(cluster: PointFeature<AnyProps> | ClusterFeature<AnyProps>): Entity {
	let design: EntityDesign = {
		fillColor: "#FFFFFF",
		pixelSize: 10,
	};

	if (cluster.properties.cluster) {
		const pointsClusteredCount = cluster.properties.point_count;
		const pointsClusteredText = cluster.properties.point_count_abbreviated.toString();

		design = {
			fillColor: getClusterColor(pointsClusteredCount),
			pixelSize: getClusterSize(pointsClusteredCount, 30, 80),
			scaleByDistance: scaleByDistanceScalar,
			label: {
				fillColor: "#000000",
				text: pointsClusteredText,
				scaleByDistance: scaleByDistanceScalar,
			},
		};
	}

	return {
		id: (cluster.id as string) ?? uuid(),
		geometry: cluster.geometry,
		design,
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
