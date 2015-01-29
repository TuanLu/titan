<?php
class MST_Titan_Model_General extends Mage_Core_Model_Abstract 
{
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'titan/general' );
	}
	public function saveGeneralInfo ($data) {
		$this->setData($data)->save();
	}
	public function getGeneralInfo() {
		$collection = $this->getCollection();
		return $collection->getLastItem()->getData();
	}
}