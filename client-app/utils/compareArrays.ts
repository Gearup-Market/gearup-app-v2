export function arraysAreEqual(arr1: any[], arr2: any[]) {
	// Check if the arrays have the same length
	if (arr1.length !== arr2.length) {
		return false;
	}

	// Sort the arrays to ensure the elements are in the same order
	const sortedArr1 = arr1.slice().sort();
	const sortedArr2 = arr2.slice().sort();

	// Iterate over each element in one array and compare it with the corresponding element in the other array
	for (let i = 0; i < sortedArr1.length; i++) {
		if (sortedArr1[i] !== sortedArr2[i]) {
			return false;
		}
	}

	// If all elements match, return true
	return true;
}
