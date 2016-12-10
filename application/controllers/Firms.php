<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/22/2016
 * Time: 12:53 AM
 */
defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH.'/libraries/REST_Controller.php');

class Firms extends REST_Controller   {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("firm");
    }

    public function index_get($id = null) {
        if(!$id) {
            $firms = $this->firm->get_firms();

            if($firms) {
                $this->response($firms);
                return;
            }

            $this->response(null, 404);
            return;
        }

        $firm = $this->firm->get_firm($id);

        if(!$firm) {
            $this->response([], 404);
        }

        $this->response($firm);
    }

    public function index_post ($id = null) {
        $name = $this->post("name");
        $manager = $this->post("manager");
        $phone = $this->post("phone");

        if(!$name || !$manager || !$phone) {
            $this->response([], 404);
            return;
        }

        $this->response($this->firm->add_firm($name, $manager, $phone), 201);
    }

    public function index_put ($id = null) {
        if(!$id) {
            $this->response([], 404);
            return;
        }

        parse_str(file_get_contents("php://input"),$data);

        $name = $data["name"];
        $manager = $data["manager"];
        $phone = $data["phone"];

        if(!$name || !$manager || !$phone) {
            $this->response([], 404);
            return;
        }

        $this->response($this->firm->edit_firm($id, $name, $manager, $phone));
    }

    public function index_delete ($id = null) {
        if(!$id) {
            $this->response([], 404);
            return;
        }

        $this->firm->delete_firm($id);
        $this->response(true);
    }

    public function list_get($page = null) {
        if(!$page) {
            $this->response([], 404);
            return;
        }

        $firms = $this->firm->get_firms($page);

        if(!$firms) {
            $this->response([], 404);
            return;
        }

        $this->response($firms);
    }
}