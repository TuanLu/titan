<?php
class MST_Titan_Model_Navigation extends Mage_Core_Model_Abstract 
{
	public function _construct() {
		parent::_construct ();
		$this->_init ( 'titan/navigation' );
	}
	public function saveNavigationConfig($data) {
		if ($data['menu_type'] == "1") {
			$data["menu_group"] = "";
		}
		$this->setData($data)->save();
	} 
	public function getNavigationConfig() {
		$collection = $this->getCollection();
		return $collection->getLastItem()->getData();
	}
}