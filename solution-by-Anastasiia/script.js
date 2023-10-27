function displayData(data) {
  const dataContainer = document.getElementById('data-container');
  let content = '';
  data.forEach((item, index) => {
    content += `
      <div class="company-card">
        <h2>${item.company}</h2>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Number of Internships:</strong> ${item.number_of_internships}</p>
        <p><strong>Department:</strong> ${item.department}</p>
        <p><strong>Skills:</strong> ${item.skills.join(', ')}</p>
        <p><strong>Website:</strong><a class="link" href="${item.website}">${item.website}</a></p>
        <p><strong>User Rating:</strong> <span id="rating-${index}">${item.user_rating}</span></p>
        <button class="rating-btn" onclick="rateCompany(${index}, 1)">Rate +1</button>
        <button class="rating-btn" onclick="rateCompany(${index}, -1)">Rate -1</button>
      </div>
    `;
  });
  dataContainer.innerHTML = content;
}

function rateCompany(index, value) {
  jsonData[index].user_rating += value;
  document.getElementById(`rating-${index}`).textContent = jsonData[index].user_rating;
  localStorage.setItem('internshipData', JSON.stringify(jsonData));
}

function sortCompaniesByRating() {
  jsonData.sort((a, b) => b.user_rating - a.user_rating);
  displayData(jsonData);
}

let jsonData;

const savedData = localStorage.getItem('internshipData');

if (savedData) {
  jsonData = JSON.parse(savedData);
  displayData(jsonData);
} else {
  fetch('file.json')
    .then(response => response.json())
    .then(data => {
      jsonData = data;
      displayData(data);
    })
    .catch(error => {
      console.error("Error fetching JSON data: ", error);
    });
}

document.getElementById('sort-button').addEventListener('click', function() {
  sortCompaniesByRating();
});
