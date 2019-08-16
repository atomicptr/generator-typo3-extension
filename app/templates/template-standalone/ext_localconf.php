<?php

defined("TYPO3_MODE") or die();

call_user_func(function ($extKey) {
    // add UserTS config
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addUserTSConfig(
        "<INCLUDE_TYPOSCRIPT: source=\"DIR:EXT:$extKey/Configuration/UserTS\">"
    );

    // Add pageTS
    \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
        "<INCLUDE_TYPOSCRIPT: source=\"DIR:EXT:$extKey/Configuration/TSconfig\">"
    );

    // Inject custom RTE configuration
    $GLOBALS["TYPO3_CONF_VARS"]["RTE"]["Presets"]["default"] = "EXT:$extKey/Configuration/RTE/Default.yml";

    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);
    $icons = [
        "<%= extensionKeyCondensed %>-icon" => "EXT:$extKey/ext_icon.svg",
        "<%= extensionKeyCondensed %>-grid-section" => "EXT:$extKey/Resources/Public/Images/Icons/gridelements/section.svg",
        "<%= extensionKeyCondensed %>-grid-2cols" => "EXT:$extKey/Resources/Public/Images/Icons/gridelements/2cols.svg",
        "<%= extensionKeyCondensed %>-grid-3cols" => "EXT:$extKey/Resources/Public/Images/Icons/gridelements/3cols.svg",
        "<%= extensionKeyCondensed %>-grid-4cols" => "EXT:$extKey/Resources/Public/Images/Icons/gridelements/4cols.svg",
        "<%= extensionKeyCondensed %>-grid-flexcols" => "EXT:$extKey/Resources/Public/Images/Icons/gridelements/flexcols.svg",
        "<%= extensionKeyCondensed %>-grid-accordion" => "EXT:$extKey/Resources/Public/Images/Icons/gridelements/accordion.svg",
    ];

    foreach ($icons as $iconIdentifier => $path) {
        $iconRegistry->registerIcon(
            $iconIdentifier,
            \TYPO3\CMS\Core\Imaging\IconProvider\SvgIconProvider::class,
            ["source" => $path]
        );
    }
}, "<%= extensionKey %>");