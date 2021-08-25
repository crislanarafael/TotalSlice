function logout() {

	// TELLS OUR SERVER TO LOG THE USER OUT
	fetch('/~/TotalSlice/logout', { method: 'POST'});
	
	// TELLS OUR BROWSER TO SHOW A MESSAGE TO OUR USER
	alert('Logged Out!');
	
	// REDIRECTS THE USER TO THE HOMEPAGE
	location.href = '/~/TotalSlice/index'
}

async function grabData() {
	const resp = await fetch('/~/TotalSlice/account/MonthlyBudget?all=true')
	const json = await resp.json();
}