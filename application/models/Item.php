<?php

/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 9/4/2016
 * Time: 11:09 PM
 */
class Item extends CI_Model
{
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function get_item($id) {
        $item = $this->db->query("SELECT * FROM Items WHERE ID = $id")->result_array();

        return isset($item[0]) ? $item[0] : null;
    }

    public function get_items($page = null) {
        $items = $this->db->query("SELECT * FROM Items")->result_array();

        return isset($items[0]) ? $items : null;
    }

    public function add_item($item) {
        $name = $item["name"];
        $firm = $item["firm"];
        $sale_price = $item["salePrice"];
        $category = $item["category"];
        $measurementUnit = $item["measurementUnit"];

        $this->db->query("INSERT INTO Items VALUES (null, '$name', $firm, $sale_price, $category, 0,'$measurementUnit')");
        $id = $this->db->insert_id();

        return $this->get_item($id);
    }

    public function edit_item($id, $item) {
        $name = $item["name"];
        $firm = $item["firm"];
        $sale_price = $item["salePrice"];
        $category = $item["category"];
        $measurementUnit = $item["measurementUnit"];
        $quantity = $item["quantity"];

        $this->db->query("UPDATE Items SET Name = '$name', FirmID = $firm, SalePrice = $sale_price, CategoryID = $category, Quantity = $quantity, MeasurementUnit = '$measurementUnit' WHERE ID = $id");

        return $this->get_item($id);
    }

    public function delete_item($id) {
        $this->db->query("DELETE FROM Items WHERE ID = $id");
    }
}