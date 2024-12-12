<?php
include 'db.php';

// Allow cross-origin requests
header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type"); 

header("Content-Type: application/json");

// Tentukan folder untuk menyimpan gambar
$targetDir = "uploads/"; // Pastikan folder ini dapat diakses oleh server dan memiliki izin tulis
$targetFile = $targetDir . basename($_FILES["image"]["name"]);
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

// Cek apakah file yang diunggah adalah gambar
if (isset($_POST["submit"])) {
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
        // Validasi ekstensi file
        if ($imageFileType != "jpg" && $imageFileType != "png") {
            echo "Hanya gambar dengan ekstensi JPG atau PNG yang diperbolehkan.";
            exit;
        }

        // Coba pindahkan file ke folder tujuan
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            // Jika berhasil, kirimkan respons berupa URL file yang diunggah
            echo json_encode(["image" => $targetFile]);
        } else {
            echo "Terjadi kesalahan saat mengunggah gambar.";
        }
    } else {
        echo "File yang diunggah bukan gambar.";
    }
} else {
    echo "Tidak ada file yang diunggah.";
}
?>
