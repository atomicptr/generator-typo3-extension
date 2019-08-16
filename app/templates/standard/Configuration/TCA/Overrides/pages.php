<?php

defined("TYPO3_MODE") or die();

\TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerPlugin(
    "<%= phpVendorName %>.<%= phpExtensionName %>",
    "ExamplePlugin",
    "Example Plugin",
    "EXT:<%= extensionKey %>/ext_icon.svg"
);

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile(
    "<%= extensionKey %>",
    "Configuration/TypoScript",
    "<%= extensionName %>"
);