<?php
$installer = $this;
$installer->startSetup();
$installer->run("
CREATE TABLE IF NOT EXISTS {$this->getTable('mst_titan_navigation')} (
	id int(11) unsigned NOT NULL AUTO_INCREMENT,
	menu_type varchar(100) NOT NULL,
	menu_group int(11) NOT NULL,
	custom_class varchar(500) NOT NULL DEFAULT '',
	description TEXT NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 