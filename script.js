// Define subjects & credits
const subjects = [
  { name: "Mathematics", credit: 4 },
  { name: "Physics", credit: 3 },
  { name: "Chemistry", credit: 3 },
  { name: "Programming", credit: 3 },
  { name: "English", credit: 2 },
  { name: "Data Science", credit: 4 },
];

// Generate rows
const tableBody = document.getElementById("tableBody");
subjects.forEach(sub => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${sub.name}</td>
    <td>${sub.credit}</td>
    <td><input type="number" min="0" max="100" id="${sub.name}" placeholder="0"></td>
  `;
  tableBody.appendChild(tr);
});

// Grade calculation
function calculateSGPA() {
  let totalCredits = 0, totalPoints = 0;

  subjects.forEach(sub => {
    const marks = parseFloat(document.getElementById(sub.name).value) || 0;
    let gradePoint = 0;

    if (marks >= 90) gradePoint = 10;
    else if (marks >= 80) gradePoint = 9;
    else if (marks >= 70) gradePoint = 8;
    else if (marks >= 60) gradePoint = 7;
    else if (marks >= 50) gradePoint = 6;
    else if (marks >= 40) gradePoint = 5;
    else gradePoint = 0;

    totalCredits += sub.credit;
    totalPoints += gradePoint * sub.credit;
  });

  const sgpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("result").innerHTML = `<b>SGPA:</b> ${sgpa}`;
  return sgpa;
}

document.getElementById("calcBtn").addEventListener("click", calculateSGPA);

// Save results in localStorage
document.getElementById("saveBtn").addEventListener("click", () => {
  const name = document.getElementById("studentName").value.trim();
  const roll = document.getElementById("rollNumber").value.trim();
  const sgpa = calculateSGPA();

  if (!name || !roll) {
    alert("Please enter Name and Roll Number!");
    return;
  }

  localStorage.setItem(roll, JSON.stringify({ name, roll, sgpa }));
  alert("Data Saved!");
});

// Compare students
document.getElementById("compareBtn").addEventListener("click", () => {
  const allData = Object.values(localStorage).map(v => JSON.parse(v));
  if (allData.length < 2) {
    document.getElementById("comparison").innerText = "Need at least 2 students saved!";
    return;
  }

  const sorted = allData.sort((a,b) => b.sgpa - a.sgpa);
  let html = "<h3>Top Students:</h3><ul>";
  sorted.forEach(s => {
    html += `<li>${s.name} (${s.roll}) — SGPA: ${s.sgpa}</li>`;
  });
  html += "</ul>";
  document.getElementById("comparison").innerHTML = html;
});
