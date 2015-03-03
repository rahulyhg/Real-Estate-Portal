create table templates
(
id INT(10) NOT NULL AUTO_INCREMENT,
`user_id` int ,
`template_name`VARCHAR(256) NOT NULL,
`template_folder`VARCHAR(256) NOT NULL,
`template_image`VARCHAR(256) NOT NULL,
`scrible`VARCHAR(256) NOT NULL,
`date` DATETIME(6) NOT NULL,
 `modified_date`DATETIME(6) NOT NULL,
`created_by`VARCHAR(256) NOT NULL,
`development_status` ENUM('placed', 'pending', 'inprogress','completed','rejected','in-review') NOT NULL ,
 `status` ENUM ('active','deleted') NOT NULL,
 `custom` ENUM('yes','no') NOT NULL,
 `category`VARCHAR(256) NOT NULL,
    `template_params` TEXT(256) NOT NULL,
    `template_type`ENUM ('public','private') NOT NULL,
    `template_price`VARCHAR(256) NOT NULL );