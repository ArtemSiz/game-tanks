import {random} from "lodash";

export namespace Util {
	export const colors = {
		bgColor : 0x112233
	};
	export const mapToArray = <T>(collection: Map<string, T>): Array<T> => {
		return Array.from(collection.values());
	};
	export const randomItemInArray = <T>(array: Array<T>): T => {
		return array[random(0, array.length - 1)];
	};
}
