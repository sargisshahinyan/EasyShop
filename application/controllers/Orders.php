<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/19/2016
 * Time: 11:10 PM
 */

defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH.'/libraries/REST_Controller.php');

class Orders extends REST_Controller {
    public function __construct () {
        parent::__construct();
        $this->load->model("order");
    }

    public function index_get($id = null) {
        if(empty($id)) {
            $getData = $this->get();
            $orders = $this->order->getOrders(null, $getData);

            if(empty($orders)) {
                $orders = array();
            }

            $this->response($orders, 200);
            return;
        } else {
            $id = (int)$id;

            if(empty($id)) {
                $this->response('Order ID is not valid', 403);
                return;
            }

            $order = $this->order->getOrder($id);

            if(empty($order)) {
                $this->response("Order not found", 404);
                return;
            }

            $this->response($order);
            return;
        }
    }

    public function index_post() {
        $data["item"] = trim($this->post("item"));
        $data["quantity"] = trim($this->post("quantity"));

        foreach ($data as $datum) {
            if(empty($datum)) {
                $this->response("$datum is not defined", 403);
                return;
            }
        }

        $order = $this->order->addOrder($data);

        if(empty($order)) {
            $this->response("Can not add order", 500);
            return;
        }

        $this->response($order, 201);
    }

    public function index_put($id = null) {
        $id = (int)$id;

        if(empty($id)) {
            $this->response('Order ID is not valid', 403);
            return;
        }

        parse_str(file_get_contents("php://input"), $order);

        $data["item"] = isset($order["item"]) ? trim($order["item"]) : null;
        $data["quantity"] = isset($order["quantity"]) ? trim($order["quantity"]) : null;
        $data["state"] = isset($order["state"]) ? trim($order["state"]) : null;

        foreach ($data as $datum) {
            if(empty($datum) && $datum != "0") {
                $this->response("$datum is not defined", 403);
                return;
            }
        }

        $data["ID"] = $id;

        $order = $this->order->editOrder($data);

        if(empty($order)) {
            $this->response("Order not edited", 500);
            return;
        }

        $this->response($order, 200);
    }

    public function index_delete($id = null) {
        $id = (int)$id;

        if(empty($id)) {
            $this->response('Order ID is not valid', 403);
            return;
        }



        if($this->order->deleteOrder($id)) {
            $this->response("Done");
        } else {
            $this->response("Order is not deleted", 500);
        }
    }
}