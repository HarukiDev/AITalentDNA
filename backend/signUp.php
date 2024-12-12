<?php
include 'db.php'; 

header("Access-Control-Allow-Origin: http://localhost:5173"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  
header("Access-Control-Allow-Headers: Content-Type"); 
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data['email'];
    $password = $data['password'];
    $username = $data['username'];
    
    // Acak id_corporate antara 1 sampai 100 (sesuaikan range sesuai kebutuhan)
    $id_corporate = random_int(1, 100);

    // Cek apakah email sudah terdaftar
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'Email sudah terdaftar']);
    } else {
        // Hash password sebelum disimpan
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        // Tetapkan session_id secara manual atau acak jika diperlukan
        // Misalnya session_id = 1 jika dibutuhkan oleh API
        $session_id = 1; 

        $stmt_insert = $conn->prepare("INSERT INTO users (username, email, password, id_corporate, session_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())");
        $stmt_insert->bind_param("sssii", $username, $email, $hashed_password, $id_corporate, $session_id);

        if ($stmt_insert->execute()) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Pendaftaran berhasil',
                'user' => [
                    'id' => $conn->insert_id,
                    'username' => $username,
                    'email' => $email,
                    'id_corporate' => $id_corporate,
                    'session_id' => $session_id
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Terjadi kesalahan, coba lagi']);
        }
    }
}
?>
