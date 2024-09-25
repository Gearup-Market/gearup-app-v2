/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
	if (value === null) {
		return true;
	} else if (typeof value !== 'number' && value === '') {
		return true;
	} else if (typeof value === 'undefined' || value === undefined) {
		return true;
	} else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
		return true;
	} else {
		return false;
	}
};

export const groupBy = (objectArray, property) => {
	return objectArray.reduce((acc, obj) => {
		const key = obj[property] || 'nil';
		if (key !== 'nil') {
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(obj);
		}
		return acc;
	}, {});
};

export function parseString(text) {
	const re_valid =
		/^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
	// Return NULL if input string is not well formed CSV string.
	if (!re_valid.test(text)) return null;
	const a = []; // Initialize array to receive values.
	text.replace(
		re_value, // "Walk" the string using replace with callback.
		function (m0, m1, m2, m3) {
			// Remove backslash from \' in single quoted values.
			if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
			// Remove backslash from \" in double quoted values.
			else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
			else if (m3 !== undefined) a.push(m3);
			return ''; // Return empty string.
		},
	);
	// Handle special case of empty last value.
	if (/,\s*$/.test(text)) a.push('');
	return a;
}

// Returns the amount of milliseconds that have passed since withdrawalTime
export const timeSince = (withdrawalTime: number): number => {
	return Date.now() - withdrawalTime * 1000;
};

export const roundDecimal = (input: number, decimalPlaces = 4): number => {
	return Math.round((input + Number.EPSILON) * 10 ** decimalPlaces) / 10 ** decimalPlaces;
};

export const compareAddresses = (address1: string, address2: string): boolean => {
	return address1.toUpperCase() === address2.toUpperCase();
};

export const getRatio = (input1: number, input2: number): string => {
	return `${(input1 / (input1 + input2)) * 100} : ${(input2 / (input1 + input2)) * 100}`;
};

export const shortenAddress = (address: string, prefixLength = 3, suffixLength = 4): string => {
	return address.startsWith("0x")
		? `${address.substring(0, prefixLength + 2)}...${address.substring(address.length - suffixLength)}`
		: `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`;
};

export const removeUndefined = obj => {
	return Object.keys(obj).reduce((acc, key) => {
		const _acc = acc;
		if (obj[key] !== undefined) _acc[key] = obj[key];
		return _acc;
	}, {});
};

export function buildParams<T>(obj: T): T {
	const result: Partial<T> = {};
	for (const key in obj) {
	  if (obj[key] !== undefined) {
		result[key] = obj[key];
	  }
	}
	return result as T;
  }

export const isJSON = (str: string) => {
	if(!str) return false;
	if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@').
		replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
		replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		return str;
	} else {
		return false;
	}
}