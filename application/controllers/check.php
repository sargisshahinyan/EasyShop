<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/13/2016
 * Time: 12:37 PM
 */

class check extends CI_Controller {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("admin");
    }

    public function admin () {
        $code = $this->input->post("code");

        if(!$code) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            echo null;
            return;
        }

        $adminDet = $this->admin->check($code);

        if(!$adminDet) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            echo null;
            return;
        }

        echo "done";
    }

    public function cookie() {
        $code = $this->input->post("code");

        if(!$code) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            echo null;
            return;
        }

        $admin = $this->admin->get_admin_by_cookie($code);

        if(!$admin) {
            header($_SERVER["SERVER_PROTOCOL"]." 404 Not Found", true, 404);
            echo null;
            return;
        }

        echo json_encode($admin);
    }
}