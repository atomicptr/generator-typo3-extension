<?php

defined("TYPO3_MODE") or die();

call_user_func(function ($extKey) {
    \TYPO3\CMS\Extbase\Utility\ExtensionUtility::configurePlugin(
        "<%= phpVendorName %>.<%= phpExtensionName %>",
        "ExamplePlugin",
        ["Example" => "list"],
        []
    );

    // Add pageTS
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "<INCLUDE_TYPOSCRIPT: source=\"FILE:EXT:$extKey/Configuration/TSconfig/pagets.tsconfig\">"
    );

    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
    $icons = [
        "<%= extensionKeyCondensed %>-icon" => "EXT:$extKey/ext_icon.svg",
    ];

    foreach ($icons as $iconIdentifier => $path) {
        $iconRegistry->registerIcon(
            $iconIdentifier,
            \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
            ["source" => $path]
        );
    }
}, "<%= extensionKey %>");