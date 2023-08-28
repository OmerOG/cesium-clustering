import { Polygon } from "geojson";

export function randomPolygon(num_vertices, max_radial_length, bbox): Polygon {
	if (typeof num_vertices !== "number") num_vertices = 10;
	if (typeof max_radial_length !== "number") max_radial_length = 10;
	let vertices: any = [];
	const circle_offsets = Array.apply(null, new Array(num_vertices + 1)).map(Math.random);

	circle_offsets.forEach(function sumOffsets(cur, index, arr) {
		arr[index] = index > 0 ? cur + arr[index - 1] : cur;
	});
	circle_offsets.forEach(function scaleOffsets(cur) {
		cur = (cur * 2 * Math.PI) / circle_offsets[circle_offsets.length - 1];
		const radial_scaler = Math.random();
		vertices.push([
			radial_scaler * max_radial_length * Math.sin(cur),
			radial_scaler * max_radial_length * Math.cos(cur),
		]);
	});
	vertices[vertices.length - 1] = vertices[0]; // close the ring

	// center the polygon around something
	vertices = vertices.map(vertexToCoordinate(position(bbox)));
	return polygon([vertices]);
}

function polygon(coordinates): Polygon {
	return {
		type: "Polygon",
		coordinates: coordinates,
	};
}

function generateNumber(min, max) {
	if (min > max) {
		throw new Error("Minimum value should be smaller than maximum value.");
	}
	var range = max - min;
	return min + range * Math.random();
}

function coordInBBBOX(bbox) {
	return [generateNumber(bbox[0], bbox[2]), generateNumber(bbox[1], bbox[3])];
}

function position(bbox) {
	return coordInBBBOX(bbox);
}

function vertexToCoordinate(hub) {
	return function (cur) {
		return [cur[0] + hub[0], cur[1] + hub[1]];
	};
}
