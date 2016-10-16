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
        if(empty($this->post("action"))) {
            $this->response("Action is not defined", 403);
            return;
        }

        $item["ID"] = trim($this->post("ID"));
        $item["name"] = trim($this->post("name"));
        $item["firm"] = trim($this->post("firm"));
        $item["salePrice"] = trim($this->post("salePrice"));
        $item["category"] = trim($this->post("category"));
        $item["measurementUnit"] = trim($this->post("measurementUnit"));

        foreach ($item as $key => $prop) {
            if(empty($prop)) {
                $this->response("$key is not defined", 403);
                return;
            }
        }

        $this->response($this->item->create_item($item), 201);
    }

    public function index_put ($id = null) {
        if(!$id) {
            $this->response("No item selected", 403);
            return;
        }

        parse_str(file_get_contents("php://input"),$item);

        if(empty($item["action"])) {
            $this->response("Action is not defined", 403);
            return;
        }

        foreach ($item as $key => $prop) {
            if(empty($prop)) {
                $this->response("$key is not defined", 403);
                return;
            }
        }

        switch ($item['action']) {
            case "edit":
                $this->response($this->item->edit_item($id, $item));
                break;
            case "add":
                if(!$this->item->add_item($id, $item)) {
                    $this->response("Server error inch vor", 500);
                } else {
                    $this->response($this->response($this->item->get_item($id)), 200);
                }

                break;
        }
    }

    public function index_delete ($id = null) {
        if(!$id) {
            $this->response("No item selected", 404);
            return;
        }

        if(!$this->item->delete_item($id)) {
            $this->response("Server error inch vor", 500);
        } else {
            $this->response([], 200);
        }
    }
}