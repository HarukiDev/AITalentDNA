<?php
include 'db.php';

// Allow cross-origin requests
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true"); // Tambahkan ini jika menggunakan kredensial
header("Content-Type: application/json");

// Ambil data dari request POST
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['oldPassword']) && isset($data['newPassword']) && isset($data['email'])) {
    $oldPassword = $data['oldPassword'];
    $newPassword = $data['newPassword'];
    $email = $data['email'];

    // Cek pengguna berdasarkan email
    $sql = "SELECT password FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $row = mysqli_fetch_assoc($result);

        // Verifikasi password lama
        if (password_verify($oldPassword, $row['password'])) {
            // Hash password baru
            $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Update password di database
            $updateSql = "UPDATE users SET password = '$hashedNewPassword' WHERE email = '$email'";
            if (mysqli_query($conn, $updateSql)) {
                echo json_encode(["message" => "Password berhasil diubah"]);
            } else {
                echo json_encode(["error" => "Gagal mengubah password"]);
            }
        } else {
            echo json_encode(["error" => "Password lama tidak sesuai"]);
        }
    } else {
        echo json_encode(["error" => "Pengguna tidak ditemukan"]);
    }
} else {
    echo json_encode(["error" => "Data tidak lengkap"]);
}
?>
