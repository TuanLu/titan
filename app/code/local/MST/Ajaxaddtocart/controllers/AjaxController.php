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


class MST_Ajaxaddtocart_AjaxController extends Mage_Core_Controller_Front_Action
{    
    const CONFIGURABLE_PRODUCT_IMAGE= 'checkout/cart/configurable_product_image';
    const USE_PARENT_IMAGE          = 'parent';
	
    protected function _getSession()
    {
        return Mage::getSingleton('checkout/session');
    }    
	public function cartAction()
    {
	
        if ($this->getRequest()->getParam('cart')){
            if ($this->getRequest()->getParam('cart') == "delete"){
                $id = $this->getRequest()->getParam('id');
                if ($id) {
                    try {
                        Mage::getSingleton('checkout/cart')->removeItem($id)
                          ->save();
                    } catch (Exception $e) {
                        Mage::getSingleton('checkout/session')->addError($this->__('Cannot remove item'));
                    }
                }
            }
        }
        $product_option_id = $this->getRequest()->getParam('product');
        $options = $this->getRequest()->getParam('super_group');

        if($product_option_id) {
            $product = Mage::getModel('catalog/product')->load($product_option_id);
            if($product->getData()) {
                if($product->getTypeId() == 'grouped' && !$options) {
                    $_response = Mage::getModel('ajaxaddtocart/response');
                    Mage::register('product', $product);
                    Mage::register('current_product', $product);

                    //add group product's items block
                    $_response->addGroupProductItemsBlock($_response);
                    $_response->send();	
					return true;					
                }
            }
        }

        if ($this->getRequest()->getParam('product')) {
            $cart   = Mage::getSingleton('checkout/cart');
            $params = $this->getRequest()->getParams();
            $related = $this->getRequest()->getParam('related_product');

            $productId = (int) $this->getRequest()->getParam('product');


            if ($productId) {
                $product = Mage::getModel('catalog/product')
                    ->setStoreId(Mage::app()->getStore()->getId())
                    ->load($productId);
                try {

                    if (!isset($params['qty'])) {
                        $params['qty'] = 1;
                    }

                    $cart->addProduct($product, $params);
                    if (!empty($related)) {
                        $cart->addProductsByIds(explode(',', $related));
                    }
                    $cart->save();
                    $this->_getSession()->setCartWasUpdated(true);


                    Mage::getSingleton('checkout/session')->setCartWasUpdated(true);
                    Mage::getSingleton('checkout/session')->setCartInsertedItem($product->getId());
                }
                catch (Mage_Core_Exception $e) {
                    if (Mage::getSingleton('checkout/session')->getUseNotice(true)) {
                        Mage::getSingleton('checkout/session')->addNotice($e->getMessage());
                    } else {
                        $messages = array_unique(explode("\n", $e->getMessage()));
                        foreach ($messages as $message) {
                            Mage::getSingleton('checkout/session')->addError($message);
                        }
                    }
                }
                catch (Exception $e) {
                    Mage::getSingleton('checkout/session')->addException($e, $this->__('Can not add item to shopping cart'));
                }

            }
        }
		
			
        $this->loadLayout();
		$response = array();
		$_messages=Mage::getModel('ajaxaddtocart/response')->_getErrorMessages();
		if(empty($_messages)){
			$response['block']['success']=true;
		}else{
			$response['block']['success']=false;
		}
		if(Mage::app()->getLayout()->getBlock('checkout.cart')){
			$response['block']['cart']=Mage::app()->getLayout()->getBlock('checkout.cart')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('top.links')){
			$response['block']['topLinks']=Mage::app()->getLayout()->getBlock('top.links')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('cart_sidebar')){
			$response['block']['sidebar']=Mage::app()->getLayout()->getBlock('cart_sidebar')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('cart_dropdowncart')){
		$response['block']['dropdowncart']=Mage::app()->getLayout()->getBlock('cart_dropdowncart')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('cart_dropdowncart1')){
		$response['block']['dropdowncart1']=Mage::app()->getLayout()->getBlock('cart_dropdowncart1')->toHtml();
		}		
		if(Mage::app()->getLayout()->getBlock('minicart_head')){
		$response['block']['minicarthead']=Mage::app()->getLayout()->getBlock('minicart_head')->toHtml();
		}
		echo Mage::helper('core')->jsonEncode($response);
    }	    
	
    protected function updatePostAction()
    {
        try {
            $cartData = $this->getRequest()->getParam('cart');
            if (is_array($cartData)) {
                $filter = new Zend_Filter_LocalizedToNormalized(
                    array('locale' => Mage::app()->getLocale()->getLocaleCode())
                );
                foreach ($cartData as $index => $data) {
                    if (isset($data['qty'])) {
                        $cartData[$index]['qty'] = $filter->filter(trim($data['qty']));
                    }
                }
                $cart = Mage::getSingleton('checkout/cart');
                if (! $cart->getCustomerSession()->getCustomer()->getId() && $cart->getQuote()->getCustomerId()) {
                    $cart->getQuote()->setCustomerId(null);
                }

                $cartData = $cart->suggestItemsQty($cartData);
                $cart->updateItems($cartData)
                    ->save();
            }
            Mage::getSingleton('checkout/session')->setCartWasUpdated(true);
        } catch (Mage_Core_Exception $e) {
            $this->_getSession()->addError(Mage::helper('core')->escapeHtml($e->getMessage()));
        } catch (Exception $e) {
            $this->_getSession()->addException($e, $this->__('Cannot update shopping cart.'));
            Mage::logException($e);
        }
		
		$this->loadLayout();
		$response = array();
		$_messages=Mage::getModel('ajaxaddtocart/response')->_getErrorMessages();
		if(empty($_messages)){
			$response['block']['success']=true;
		}else{
			$response['block']['success']=false;
		}
		if(Mage::app()->getLayout()->getBlock('checkout.cart')){
			$response['block']['cart']=Mage::app()->getLayout()->getBlock('checkout.cart')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('top.links')){
			$response['block']['topLinks']=Mage::app()->getLayout()->getBlock('top.links')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('cart_sidebar')){
			$response['block']['sidebar']=Mage::app()->getLayout()->getBlock('cart_sidebar')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('cart_dropdowncart')){
			$response['block']['dropdowncart']=Mage::app()->getLayout()->getBlock('cart_dropdowncart')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('cart_dropdowncart1')){
			$response['block']['dropdowncart1']=Mage::app()->getLayout()->getBlock('cart_dropdowncart1')->toHtml();
		}
		if(Mage::app()->getLayout()->getBlock('minicart_head')){
			$response['block']['minicarthead']=Mage::app()->getLayout()->getBlock('minicart_head')->toHtml();
		}
		echo Mage::helper('core')->jsonEncode($response);		
		//$this->renderLayout();			
    }	
}