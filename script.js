fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const today = new Date();
    const tbody = document.querySelector("#documentTable tbody");

    data.forEach(item => {
      const start = new Date(item.startDate);
      const end = item.endDate ? new Date(item.endDate) : null;

      if (start <= today && (!end || end >= today)) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.dept}</td>
          <td>${item.code}</td>
          <td>${item.rev}</td>
          <td>${item.title}</td>
          <td>${formatDate(item.startDate)}</td>
          <td>PDF</td>
          <td><a href="${item.link}" target="_blank">Click</a></td>
        `;
        tbody.appendChild(row);
      }
    });
  });

function formatDate(isoDate) {
  const [y, m, d] = isoDate.split("-");
  return `${parseInt(d)} ${getMonthName(m)} ${parseInt(y) + 543}`;
}

function getMonthName(mm) {
  const names = {
    "01": "ม.ค.", "02": "ก.พ.", "03": "มี.ค.", "04": "เม.ย.",
    "05": "พ.ค.", "06": "มิ.ย.", "07": "ก.ค.", "08": "ส.ค.",
    "09": "ก.ย.", "10": "ต.ค.", "11": "พ.ย.", "12": "ธ.ค."
  };
  return names[mm] || mm;
}
