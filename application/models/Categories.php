<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/17/2016
 * Time: 11:04 PM
 */

class Categories extends CI_Model {
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function add_category($category) {
        $this->db->query("INSERT Categories (Category) VALUES ('$category')");
        $id = $this->db->insert_id();

        return $this->get_category($id);
    }

    public function get_category($id) {
        $category = $this->db->query("SELECT * FROM Categories WHERE ID = $id")->result_array();

        return isset($category[0]) ? $category[0] : null;
    }

    public function get_categories($page = 1) {
        $page--;
        $categories = $this->db->query("SELECT * FROM Categories WHERE InSale = 1 LIMIT $page, 10")->result_array();

        return isset($categories[0]) ? $categories : null;
    }

    public function delete_category($id) {
        $this->db->query("DELETE FROM Categories WHERE ID = $id");
    }

    public function edit_category($id, $category) {
        $this->db->query("UPDATE Categories SET Category = '$category' WHERE ID = $id");

        return $this->get_category($id);
    }

    public function get_categories_count() {
        return $this->db->query("SELECT COUNT(*) as cnt FROM Categories")->result_array()[0]["cnt"];
    }
}