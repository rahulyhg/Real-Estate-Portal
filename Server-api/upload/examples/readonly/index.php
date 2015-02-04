<?php

/**
 * Readonly Cheryl example. Just lists the files
 */


// if CHERYL_CONFIG is defined, the script will not automatilcy run
define('CHERYL_CONTROL', true);

// if you want better password hashing, put something here
define('CHERYL_SALT', 'SOMETHING/NOT/COOL/AND/RANDOM');

// include the Cheryl libraries
require_once('../../build/Cheryl.php');

// give Cheryl our config. this will merge with the default config
Cheryl::init(array(
	'root' => '../files',
	'readonly' => true
));

// manualy run the script since were using a custom config
Cheryl::go();