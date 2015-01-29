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


class MST_Ajaxaddtocart_Helper_Data extends Mage_Core_Helper_Abstract
{
	/* edit by David */
	function get_content_id($file,$id){
		$h1tags = preg_match_all("/(<div id=\"{$id}\">)(.*?)(<\/div>)/ismU",$file,$patterns);
		$res = array();
		array_push($res,$patterns[2]);
		array_push($res,count($patterns[2]));
		return $res;
	}
	
	function get_div($file,$id){
    $h1tags = preg_match_all("/(<div.*>)(\w.*)(<\/div>)/ismU",$file,$patterns);
    $res = array();
    array_push($res,$patterns[2]);
    array_push($res,count($patterns[2]));
    return $res;
	}
	
	function get_domain($url)   {   
		$dev = 'dev';
		if ( !preg_match("/^http/", $url) )
			$url = 'http://' . $url;
		if ( $url[strlen($url)-1] != '/' )
			$url .= '/';
		$pieces = parse_url($url);
		$domain = isset($pieces['host']) ? $pieces['host'] : ''; 
		if ( preg_match('/(?P<domain>[a-z0-9][a-z0-9\-]{1,63}\.[a-z\.]{2,6})$/i', $domain, $regs) ) { 
			$res = preg_replace('/^www\./', '', $regs['domain'] );
			return $res;
		}   
		return $dev;
	}
	/* end */	
}
