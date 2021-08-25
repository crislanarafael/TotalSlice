function calculate(skip) {

	//Data values are rounded for easier calculation for graphing
	let income = Math.round(parseFloat((document.getElementById("income")
		.value)));
	let savings = Math.round(parseFloat(document.getElementById("savings")
		.value)) || 0;
	let housing = Math.round(parseFloat(document.getElementById("housing")
		.value)) || 0;
	let education = Math.round(parseFloat(document.getElementById("education")
		.value)) || 0;
	let loans = Math.round(parseFloat(document.getElementById("loans")
		.value)) || 0;
	let gifts = Math.round(parseFloat(document.getElementById("gifts")
		.value)) || 0;
	let misc = Math.round(parseFloat(document.getElementById("misc")
		.value)) || 0;
	let id = document.getElementById("data-id").value;
	let totalincome = income + savings;
	
	
	async function create(data) {
		
		const method = id ? "PATCH" : "POST";
		if (id){
			data.id = id;
		}
		const resp = await fetch('/~/TotalSlice/account/MonthlyBudget', {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
		const ans = await resp.json();

		/* This is used to show the answer in the code block. 
		   Delete it when copied over to your code */
	}
	if (!skip){
		create({ totalincome, housing, education, loans, gifts, misc });
	}
	

	/* Plot 1 */
	let totalexpense = housing + education + loans + gifts + misc;
	let eatenSlices = Math.round((totalexpense / totalincome) * 100);
	let leftoverSlices = Math.round(((totalincome - totalexpense) / totalincome) * 100);

	/* Plot 2 */
	let housingSlice = Math.round((housing / totalincome) * 100);
	let educationSlice = Math.round((education / totalincome) * 100);
	let loansSlice = Math.round((loans / totalincome) * 100);
	let giftsSlice = Math.round((gifts / totalincome) * 100);
	let miscSlice = Math.round((misc / totalincome) * 100);

	var data = [{

			values: [eatenSlices, leftoverSlices],
			labels: ['Total Expenses', 'Total Leftover Budget'],
			
			automargin: true,
			type: 'pie',
			domain: { column: 0 },
			marker: {
				colors: ['#ffb703', '#023047', '#fb8500', '#219ebc', '#8ecae6'],
				line: {
					color: 'black',
					width: 2
				}
			}
	},

		{

			values: [housingSlice, educationSlice, loansSlice, giftsSlice, miscSlice, leftoverSlices],
			labels: ['Housing', 'Education', 'Loans and Credit Cards', 'Gifts and Donations', 'Miscellaneous', 'Remaining Budget'],
			
			automargin: true,
			type: 'pie',
			domain: { column: 1 },
			marker: {
				colors: ['#ffb703', '#023047', '#fb8500', '#219ebc', '#8ecae6', '#007f5f'],
				line: {
					color: 'black',
					width: 2
				}
			}
	}
	];

	var layout = {
		title: 'Your Monthly Budget, By the Slice',
		height: 400,
		width: 700,
		grid: { rows: 1, columns: 2 }
	};

	Plotly.newPlot('myDiv', data, layout);
	
	//Budget breakdown
	let income_decimal =  parseFloat((document.getElementById("income").value)) || 0;
	let savings_decimal = parseFloat((document.getElementById("savings").value)) || 0;
	let total_income_decimal = income_decimal + savings_decimal;
	let total_income_decimal_display = document.getElementById("total-income").innerHTML = total_income_decimal;
	
	let housing_decimal =  parseFloat((document.getElementById("housing").value)) || 0;
	let housing_decimal_display = document.getElementById("housing-display").innerHTML = housing_decimal;
	
	let education_decimal =  parseFloat((document.getElementById("education").value)) || 0;
	let education_decimal_display = document.getElementById("education-display").innerHTML = education_decimal;
	
	let loans_decimal =  parseFloat((document.getElementById("loans").value)) || 0;
	let loans_decimal_display = document.getElementById("loans-display").innerHTML = loans_decimal;
	
	let gifts_decimal =  parseFloat((document.getElementById("gifts").value)) || 0;
	let gifts_decimal_display = document.getElementById("gifts-display").innerHTML = gifts_decimal;
	
	let misc_decimal =  parseFloat((document.getElementById("misc").value)) || 0;
	let misc_decimal_display = document.getElementById("misc-display").innerHTML = misc_decimal;

	// Status Bar  - show expenses housing, education, loans, gifts, misc, that take 50% or more of the monthly budget 
	let pieStatus = document.getElementById("budgetStatus");
	if (totalexpense > totalincome) {
		let expense = "";
		if(housing >= (totalincome/2)){
			expense += "  HOUSING  ";
		}
		if(education >= (totalincome/2)){
			expense += "  EDUCATION  ";
		}
		if(loans >= (totalincome/2)){
			expense += "  LOANS  ";
		}
		if(gifts >= (totalincome/2)){
			expense += "  GIFTS  ";
		}
		if(misc >= (totalincome/2)){
			expense += "  MISC  ";
		}
		let status = "All your slices are GONE. This means your expenses are MORE than your monthly budget. <br><br> Go ahead and review the following expenses: ";
		pieStatus.innerHTML = status + expense;

	} else {
		let status = "The pie isn't gone! You are within your monthly budget!";
		pieStatus.innerHTML = status;
	}
}

async function getLogs() {
	const resp = await fetch('/~/TotalSlice/account/MonthlyBudget?all=true', {
		method: 'GET',
		headers: { 'content-Type': 'application/json' }
	})
	const ans = await resp.json();
	
	if (ans[0]) {
		document.getElementById("income")
			.value = ans[0].totalincome;
		/*document.getElementById("savings").value = ans[0].savings;*/
		document.getElementById("housing")
			.value = ans[0].housing;
		document.getElementById("education")
			.value = ans[0].education;
		document.getElementById("loans")
			.value = ans[0].loans;
		document.getElementById("gifts")
			.value = ans[0].gifts;
		document.getElementById("misc")
			.value = ans[0].misc;
		document.getElementById("data-id")
			.value = ans[0]._id;
		calculate(true);
	}

}

getLogs();