<?php

defined("TYPO3_MODE") || die("Access denied.");

call_user_func(function ($extKey) {

    // register module
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerModule(
        "<%= phpVendorName %>.<%= phpExtensionName %>",
        "web",
        "ExampleModule",
        "",
        [
            "ExampleBackend" => "list"
        ],
        [
            "access" => "user,group",
            "icon" => "EXT:$extKey/ext_icon.svg",
            "labels" => "LLL:EXT:$extKey/Resources/Private/Language/locallang_module.xlf"
        ]
    );
}, "<%= extensionKey %>");