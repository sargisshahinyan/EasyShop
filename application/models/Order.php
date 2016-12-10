<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/19/2016
 * Time: 10:14 PM
 */

defined('BASEPATH') OR exit('No direct script access allowed');

class Order extends CI_Model {
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }

    public function getOrder($id) {
        $order = $this->db->query("SELECT * FROM OrderedItems WHERE ID = $id")->result_array();

        return isset($order[0]) ? $order[0] : null;
    }

    public function addOrder($data) {
        $item = $data["item"];
        $quantity = $data["quantity"];

        $res = $this->db->query("INSERT INTO OrderedItems (ItemID, Quantity) VALUES ($item, $quantity)");

        if($res) {
            $id = $this->db->insert_id();
            return $this->getOrder($id);
        } else {
            return null;
        }
    }

    public function editOrder($data) {
        $id = $data["ID"];
        $item = $data["item"];
        $quantity = $data["quantity"];

        $res = $this->db->query("UPDATE OrderedItems SET ItemID = $item, Quantity = $quantity WHERE ID = $id");

        return $res ? $this->getOrder($id) : null;
    }

    public function deleteOrder($id) {
        return $this->db->query("DELETE OrderedItems WHERE ID = $id");
    }
}