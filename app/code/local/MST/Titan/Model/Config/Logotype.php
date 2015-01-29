<?php
class MST_Titan_Model_Config_Logotype {
	public function toOptionArray()
    {
        return array(
            array('value'=> 'default', 'label'=>Mage::helper('titan')->__('Default Magento Setting')),
			array('value'=> 'image', 'label'=>Mage::helper('titan')->__('Image')),
			array('value'=> 'text', 'label'=>Mage::helper('titan')->__('Text')),
        );
    }
}