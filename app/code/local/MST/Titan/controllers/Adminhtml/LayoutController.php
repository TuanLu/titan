<?php 
class MST_Titan_Adminhtml_LayoutController extends Mage_Adminhtml_Controller_Action {	
	protected function _initAction()    {       
		$this->loadLayout()->_setActiveMenu('titan/titan')->_addBreadcrumb(Mage::helper('adminhtml')->__('Titan Theme Manage'), Mage::helper('adminhtml')->__('Titan Theme Manage'));        
		return $this;
	}	
	public function indexAction() {		
		$this->_initAction();		
		$this->loadLayout();
		$this->renderLayout();	
	}
}