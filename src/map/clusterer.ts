import Supercluster, { AnyProps, PointFeature } from "supercluster";
import { BBox } from "geojson";
import { toEntity } from "./clusterEntity";
import { Entity } from "./types";

const DEFAULT_BOUNDING_BOX: BBox = [-180, -85, 180, 85];

export class Clusterer {
	private _isEnabled: boolean;
	private _clusteringAlgorithm: Supercluster;

	constructor(radius: number, maxZoom?: number, minZoom?: number) {
		this._isEnabled = false;
		this._clusteringAlgorithm = new Supercluster({
			radius, // Cluster radius pixels
			maxZoom, // Maximum zoom level to cluster
			minZoom,
		});
	}

	public set isEnabled(value: boolean) {
		this._isEnabled = value;
	}

	public get isEnabled() {
		return this._isEnabled;
	}

	public cluster(entities: Map<string, Entity>, zoomLevel: number, bbox: BBox = DEFAULT_BOUNDING_BOX): Entity[] {
		const clusterableFeatureEntities: PointFeature<AnyProps>[] = [];
		for (const entity of entities.values()) {
			if (entity.centroid) {
				clusterableFeatureEntities.push({
					type: "Feature",
					id: entity.id,
					geometry: entity.centroid.geometry,
					properties: {},
				});
			}
		}

		this._clusteringAlgorithm.load(clusterableFeatureEntities);
		const clusters = this._clusteringAlgorithm.getClusters(bbox, zoomLevel);

		return clusters.map(cluster =>
			cluster.properties.cluster ? toEntity(cluster) : entities.get(cluster.id as string)!!
		);
	}
}
