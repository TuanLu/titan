<?php
class MST_Menupro_Model_Mysql4_Groupmenu_Collection extends Mage_Core_Model_Mysql4_Collection_Abstract
{

    public function _construct()
    {
        parent::_construct();
        $this->_init('menupro/groupmenu');
    }

}