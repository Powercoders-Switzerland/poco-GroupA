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
  }
  
  function sortCompaniesByRating() {
    jsonData.sort((a, b) => b.user_rating - a.user_rating);
    displayData(jsonData);
  }
  

  fetch('file.json')
    .then(response => response.json())
    .then(data => {
      window.jsonData = data; 
      displayData(data); 
      
      document.getElementById('sort-button').addEventListener('click', function() {
        sortCompaniesByRating();
      });
    })
    .catch(error => {
      console.error("Error fetching JSON data: ", error);
    });
  