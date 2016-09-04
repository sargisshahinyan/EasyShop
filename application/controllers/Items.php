<?php

/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 9/4/2016
 * Time: 11:05 PM
 */
require(APPPATH.'/libraries/REST_Controller.php');

class Items extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("item");
    }

    public function index_get($id = null) {
        if(!$id) {
            $items = $this->item->get_items();

            if($items) {
                $this->response($items);
                return;
            }

            $this->response(null, 404);
            return;
        }

        $item = $this->item->get_item($id);

        if(!$item) {
            $this->response([], 404);
            return;
        }

        $this->response($item);
    }

    public function index_post ($id = null) {
        $item = array();

        $item["name"] = $this->post("name");
        $item["firm"] = $this->post("firm");
        $item["salePrice"] = $this->post("salePrice");
        $item["category"] = $this->post("category");
        $item["measurementUnit"] = $this->post("measurementUnit");

        foreach ($item as $prop) {
            if(!isset($prop)) {
                $this->response("hey hey hey", 404);
                return;
            }
        }

        $this->response($this->item->add_item($item), 201);
    }

    public function index_put ($id = null) {
        if(!$id) {
            $this->response([], 404);
            return;
        }

        parse_str(file_get_contents("php://input"),$data);

        foreach ($data as $prop) {
            if(!isset($prop)) {
                $this->response([], 404);
                return;
            }
        }

        $this->response($this->item->edit_item($id, $data));
    }

    public function index_delete ($id = null) {
        if(!$id) {
            $this->response([], 404);
            return;
        }

        $this->item->delete_item($id);
        $this->response(true);
    }
}