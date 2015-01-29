<?php
$installer = $this;
$installer->startSetup();
$installer->run("
CREATE TABLE IF NOT EXISTS {$this->getTable('mst_titan_customization')} (
	id int(11) unsigned NOT NULL AUTO_INCREMENT,
	after_head_open TEXT,
	before_head_close TEXT,
	after_body_open TEXT,
	before_body_close TEXT,
	description TEXT NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 