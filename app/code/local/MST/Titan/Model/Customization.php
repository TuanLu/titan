<?php
class MST_Titan_Model_Customization extends Mage_Core_Model_Abstract 
{
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'titan/customization' );
	}
	public function saveCustomizationConfig($data) {
		$this->setData($data)->save();
	} 
	public function getCustomizationConfig() {
		$collection = $this->getCollection();
		return $collection->getLastItem()->getData();
	}
}