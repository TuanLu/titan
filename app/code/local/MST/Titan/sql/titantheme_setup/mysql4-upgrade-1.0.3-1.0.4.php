<?php
$installer = $this;
$installer->startSetup();
$installer->run("
CREATE TABLE IF NOT EXISTS {$this->getTable('mst_titan_general')} (
	id int(11) unsigned NOT NULL AUTO_INCREMENT,
	theme_layout varchar(500) NOT NULL,
	theme_style varchar(500) NOT NULL,
	logo_type varchar(500) NOT NULL,
	logo_image varchar(500) NOT NULL DEFAULT '',
	logo_text TEXT NOT NULL DEFAULT '',
	slogan TEXT NOT NULL DEFAULT '',
	enable_top_bar varchar(10) NOT NULL DEFAULT '',
	enable_setting_block varchar(10) NOT NULL DEFAULT '',
	description TEXT NOT NULL DEFAULT '',
	status smallint(2) NOT NULL DEFAULT '1',
	PRIMARY KEY (id)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;
");
$installer->endSetup(); 