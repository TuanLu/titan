<?php
/**
 * MageBay Co.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://ecommerce.MageBay.com/MST-LICENSE.txt
 *
 * =================================================================
 *                 MAGENTO EDITION USAGE NOTICE
 * =================================================================
 * This package designed for Magento community edition
 * MageBay does not guarantee correct work of this extension
 * on any other Magento edition except Magento community edition.
 * MageBay does not provide extension support in case of
 * incorrect edition usage.
 * =================================================================
 *
 * @category   MST
 * @package    MST_Ajaxaddtocart
 * @version    3.1.2
 * @copyright  Copyright (c) 2010-2012 MageBay Co. (http://www.MageBay.com)
 * @license    http://ecommerce.MageBay.com/MST-LICENSE.txt
 */

class MST_Ajaxaddtocart_Model_Observer
{
    protected $_action;	
    public function getConfigurableOptions($observer) {
        $is_ajax = Mage::app()->getFrontController()->getRequest()->getParam('ajax');        		
        if($is_ajax) {
            $_response = Mage::getModel('ajaxaddtocart/response');

            $product = Mage::registry('current_product');
            if (!$product->isConfigurable() && !$product->getTypeId() == 'bundle'){return false;exit;}	
            //append configurable options block
            $_response->addConfigurableOptionsBlock($_response);
            $_response->send();
        }
        return;
    }
	public function getGroupProductOptions($observer) {
        $id = Mage::app()->getFrontController()->getRequest()->getParam('product');
        $options = Mage::app()->getFrontController()->getRequest()->getParam('super_group');

        if($id) {
            $product = Mage::getModel('catalog/product')->load($id);
            if($product->getData()) {
                if($product->getTypeId() == 'grouped' && !$options) {
                    $_response = Mage::getModel('ajaxaddtocart/response');
                    Mage::register('product', $product);
                    Mage::register('current_product', $product);

                    //add group product's items block
                    $_response->addGroupProductItemsBlock($_response);
                    $_response->send();
                }
            }
        }
    }	
}
