<?php
class MST_Ajaxaddtocart_Model_Source_Optionfly {
	public function toOptionArray() {
		$options = array();
		$options[] = array('value'=>'.top-link-cart', 'label'=>'Top Link');
		$options[] = array('value'=>'.block-cart', 'label'=>'Mini Cart');
		return $options;
	}
}