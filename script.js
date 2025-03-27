// Mode gelap/terang
document.getElementById("mode-toggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    this.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    document.body.style.transition = "background 0.5s ease, color 0.5s ease";
});

// Data lokal
let dataList = JSON.parse(localStorage.getItem("dataList")) || [];
let saldoAkhir = parseInt(localStorage.getItem("saldoAkhir")) || 0;
let editIndex = -1;

// Efek klik pada tombol nominal
document.querySelectorAll(".nominal-btn").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".nominal-btn").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
    });
});

// Tambah Data
function tambahData() {
    let deskripsi = document.getElementById("deskripsi").value;
    let tanggal = document.getElementById("tanggal").value;
    let nominalBtn = document.querySelector(".nominal-btn.active");

    if (!deskripsi || !tanggal || !nominalBtn) {
        alert("Harap isi semua data!");
        return;
    }

    let nominal = parseInt(nominalBtn.dataset.value);
    
    if (editIndex === -1) {
        dataList.push({ deskripsi, tanggal, nominal });
        saldoAkhir += nominal;
    } else {
        saldoAkhir -= dataList[editIndex].nominal;
        dataList[editIndex] = { deskripsi, tanggal, nominal };
        saldoAkhir += nominal;
        editIndex = -1;
    }

    localStorage.setItem("dataList", JSON.stringify(dataList));
    localStorage.setItem("saldoAkhir", saldoAkhir);
    renderTable();
}

// Render tabel
function renderTable() {
    let tbody = document.querySelector("#data-table tbody");
    tbody.innerHTML = "";
    dataList.forEach((data, index) => {
        let row = `<tr>
            <td>${index + 1}</td>
            <td>${data.deskripsi}</td>
            <td>${data.tanggal}</td>
            <td>Rp ${data.nominal.toLocaleString()}</td>
            <td>
                <button onclick="editData(${index})">✏️ Edit</button>
                <button onclick="hapusData(${index})">🗑 Hapus</button>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });

    document.getElementById("saldoAkhir").textContent = `Rp ${saldoAkhir.toLocaleString()}`;
}

// Menampilkan data saat halaman dimuat
renderTable();
￼Enter
