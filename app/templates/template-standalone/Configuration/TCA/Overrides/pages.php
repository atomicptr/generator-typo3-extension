<?php

defined("TYPO3_MODE") || die();

// Register TypoScript config
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    "<%= extensionKey %>",
    "Configuration/TypoScript",
    "<%= extensionName %>"
);
