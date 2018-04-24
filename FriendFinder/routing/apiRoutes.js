//protoyped to return the smallest number in an array
Array.min = function(array){
	return Math.min.apply(Math, array);
}

var friendsList = [
{
	name: "Meliza Perea",
	photo: "test",
	scores: ["5", "5", "4", "4", "2", "3", "1", "3", "4", "2"]

},
{
	name: "Jimbo",
	photo: "https://vignette.wikia.nocookie.net/spsot/images/e/e8/Jimbo_facebook_profile.png/revision/latest?cb=20141129160026",
	scores: ["2", "1", "3", "4", "2", "3", "1", "3", "1", "2"]

}];

module.exports = function(app) {
	//gets the friends list that exist
	app.get("/api/friends", function(request, response) {
		return response.json(friendsList);
	});

	//the post function
	//this will return best match
	app.post("/api/friends", function(request, response){
		const newMember = request.body;
		console.log(newMember.scores);
		

		//lets check for the best match, by checking to see if there is actually someone else in the array
		if(friendsList.length > 0){
			//need to compare all the previous users to the new one
			var comparisonMatrix = [];
			for(var i = 0; i < friendsList.length; i++){
				comparisonMatrix.push(totalDifference(newMember.scores, friendsList[i].scores));
			}
			console.log("Comparison Matrix: " + comparisonMatrix);
			//get index number of the smallest number which should yield the best match
			const smallestNumber = Array.min(comparisonMatrix);
			console.log("The Smallest Number: " + smallestNumber);
			//this index number points to the best match
			const index = comparisonMatrix.indexOf(smallestNumber);
			//we send the response with the name of the person who is a good match
			console.log("The Best Match is: " + friendsList[index] + "at index " + index);
			friendsList.push(newMember);
			return response.json(friendsList[index]);

		}
		//adding the person who just entered data into an array that holds the all people
		friendsList.push(newMember);

	});
};
//calculate the total difference between the person who just entered in information
function totalDifference(arr1, arr2){
	var result = 0;
	//assuming that all both array are equal lengths 
	for(var i = 0; i < arr1.length; i++){
		var num1 = parseInt(arr1[i]);
		var num2 = parseInt(arr2[i]);
		console.log("This is 1: " + num1 +"\nThis is 2: " + num2);
		
		result += Math.abs(num1 - num2);
		console.log("result each time: " + result);
	}
	console.log(result);
	return result;
}