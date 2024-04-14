function generateCombinations(arr, size) {
    var results = [];
    function recurse(combination, start) {
        if (combination.length === size) {
            results.push(combination);
        } else {
            for (var i = start; i < arr.length; i++) {
                recurse(combination.concat(arr[i]), i + 1);
            }
        }
    }
    recurse([], 0);
    return results;
}

function permute(arr) {
    var results = [];
    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    function recurse(arr, start) {
        if (start === arr.length - 1) {
            results.push(arr.slice());
        } else {
            for (var i = start; i < arr.length; i++) {
                swap(arr, start, i);
                recurse(arr, start + 1);
                swap(arr, start, i); // backtrack
            }
        }
    }
    recurse(arr, 0);
    return results;
}

self.onmessage = function(event) {
    var numbersArray = event.data.numbersArray;
    var groupSize = event.data.groupSize;

    // Generate combinations of specified size
    var combinations = generateCombinations(numbersArray, groupSize);

    // Generate permutations for each combination
    var permutations = [];
    combinations.forEach(function(combination) {
        permutations = permutations.concat(permute(combination));
    });

    // Prepare the result HTML
    var resultHTML = "<h2>Arrangement:</h2><ol>";
    permutations.forEach(function(permutation, index) {
        resultHTML += "<li>Arrangement " + (index + 1) + ": " + permutation.join(", ") + "</li>";
    });
    resultHTML += "</ol>";

    // Send the result back to the main thread
    self.postMessage(resultHTML);
};
