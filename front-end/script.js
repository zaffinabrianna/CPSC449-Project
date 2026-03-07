async function uploadCat() 
{
  const cat = 
  {
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    color: document.getElementById("color").value
  };

  await fetch("/cats", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cat)
  });

  alert("Cat uploaded!");
}

// Load all cats and display as cards
async function loadCats() 
{
  const res = await fetch("/cats");
  const cats = await res.json();

  const catList = document.getElementById("catList");
  catList.innerHTML = ""; // clear old content

  cats.forEach(cat => {
    const card = document.createElement("div");
    card.className = "cat-card"; // uses the CSS card style

    card.innerHTML = `
      <h3>${cat.name}</h3>
      <p><strong>Age:</strong> ${cat.age}</p>
      <p><strong>Color:</strong> ${cat.color}</p>
    `;

    catList.appendChild(card);
  });
}

async function searchCat() 
{
  const name = document.getElementById("searchName").value;
  const res = await fetch(`/cats/search/${name}`);
  const cats = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // clear old results

  if (cats.length === 0) {
    resultsDiv.innerHTML = "<p>No cats found.</p>";
  } else {
    cats.forEach(cat => {
      const card = document.createElement("div");
      card.className = "cat-card"; // same card style

      card.innerHTML = `
        <h3>${cat.name}</h3>
        <p><strong>Age:</strong> ${cat.age}</p>
        <p><strong>Color:</strong> ${cat.color}</p>
      `;

      resultsDiv.appendChild(card);
    });
  }
}