<?php
$installer = $this;
$installer->startSetup();
$installer->run("
CREATE TABLE IF NOT EXISTS {$this->getTable('mst_titan_page_options')} (
	id int(11) unsigned NOT NULL AUTO_INCREMENT,
	category TEXT NOT NULL,
	product TEXT NOT NULL,
	cart TEXT NOT NULL,
	checkout TEXT NOT NULL,
	account TEXT NOT NULL,
	contact TEXT NOT NULL,
	extra_options TEXT NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 