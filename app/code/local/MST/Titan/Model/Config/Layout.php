<?php
class MST_Titan_Model_Config_Layout {
	public function toOptionArray()
    {
        return array(
            array('value'=> 'fullwidth', 'label'=>Mage::helper('titan')->__('Full Width')),
            array('value'=> 't2-boxed', 'label'=>Mage::helper('titan')->__('Boxed Desktop 1170px')),
            array('value'=> 't2-boxed-medium', 'label'=>Mage::helper('titan')->__('Boxed Desktop 980px')),                                   
        );
    }
}