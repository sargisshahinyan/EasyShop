<?php
/**
 * Created by PhpStorm.
 * User: Sargis
 * Date: 8/9/2016
 * Time: 2:44 PM
 */

defined('BASEPATH') OR exit('No direct script access allowed');

class SignIn extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model('admin');
    }

    public function admin() {
        $login = $this->input->post('login');
        $password = $this->input->post('password');
        $remember = $this->input->post('remember');

        $admin = $this->admin->get_admin($login, $password);

        if(!$admin) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            echo "Incorrect Login or Password";
            return;
        }

        $admin['LoginID'] = $this->getCode();
        $admin['Cookie'] = $remember ? $this->getCode() : null;

        $this->admin->add_log_in_info($admin);

        echo json_encode($admin);
    }

    public function user() {
        $login = $this->input->post('login');
        $password = $this->input->post('password');
        $remember = $this->input->post('remember');

        $user = $this->user->get_user($login, $password);

        if(!$user) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            echo "Incorrect Login or Password";
            return;
        }

        $user['LoginID'] = $this->getCode();
        $user['Cookie'] = $remember ? $this->getCode() : null;

        $this->user->add_log_in_info($user);

        echo json_encode($user);
    }

    private function getCode() {
        $str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $code = "";

        for($i = 0; $i < 20; ++$i) {
            $r = rand(0, strlen($str) - 1);
            $code .= $str[$r];
        }

        return $code;
    }
}