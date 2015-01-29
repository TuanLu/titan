<?php
class MST_Titan_Model_Mysql4_Customization extends Mage_Core_Model_Mysql4_Abstract
{
    public function _construct()
    {
        $this->_init('titan/customization', 'id');
    }
}