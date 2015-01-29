<?php
class MST_Titan_Model_Pageoption extends Mage_Core_Model_Abstract 
{
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'titan/pageoption' );
	}
	public function savePageOption ($data) {
		$this->setData($data)->save();
	}
	public function getPageOption() {
		$collection = $this->getCollection();
		return $collection->getLastItem()->getData();
	}
}