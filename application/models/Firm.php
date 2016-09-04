<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/22/2016
 * Time: 12:52 AM
 */

class Firm extends  CI_Model {
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function add_firm($name, $manager, $phone) {
        $this->db->query("INSERT firms (Name, Manager, Phone) VALUES ('$name', '$manager', '$phone')");
        $id = $this->db->insert_id();

        return $this->get_firm($id);
    }

    public function get_firm($id) {
        $firm = $this->db->query("SELECT * FROM firms WHERE ID = $id")->result_array();

        return isset($firm[0]) ? $firm[0] : null;
    }

    public function get_firms($page = 1) {
        $firms = $this->db->query("SELECT * FROM firms")->result_array();

        return isset($firms[0]) ? $firms : null;
    }

    public function delete_firm($id) {
        $this->db->query("DELETE FROM firms WHERE ID = $id");
    }

    public function edit_firm($id, $name, $manager, $phone) {
        $this->db->query("UPDATE firms SET Name = '$name', Manager = '$manager', Phone = '$phone' WHERE ID = $id");

        return $this->get_firm($id);
    }

    public function get_firms_count() {
        return $this->db->query("SELECT COUNT(*) as cnt FROM firms")->result_array()[0]["cnt"];
    }
}