<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/17/2016
 * Time: 11:43 PM
 */

require(APPPATH.'/libraries/REST_Controller.php');

class Categories extends REST_Controller   {
    public function __construct()
    {
        parent::__construct();
        $this->load->model("category");
    }

    public function index_get($id = null) {
        if(!$id) {
            $categories = $this->category->get_categories();

            if($categories) {
                $this->response($categories);
                return;
            }

            $this->response(null, 404);
            return;
        }

        $category = $this->category->get_category($id);

        if(!$category) {
            $this->response([], 404);
        }

        $this->response($category);
    }

    public function index_post ($id = null) {
        $category = $this->post("name");

        if(!$category) {
            $this->response([], 404);
            return;
        }

        $this->response($this->category->add_category($category), 201);
    }

    public function index_put ($id = null) {
        if(!$id) {
            $this->response([], 404);
            return;
        }

        parse_str(file_get_contents("php://input"),$data);

        $category = $data["category"];

        if(!$category) {
            $this->response([], 404);
            return;
        }

        $this->response($this->category->edit_category($id, $category));
    }

    public function index_delete ($id = null) {
        if(!$id) {
            $this->response([], 404);
            return;
        }

        $this->category->delete_category($id);
        $this->response(true);
    }

    public function list_get($page = null) {
        if(!$page) {
            $this->response([], 404);
            return;
        }

        $categories = $this->category->get_categories($page);

        if(!$categories) {
            $this->response([], 404);
            return;
        }

        $this->response($categories);
    }
}