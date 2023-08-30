import { CustomDataSource, DataSource, Viewer } from "cesium";
import viewer from "./viewer";
import { toCesiumEntity } from "./entities/entity";
import { altitudeToZoom, getCameraAltitude } from "./util";
import { Clusterer } from "./clustering/clusterer";
import { Entity } from "./types/entities";

export class MapInstance {
	private readonly _dataSource: DataSource;
	private readonly _clusterer: Clusterer;
	private _entities: Map<string, Entity>;
	private _lastZoomHeight: number;

	constructor(viewer: Viewer, clusterer: Clusterer) {
		this._entities = new Map<string, Entity>();
		this._clusterer = clusterer;
		this._lastZoomHeight = getCameraAltitude(viewer);
		this._dataSource = new CustomDataSource("atlas");
		viewer.dataSources.add(this._dataSource);
		viewer.camera.changed.addEventListener(() => {
			this._lastZoomHeight = viewer.camera.positionCartographic.height;
			if (this._clusterer.isEnabled && getCameraAltitude(viewer) !== this._lastZoomHeight) {
				this.render();
			}
		});
	}

	public add(value: Entity | Entity[]) {
		if (Array.isArray(value)) {
			value.forEach(entity => {
				this._entities.set(entity.id, entity);
			});
		} else {
			this._entities.set(value.id, value);
		}

		if (this._clusterer.isEnabled) {
			const zoomLevel = altitudeToZoom(getCameraAltitude(viewer));
			const entities = this._clusterer.cluster(this._entities, zoomLevel);
			this.render(entities);
		} else {
			this.render(value);
		}
	}

	private render(added?: Entity | Entity[]) {
		this._dataSource.entities.removeAll();

		if (Array.isArray(added)) {
			added.forEach(entity => {
				this._dataSource.entities.add(toCesiumEntity(entity));
			});
		} else if (added) {
			this._dataSource.entities.add(toCesiumEntity(added));
		}

		viewer.scene.requestRender();
	}
}
