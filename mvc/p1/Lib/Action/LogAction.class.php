<?php

class LogAction{
    public function index( $method, $doname ){
        
        $data['user_name'] = $_SESSION['user']['name'];
        //
        switch $method
        {
            case $method == 'add':
                $this->__insert();
                break;
            case $method == 'save':
                $this->__update();
                break;
            case $method == 'del':
                $this->__delete();
                break;
        }
    }

    private function __insert(){

    }

    private function __save(){
        
    }

    private function __delete(){
        
    }
}