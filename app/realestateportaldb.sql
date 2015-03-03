'create table for "users"'

CREATE TABLE users(
id INT PRIMARY KEY NOT NULL AutoNumber,
name VARCHAR( 255 ) NOT NULL ,
username VARCHAR( 255 ) NOT NULL ,
PASSWORD VARCHAR( 255 ) NOT NULL ,
user_img VARCHAR( 255 ) NOT NULL ,
dob DATETIME( 6 ) NOT NULL ,
address VARCHAR( 255 ) NOT NULL,
country VARCHAR( 255 ) NOT NULL,
state VARCHAR( 255 ) NOT NULL,
phone INT(12) NOT NULL,
email_id VARCHAR( 255 ) NOT NULL
);

'create "user_group" table '

CREATE TABLE user_group(
id INT PRIMARY KEY NOT NULL ,
group_name VARCHAR( 255 ) NOT NULL ,
group_permission LONGTEXT NOT NULL ,
config LONGTEXT NOT NULL ,
STATUS ENUM(  'YES',  'NO' ) NOT NULL ,
DATE DATETIME( 6 ) NOT NULL ,
modified_date DATETIME( 6 ) NOT NULL
)

' create "enquiry" table'

CREATE TABLE enquiry(
id INT( 10 ) PRIMARY KEY NOT NULL ,
user_id INT( 10 ) NOT NULL ,
first_name VARCHAR( 255 ) NOT NULL ,
last_name VARCHAR( 255 ) NOT NULL ,
from_email VARCHAR( 255 ) NOT NULL ,
subject VARCHAR( 255 ) NOT NULL ,
message LONGTEXT NOT NULL ,
DATE DATETIME( 6 ) NOT NULL ,
STATUS ENUM(  'YES',  'NO' ) NOT NULL ,
reply_status ENUM(  'YES',  'NO' ) NOT NULL ,
reply_date DATETIME( 6 ) NOT NULL ,
reply_message LONGTEXT NOT NULL ,
response_for VARCHAR( 255 ) NOT NULL ,
domain VARCHAR( 255 ) NOT NULL
)

'create table "config" '

CREATE TABLE config(
id INT( 10 ) PRIMARY KEY NOT NULL ,
config_name VARCHAR( 255 ) NOT NULL ,
config_data LONGTEXT NOT NULL
)

'create table "website" '

CREATE TABLE website(
id INT( 10 ) PRIMARY KEY NOT NULL ,
user_id INT( 10 ) NOT NULL ,
domain_name VARCHAR( 255 ) NOT NULL ,
registered_date DATETIME( 6 ) NOT NULL ,
validity INT( 20 ) NOT NULL ,
expiry_date DATETIME( 6 ) NOT NULL ,
domain_price VARCHAR( 255 ) NOT NULL ,
STATUS ENUM(  'active',  'expired',  'deleted' ) NOT NULL
)
