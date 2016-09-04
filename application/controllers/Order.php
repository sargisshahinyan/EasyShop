<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/19/2016
 * Time: 11:10 PM
 */

class Order extends CI_Controller {
    public function __construct () {
        parent::__construct();
        $this->load->model("orders");
    }
}