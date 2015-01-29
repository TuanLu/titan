<?php
require_once 'Mage/Checkout/controllers/CartController.php';
class MST_Ajaxaddtocart_CouponController extends Mage_Checkout_CartController
{
	
	public function customcouponPostAction()
    { 
    	/**
    	 * No reason continue with empty shopping cart
    	 */
    	
    	$response = array();
    	$response['status'] = 'ERROR';
    	if (!$this->_getCart()->getQuote()->getItemsCount()) {
    		//$this->_goBack();
    		return;
    	}
   //echo $this->getRequest()->getParam('remove'); die;
    	$couponCode = (string) $this->getRequest()->getParam('coupon_code');
    	
    	if ($this->getRequest()->getParam('remove') == 1) {
    		$couponCode = '';
    	}
    	$oldCouponCode = $this->_getQuote()->getCouponCode();
    
    	if (!strlen($couponCode) && !strlen($oldCouponCode)) {
    		//$this->_goBack();
    		return;
    	}
    
    	try {
    		$this->_getQuote()->getShippingAddress()->setCollectShippingRates(true);
    		$this->_getQuote()->setCouponCode(strlen($couponCode) ? $couponCode : '')
    		->collectTotals()
    		->save();
    
    		if (strlen($couponCode)) {
    			if ($couponCode == $this->_getQuote()->getCouponCode()) {
    				//$this->_getSession()->addSuccess(
    				//		$this->__('Coupon code "%s" was applied.', Mage::helper('core')->htmlEscape($couponCode))
    				//);
    				//$response['msg'] =$this->__('Coupon code "%s" was applied.', Mage::helper('core')->htmlEscape($couponCode));
    				$response['msg'] ='<div class="mesage"><p>'.$this->__('Coupon code "%s" was applied.', Mage::helper('core')->htmlEscape($couponCode)).'</p></div>';
    				$response['msg1'] ='<ul class="messages"><li class="success-msg"><ul><li><span>Coupon code "'.Mage::helper('core')->htmlEscape($couponCode).'" was applied.</span></li></ul></li></ul>';
    				$response['status'] = 'SUCCESS';
    				
    			}
    			else {
    				//$this->_getSession()->addError(
    				//		$this->__('Coupon code "%s" is not valid.', Mage::helper('core')->htmlEscape($couponCode))
    				//);
    				//$response['msg'] = $this->__('Coupon code "%s" is not valid.', Mage::helper('core')->htmlEscape($couponCode));
    				$response['msg'] = '<div class="red box error"> <p>Rabatkoden er enten ugyldig eller udløbet</p> </div>';
    				$response['msg1'] = '<ul class="messages"><li class="error-msg"><ul><li><span>Coupon code "'.Mage::helper('core')->htmlEscape($couponCode).'" is not valid.</span></li></ul></li></ul>';
    				$response['status'] = 'ERROR';
    			}
    		} else {
    			$response['status'] = 'SUCCESS';
    			//$this->_getSession()->addSuccess($this->__('Coupon code was canceled.'));
    			$response['msg'] = $this->__('Coupon code was canceled.');
    			$response['msg1'] = '<ul class="messages"><li class="success-msg"><ul><li><span>Coupon code was canceled.</span></li></ul></li></ul>';
    		}
    
    	} catch (Mage_Core_Exception $e) {
    		//$this->_getSession()->addError($e->getMessage());
    	} catch (Exception $e) {
    		//$this->_getSession()->addError($this->__('Cannot apply the coupon code.'));
    		//Mage::logException($e);
    		$response['msg'] = $this->__('Cannot apply the coupon code.');
    	}
		$response['coupon'] = Mage::app()->getLayout()->createBlock('checkout/cart_coupon')->setTemplate('ajaxaddtocart/checkout/cart/coupon.phtml')->toHtml();
		$response['total'] = Mage::app()->getLayout()->createBlock('checkout/cart_totals')->setTemplate('checkout/cart/totals.phtml')->toHtml();
		echo Mage::helper('core')->jsonEncode($response);
    /*	$this->loadLayout(false);
    	$review = $this->getLayout()->getBlock('roots')->toHtml();
    	$response['review'] = $review;
    	//$this->_goBack();
    	$this->getResponse()->setBody(Mage::helper('core')->jsonEncode($response));*/
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
			$response['block']['cartpage']=Mage::app()->getLayout()->getBlock('checkout.cart')->toHtml();
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
    public function updatePostAction()
    {
        if ($this->getRequest()->getParam('callback')) {
            $updateAction = (string) $this->getRequest()->getParam('update_cart_action');

            switch ($updateAction) {
                case 'empty_cart':
                    $this->_emptyShoppingCart();
                    break;
                case 'update_qty':
                    $this->_updateShoppingCart();
                    break;
                default:
                    $this->_updateShoppingCart();
            }
            $this->loadLayout();
            $updateAction = $this->getRequest()->getParams();
 
            if($updateAction == 'empty_cart') {
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
			$response['block']['cartpage']=Mage::app()->getLayout()->getBlock('checkout.cart')->toHtml();
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
            //$this->getResponse()->setBody($this->getRequest()->getParam('callback').'('.Mage::helper('core')->jsonEncode($ajaxData).')'); 
        } else {
            $updateAction = (string) $this->getRequest()->getParam('update_cart_action');
            switch ($updateAction) {
                case 'empty_cart':
                    $this->_emptyShoppingCart();
                    break;
                case 'update_qty':
                    $this->_updateShoppingCart();
                    break;
                default:
                    $this->_updateShoppingCart();
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
			$response['block']['cartpage']=Mage::app()->getLayout()->getBlock('checkout.cart')->toHtml();
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
    }	
}
