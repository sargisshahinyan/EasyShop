<?php
/**
 * Created by IntelliJ IDEA.
 * User: Sargis
 * Date: 8/19/2016
 * Time: 10:14 PM
 */

class Orders extends CI_Model {
    public function __construct()
    {
        parent::__construct();
        $this->load->database();
    }
}