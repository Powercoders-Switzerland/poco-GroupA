fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const table = document.getElementById("company-table");
        const tbody = table.querySelector("tbody");

        data.forEach(company => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${company.Company}</td>
                <td>${company.Revenue}</td>
                <td>${company.Employees}</td>
                <td>${company.Location}</td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
 

   
