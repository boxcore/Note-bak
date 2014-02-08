// 131217 工作

1. 统一推广着陆页链接名称和权限控制资源名称
基础数据修改：
UPDATE `resource` SET `url`='spread/spread_list', `mark`='spread_list' WHERE (`id`='353');
UPDATE `resource` SET `url`='spread/spread_item_add', `mark`='spread_item_add' WHERE (`id`='217');
UPDATE `resource` SET `url`='spread/spread_item_add_pro', `mark`='spread_item_add_pro' WHERE (`id`='218');
UPDATE `resource` SET `url`='spread/spread_item_update/(\\d+)', `mark`='spread_item_update' WHERE (`id`='220');
UPDATE `resource` SET `url`='spread/spread_item_update_pro', `mark`='spread_item_update_pro' WHERE (`id`='221');
UPDATE `resource` SET `url`='spread/spread_delete/(\\d+)', `mark`='spread_delete' WHERE (`id`='222');
UPDATE `resource` SET `url`='spread/spread_tag_add', `mark`='spread_tag_add' WHERE (`id`='354');
UPDATE `resource` SET `url`='spread/spread_tag_add_pro', `mark`='spread_tag_add_pro' WHERE (`id`='355');
UPDATE `resource` SET `url`='spread/spread_tag_update/(\\d+)', `mark`='spread_tag_update' WHERE (`id`='356');
UPDATE `resource` SET `url`='spread/spread_tag_update_pro', `mark`='spread_tag_update_pro' WHERE (`id`='357');
DELETE FROM `resource` WHERE (`id`='358');

