<?php
class MST_Ajaxaddtocart_Model_Source_Loading {
	public function toOptionArray() {
		$options = array();
		$options[] = array('value'=>'1', 'label'=>'Loading Image');
		$options[] = array('value'=>'2', 'label'=>'Fly Efect To Cart Block');
		return $options;
	}
}