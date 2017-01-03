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
        $order = $this->db->query("SELECT 
            OrderedItems.ID,
            OrderedItems.ItemID,
            OrderedItems.Quantity,
            OrderedItems.Date,
            OrderedItems.IsDelivered,
            Items.Name as ItemName
            FROM OrderedItems JOIN Items ON Items.ID = OrderedItems.ItemID WHERE OrderedItems.ID = $id")->result_array();

        return isset($order[0]) ? $order[0] : null;
    }

    public function getOrders() {
        $order = $this->db->query("SELECT 
            OrderedItems.ID,
            OrderedItems.ItemID,
            OrderedItems.Quantity,
            OrderedItems.Date,
            OrderedItems.IsDelivered,
            Items.Name as ItemName
            FROM OrderedItems JOIN Items ON Items.ID = OrderedItems.ItemID")->result_array();

        return isset($order[0]) ? $order : null;
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
        $state = $data["state"];

        $res = $this->db->query("UPDATE OrderedItems SET ItemID = $item, Quantity = $quantity, IsDelivered = '$state' WHERE ID = $id");

        return $res ? $this->getOrder($id) : null;
    }

    public function deleteOrder($id) {
        return $this->db->query("DELETE OrderedItems WHERE ID = $id");
    }
}