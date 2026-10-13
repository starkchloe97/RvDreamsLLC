<?php
/**
 * Copy this file to config.php and replace the placeholders.
 * Keep config.php out of version control and never expose credentials in frontend code.
 */
return [
    'db_host' => '127.0.0.1',
    'db_port' => 3306,
    'db_name' => 'rvdreams_storefront',
    'db_user' => 'your_mysql_username',
    'db_pass' => 'replace-with-a-strong-password',
    'allowed_origins' => [
        'https://www.rvdreamsllc.com',
        'https://rvdreamsllc.com',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
];
