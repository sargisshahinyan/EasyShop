<?php
/**
 * Created by PhpStorm.
 * User: Sargis
 * Date: 8/9/2016
 * Time: 2:47 PM
 */

class Admin extends CI_Model {
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_admin($login, $password) {
        $admin = $this->db->query("SELECT ID, Name FROM Admins WHERE login='$login' AND password='$password'")->result_array();

        return isset($admin[0]) ? $admin[0] : null;
    }

    private function get_admin_by_id($id) {
        $admin = $this->db->query("SELECT ID, Name FROM Admins WHERE id = $id")->result_array();

        return isset($admin[0]) ? $admin[0] : null;
    }

    public function add_log_in_info($admin) {
        $id = $admin["ID"];
        $loginID = $admin["LoginID"];
        $cookie = $admin["Cookie"];

        if($cookie) {
            $this->db->query("INSERT AdminLogIn (AdminID, LogInID, Cookie) VALUES ($id, '$loginID', '$cookie')");
        } else {
            $this->db->query("INSERT AdminLogIn (AdminID, LogInID) VALUES ($id, '$loginID')");
        }
    }

    public function check($code) {
        $admin = $this->db->query("SELECT * FROM AdminLogIn WHERE LogInID = '$code'")->result_array();

        return isset($admin[0]) ? $admin[0] : null;
    }

    public function get_admin_by_cookie($code) {
        $adminDet = $this->db->query("SELECT * FROM AdminLogin WHERE Cookie = '$code'")->result_array();

        if(!$adminDet) {
            return null;
        }

        $admin = $this->get_admin_by_id($adminDet[0]["AdminID"]);
        $admin["LoginID"] = $this->get_code();

        $this->db->query("UPDATE AdminLogin SET LogInID = '".$admin["LoginID"]."' WHERE Cookie = '$code'");

        return $admin;
    }

    private function get_code() {
        $str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $code = "";

        for($i = 0; $i < 20; ++$i) {
            $r = rand(0, strlen($str) - 1);
            $code .= $str[$r];
        }

        return $code;
    }
}