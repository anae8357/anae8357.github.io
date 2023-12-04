// #1: 
let employees = [
    { firstName: "Sam", department: "Tech", designation: "Manager", salary: 40000, raiseEligible: true },
    { firstName: "Mary", department: "Finance", designation: "Trainee", salary: 18500, raiseEligible: true },
    { firstName: "Bill", department: "HR", designation: "Executive", salary: 21200, raiseEligible: false }
];

console.log("Problem 1 Output:", JSON.stringify(employees, null, 2));

// #2: 
let company = {
    companyName: "Tech Stars",
    website: "www.techstars.site",
    employees: employees
};

console.log("Problem 2 Output:", JSON.stringify(company, null, 2));

// #3:
company.employees.push({ firstName: "Anna", department: "Tech", designation: "Executive", salary: 25600, raiseEligible: false });

console.log("Problem 3 Output:", JSON.stringify(company, null, 2));

// #4:
let totalSalary = company.employees.reduce((total, employee) => total + employee.salary, 0);
console.log("Problem 4 Total Salary:", totalSalary);



// #5:
company.employees = company.employees.map(employee => {
    if (employee.raiseEligible) {
        employee.salary *= 1.10;
        employee.raiseEligible = false;
    }
    return employee;
});

console.log("Problem 5 Output:", JSON.stringify(company, null, 2));

// #6:
let employeesWorkingFromHome = ["Anna", "Sam"];
company.employees = company.employees.map(employee => {
    employee.wfh = employeesWorkingFromHome.includes(employee.firstName);
    return employee;
});

console.log("Problem 6 Output:", JSON.stringify(company, null, 2));

// Output:
console.log("Final Company JSON:", JSON.stringify(company, null, 2));
