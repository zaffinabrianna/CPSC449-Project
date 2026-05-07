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

function createCatCard(cat, showDeleteButton = false)
{
  const card = document.createElement("div");
  card.className = "cat-card";

  card.innerHTML = `
    <h3>${cat.name}</h3>
    <p><strong>Age:</strong> ${cat.age}</p>
    <p><strong>Color:</strong> ${cat.color}</p>
  `;

  if (showDeleteButton) 
  {
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete Cat";
    deleteButton.onclick = async function () 
    {
      const confirmed = confirm(`Are you sure you want to delete ${cat.name}?`);

      if (!confirmed) 
      {
        return;
      }

      const res = await fetch(`/cats/${encodeURIComponent(cat.name)}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) 
      {
        alert(data.error || "Delete failed");
        return;
      }

      alert(data.message);
      loadCats();
    };

    card.appendChild(deleteButton);
  }

  return card;
}

// Load all cats and display as cards
async function loadCats() 
{
  const res = await fetch("/cats");
  const cats = await res.json();

  const catList = document.getElementById("catList");
  catList.innerHTML = "";

  cats.forEach(cat => {
    const card = createCatCard(cat, true);
    catList.appendChild(card);
  });
}

async function searchCat() 
{
  const name = document.getElementById("searchName").value;
  const res = await fetch(`/cats/search/${encodeURIComponent(name)}`);
  const cats = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (cats.length === 0) 
  {
    resultsDiv.innerHTML = "<p>No cats found.</p>";
  } 
  else 
  {
    cats.forEach(cat => {
      const card = createCatCard(cat, false);
      resultsDiv.appendChild(card);
    });
  }
}